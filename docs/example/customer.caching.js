'use strict';
var qwest = require('qwest');
var cache = require('./cacheing.js');

var customerAPI = {

  get: function(id) {

    var key = 'customer-' + id;

    return new Promise(function(resolve, reject) {

      var cachedCustomer = cache.get(key);
      if (cachedCustomer) {
        resolve(cachedCustomer);
        return;
      }

      qwest.get('/customer/' + id)
       .then(function(xhr, response) {
         cache.set(key, response, 300);
         resolve(response);
       }).catch(function(e, xhr, response) {
         reject({e: e, xhr: xhr, response: response});
       });
    });
  },

  update: function(id, cust) {

    var key = 'customer-' + id;
    cache.clear(key);

    return qwest.post('/customer/' + id, cust)
     .then(function(xhr, response) {
       cache.clear(key);
       return response;
     });
  },

};

module.exports = customerAPI;
