/**
 * Admin.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {
  //Quang Truong 22/2/2019 add
    attributes: {
      accountID: {
        type: 'string'
      },
      role: {
        type: 'string'
      },
      shift: {
        type: 'string'
      },
      branchId: {
        type: 'string'
      },
    },
    datastore: 'dbsdclv'
  //Quang Truong 22/2/2019 end add
  };
  

