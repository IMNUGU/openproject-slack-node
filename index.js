const async = require('async');
const request = require('request');
const db = require('./config/mongodb')
const mongoose = require('mongoose');
const Slack = require('./schema/slack')


var options = {
  'method': 'POST',
  'url': 'https://slack.com/api/chat.postMessage',
  'headers': {
    'Authorization': 'Bearer xxxx-xxxxxxxxxxx-xxxxxx-xxxxxxxxxxxxxxxxxxxxxxx',
    'Content-Type': 'application/json'
  },
  body: ''
};
db();

/*process.interrupted = false;

process.on('SIGINT', function() {
    console.log('Process interrupted.');

    process.interrupted = true;
});*/

async.forever(function(next) {

    /*if (process.interrupted) {
        return next(new Error("StopMainLoop"));
    }*/

    async.waterfall([
        function(callback) {
          selectRecords();
          callback(null);

        }
    ], function(err) {
        var next_delay = 20000 ;

        setTimeout(next, next_delay);
    });

}, function(err) {
    if (err) {
        console.err(err);
    }

    setTimeout(function() {
        process.exit();
    }, 1000);
});



function selectRecords(callback) {
  console.log('Select Start ....... ')
  Slack.find({}).exec()
    .then((result) => {
      console.log(result)
      result.forEach((slackSend, i) => {
        options.body = JSON.stringify({"channel":slackSend.channel,"text":slackSend.text,"as_user":true})
        request(options, function (error, response) {
          var res = JSON.parse(response.body);
          if(res.ok) {
            console.log(slackSend._id);
            Slack.updateOne({requestId: mongoose.Types.ObjectId(slackSend._id)}, {sendFlag: 'Y'}).then((result) => {
              console.log(result)
            }).catch((err) => {
              console.error(err)
            });
          }
          if (error) {
            console.err(err);
          }
        });
      });
    }).catch((err) => {
      console.err(err)
    })
}
