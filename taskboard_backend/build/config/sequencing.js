"use strict";

var mongoose = require("mongoose");
var CounterSchema = new mongoose.Schema({
  _id: {
    type: String,
    required: true
  },
  seq: {
    type: Number,
    required: true
  }
});
var Counter = mongoose.model('Counter', CounterSchema);
var getSequenceNextValue = function getSequenceNextValue(seqName) {
  return new Promise(function (resolve, reject) {
    Counter.findByIdAndUpdate({
      "_id": seqName
    }, {
      "$inc": {
        "seq": 1
      }
    }, function (error, counter) {
      if (error) {
        reject(error);
      }
      if (counter) {
        resolve(counter.seq + 1);
      } else {
        resolve(null);
      }
    });
  });
};
var insertCounter = function insertCounter(seqName) {
  var newCounter = new Counter({
    _id: seqName,
    seq: 1
  });
  return new Promise(function (resolve, reject) {
    newCounter.save().then(function (data) {
      resolve(data.seq);
    })["catch"](function (err) {
      return reject(error);
    });
  });
};
module.exports = {
  Counter: Counter,
  getSequenceNextValue: getSequenceNextValue,
  insertCounter: insertCounter
};