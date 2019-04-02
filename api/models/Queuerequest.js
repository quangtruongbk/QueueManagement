/**
 * Queuerequest.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {
    //Quang Truong 3/12/2018 add
    customerName: {
      type: 'string'
    },
    customerPhone: {
      type: 'string'
    }, 
    customerEmail: {
      type: 'string'
    }, 
    queueId: {
      type: 'string'
    } 
  },
  datastore: 'dbsdclv' 
  //Quang Truong 3/12/2018 end add
};

