var extend = require('extend');
var Promise = require('bluebird');
var AWS = require('aws-sdk');

var defaultOptions = {
  region: 'us-east-1'
};

module.exports = function(overrides) {
  var options = extend(true, {}, defaultOptions, overrides || {});
  AWS.config.update({
    region: options.region
  });
  var kinesisClient = new AWS.Kinesis();
  return {
    afterCreate: function(record, me) {
      return putRecord(kinesisClient, options.stream, 'CREATE', me, record);
    },

    afterUpdate: function(record, me) {
      return putRecord(kinesisClient, options.stream, 'UPDATE', me, record);
    },

    afterDestroy: function(records, me) {
      return putRecord(kinesisClient, options.stream, 'DESTROY', me, record);
    }
  };
};

function putRecord(kinesisClient, stream, action, me, record) {
  return new Promise((resolve, reject) => {
    kinesisClient.putRecord({
      Data: new Buffer(JSON.stringify({
        action,
        model: me.identity,
        record
      })),
      PartitionKey: record[me.primaryKey].toString(),
      StreamName: stream
    }, (err, data) => {
      if (err) {
        reject(err);
      } else {
        resolve(data);
      }
    });
  });
}
