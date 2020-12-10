const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const SlackData = new Schema({
    requestId: ObjectId,
    channel: String,
    text: String,
    sendFlag: String
}, { collection: 'slack' });

module.exports = mongoose.model('slack', SlackData);
