# Sails Persistence Stream
[![NPM](https://nodei.co/npm/sails-persistence-stream.png)](https://nodei.co/npm/sails-persistence-stream/)

Automatically stream all Sails model persistence events to a distributed log

## Install
`npm install --save sails-persistence-stream`

## Use
To use **Sails Persistence Stream** out of the box add the streamer to `config/models.js` default persistence hooks so it looks like the following example:

```javascript
var sailsPersistenceStream = require('sails-persistence-stream')();

module.exports.models = {
  afterCreate: function(record, cb) {
    sailsPersistenceStream.afterCreate(record, this).then(data => {
      cb();
    });
  },
  afterUpdate: function(record, cb) {
    sailsPersistenceStream.afterUpdate(record, this).then(data => {
      cb();
    });
  },
  afterDestroy: function(record, cb) {
    sailsPersistenceStream.afterDestroy(record, this).then(data => {
      cb();
    });
  }
};
```

## API
### `require('sails-persistence-stream')(options: Object)`
Initializes **Sails Persistence Stream** with the given options. All options are optional.
- `options.stream`: Kinesis stream name (must exist already)
- `options.logger`: Log4js compatible logger which **Sails Persistence Stream** will use (set to `null` for no logging)
- `options.endpoint`: (Optional) Alternative Kinesis endpoint (for local testing use [Kinesalite](https://github.com/mhart/kinesalite))
