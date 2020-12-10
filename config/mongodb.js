const mongoose = require('mongoose');
const dbinfo = require('./imnugu-mongo-config.json')

module.exports = () => {

  const url = 'mongodb+srv://'+dbinfo.username+':'+dbinfo.password+'@'+dbinfo.dbpath+'?retryWrites=true&w=majority';
  console.log(url);

  const db = mongoose.connection;
  db.on('error', console.error);
  db.once('open', function(){
      // CONNECTED TO MONGODB SERVER
      console.log("Connected to mongodb server");
  });
  mongoose.connect(url, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      poolSize: 10,
      socketTimeoutMS: 360000,
      reconnectTries: 30
  });
};
