'use strict';

/** 
 * Module dependencies
 */
var path = require('path'),
  mongoose = require('mongoose'),
  Subcategory = mongoose.model('Subcategory'),
  errorHandler = require(path.resolve('./modules/core/server/controllers/errors.server.controller'));

/**
 * Create a subcategory
 */
exports.create = function (req, res) {
  var subcategory = new Subcategory(req.body);
  subcategory.subCode = subcategory.subcategory;

  subcategory.save(function (err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(subcategory);
    }
  }); 
};

/**
 * Show the current subcategory
 */
exports.read = function (req, res) {
  res.json(req.subcategory);
};

/**
 * Update a subcategory
 */
exports.update = function (req, res) {
  var subcategory = req.subcategory;

  subcategory.subCode = req.body.subcategory;
  subcategory.subcategory = req.body.subcategory;
  subcategory.isactive = req.body.isactive;
  subcategory.catCode = req.body.catCode;

  subcategory.save(function (err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(subcategory);
    }
  }); 
};

/**
 * Delete a subcategory
 */
exports.delete = function (req, res) {
console.log(req.subcategoryId);
  var subcategory = req.subcategory;

  subcategory.remove(function (err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(subcategory);
    }
  }); 
};

/**
 * List of subcategories
 */
exports.list = function (req, res) {
  Subcategory.find().exec(function (err, categories) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
        return res.json(categories);
    }
  }); 
};

exports.subcategoryByID = function (req, res, next, id) {
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).send({
      message: 'subcategory is invalid'
    });
  }

  Subcategory.findById(id).exec(function (err, subcategory) {
    if (err) {
      return next(err);
    } else if (!subcategory) {
      return res.status(400).send({
        message: 'No subcategory with that identifier has been found'
      });
    }
    req.subcategory = subcategory;
    next();
  }); 
};