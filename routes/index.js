'use strict';

var express = require('express');
var router = express.Router();

module.exports = function(redisClient) {
  router.get('*', function(req, response) {
    redisClient.get('speech', function(err, res) {
      response.render('index', {speech: res});
    });
  });

  return router;
};
