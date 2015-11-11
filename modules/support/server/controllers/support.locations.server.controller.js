'use strict';

/** 
 * Module dependencies
 */
var path = require('path'),
  mongoose = require('mongoose'),
  Location = mongoose.model('Location'),
  errorHandler = require(path.resolve('./modules/core/server/controllers/errors.server.controller'));

/**
 * Create a location
 */
exports.create = function (req, res) {
  var location = new Location(req.body);

  location.save(function (err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(location);
    }
  }); 
};

/**
 * Show the current location
 */
exports.read = function (req, res) {
  res.json(req.location);
};

/**
 * Update a location
 */
exports.update = function (req, res) {
  var location = req.location;

  location.location = req.body.location;
  location.isactive = req.body.isactive;

  location.save(function (err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      console.log(location.location);
      console.log(location.isactive);
      res.json(location);
    }
  }); 
};

/**
 * Delete a location
 */
exports.delete = function (req, res) {
  var location = req.location;

  location.remove(function (err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(location);
    }
  }); 
};

/**
 * List of Locations
 */
exports.list = function (req, res) {
  Location.find().sort('-isactive').exec(function (err, locations) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(locations);
    }
  }); 
};

/**
 * Location middleware
 */
exports.locationByID = function (req, res, next, id) {
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).send({
      message: 'Location is invalid'
    });
  }

  Location.findById(id).exec(function (err, location) {
    if (err) {
      return next(err);
    } else if (!location) {
      return res.status(400).send({
        message: 'No location with that identifier has been found'
      });
    }
    req.location = location;
    next();
  }); 
};