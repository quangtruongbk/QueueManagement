/**
 * Employee.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {
//Quang Truong 22/2/2019 add
  attributes: {
    accountID: {
  //    type: 'string'
    model: 'Account'
    },
    role: {
      type: 'json'
    },
    shift: {
      type: 'string'
    },
    branchID: {
      type: 'string'
    },
  },
  datastore: 'dbsdclv'
//Quang Truong 22/2/2019 end add

};

