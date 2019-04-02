/**
 * Queue.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {

    //Quang Truong 8/12/2018 add
    name: {
      type: 'string'
    },
    branchId: {
      type: 'string'
    },
    status: {
      type: 'string'
    },
    capacity: {
      type: 'number'
    }
  },
  datastore: 'dbsdclv'
  //Quang Truong 8/12/2018 end add

};

