var extend = require('extend');

var defaultOptions = {

};

module.exports = function(overrides) {
  var options = extend(true, {}, defaultOptions, overrides || {});
  return {
    afterCreate: function(record, cb) {
      console.log('Create');
      cb();
    },

    afterUpdate: function(record, cb) {
      console.log('Update');
      cb();
    },

    afterDestroy: function(records, cb) {
      console.log('Destroy');
      cb();
    }
  };
};
