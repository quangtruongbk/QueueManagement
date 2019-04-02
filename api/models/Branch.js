/**
 * Branch.js
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
    address: {
      type: 'string'
    },
    capacity: {
      type: 'string'
    },
    phone: {
      type: 'string'
    },
    status: {
      type: 'string'
    },
    opentime: {
      type: 'string'
    },
    closetime: {
      type:'string'
    },
  },
  datastore: 'dbsdclv'
  //Quang Truong 8/12/2018 end add

};

