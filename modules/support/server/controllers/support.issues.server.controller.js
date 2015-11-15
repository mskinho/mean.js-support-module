'use strict';

/** 
 * Module dependencies
 */
var path = require('path'),
  mongoose = require('mongoose'),
  Issue = mongoose.model('Issue'),
  errorHandler = require(path.resolve('./modules/core/server/controllers/errors.server.controller'));

/**
 * Create a issue
 */
exports.create = function (req, res) {
  var issue = new Issue(req.body);
  issue.issueCode = issue.issue;

  issue.save(function (err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(issue);
    }
  }); 
};

/**
 * Show the current issue
 */
exports.read = function (req, res) {
  res.json(req.issue);
};

/**
 * Update a issue
 */
exports.update = function (req, res) {
  var issue = req.issue;

  issue.issueCode = req.body.issue;
  issue.issue = req.body.issue;
  issue.isactive = req.body.isactive;
  issue.parentSubcategory = req.body.parentSubcategory;

  issue.save(function (err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(issue);
    }
  }); 
};

/**
 * Delete a issue
 */
exports.delete = function (req, res) {
  var issue = req.issue;

  issue.remove(function (err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(issue);
    }
  }); 
};

/**
 * List of issues
 */
exports.list = function (req, res) {
  Issue.find().sort('-isactive').exec(function (err, issues) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(issues);
    }
  }); 
};

/**
 * issue middleware
 */
exports.issueByID = function (req, res, next, id) {
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).send({
      message: 'issue is invalid'
    });
  }

  Issue.findById(id).exec(function (err, issue) {
    if (err) {
      return next(err);
    } else if (!issue) {
      return res.status(400).send({
        message: 'No issue with that identifier has been found'
      });
    }
    req.issue = issue;
    next();
  }); 
};