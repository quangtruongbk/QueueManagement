/**
 * Account.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */
var bcrypt = require('bcrypt-nodejs')

module.exports = {

  attributes: {
    name: {
      type: 'string'
    },
    email: {
      type: 'string',
      required: true,
      unique: true
    },
    phone: {
      type: 'string'
    },
    username: {
      type: 'string',
      required: true,
      unique: true
    },
    password: {
      type: 'string',
      required: true,

    },
    isEmp: {
      type: 'boolean'
    },
    isAdmin: {
      type: 'boolean'
    },
  },
  //Prevent us from getting Password
  customToJSON: function () {
    return _.omit(this, ['password'])
  },
  //Hashing password with salt before saving
  beforeCreate: function (account, cb) {
    bcrypt.genSalt(10, function (err, salt) {
      bcrypt.hash(account.password, salt, null, function (err, hash) {
        if (err) return cb(err);
        account.password = hash;
        return cb();
      });
    });
  },  
  datastore: 'dbsdclv'
};

