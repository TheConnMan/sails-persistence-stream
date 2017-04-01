var extend = require('extend');
var Promise = require('bluebird');
var AWS = require('aws-sdk');

var log4js = require('log4js');
var logger = log4js.getLogger('sails-persistence-stream');

var defaultOptions = {
  logger: logger,
  region: 'us-east-1'
};

module.exports = function(overrides) {
  var options = extend(true, {}, defaultOptions, overrides || {});
  AWS.config.update({
    region: options.region
  });
  var kinesisClient = new AWS.Kinesis({
    endpoint: options.endpoint
  });
  return {
    afterCreate: function(record, me) {
      return putRecord(kinesisClient, options, 'CREATE', me, record);
    },

    afterUpdate: function(record, me) {
      return putRecord(kinesisClient, options, 'UPDATE', me, record);
    },

    afterDestroy: function(records, me) {
      return putRecord(kinesisClient, options, 'DESTROY', me, record);
    }
  };
};

function putRecord(kinesisClient, options, action, me, record) {
  return new Promise((resolve, reject) => {
    kinesisClient.putRecord({
      Data: new Buffer(JSON.stringify({
        action,
        model: me.identity,
        record
      })),
      PartitionKey: record[me.primaryKey].toString(),
      StreamName: options.stream
    }, (err, data) => {
      if (err) {
        if (options.logger) {
          logger.error('Error sending persistence event to Kinesis', err);
        }
        resolve(err);
      } else {
        resolve(data);
      }
    });
  });
}
