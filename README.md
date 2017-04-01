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
  afterCreate: sailsPersistenceLogger.afterCreate,
  afterUpdate: sailsPersistenceLogger.afterUpdate,
  afterDestroy: sailsPersistenceLogger.afterDestroy
};
```

## API
### `require('sails-persistence-stream')(options: Object)`
Initializes **Sails Persistence Stream** with the given options. All options are optional.
