'use strict';

/** 
 * Module dependencies
 */
var path = require('path'),
  mongoose = require('mongoose'),
  Ticket = mongoose.model('Ticket'),
  errorHandler = require(path.resolve('./modules/core/server/controllers/errors.server.controller'));

/**
 * Create a ticket
 */
exports.create = function (req, res) {
  var ticket = new Ticket(req.body);
  console.log(req.query);
  ticket.createdBy = req.user;
  console.log(ticket);


  ticket.save(function (err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(ticket);
    }
  }); 
};

/**
 * Show the current location
 */
exports.read = function (req, res) {
  res.json(req.ticket);
};

/**
 * Update a location
 */
exports.update = function (req, res) {
  var ticket = req.ticket;

  ticket.locationCode = req.body.location;
  ticket.catCode = req.body.category;
  ticket.subCode = req.body.subcategory;
  ticket.issue = req.body.issue;
  ticket.description = req.body.description;
  ticket.notes = req.body.notes;
  ticket.updated = Date.now;
  ticket.updatedBy = req.user;
  ticket.iscomplete = req.body.iscomplete;

  ticket.save(function (err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(ticket);
    }
  }); 
};

/**
 * Delete a location
 */
exports.delete = function (req, res) {
  var ticket = req.ticket;

  location.remove(function (err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(ticket);
    }
  }); 
};

/**
 * List of Locations
 */
exports.list = function (req, res) {
  Ticket.find().sort('-iscomplete').exec(function (err, tickets) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(tickets);
    }
  }); 
};

/**
 * Ticket middleware
 */
exports.ticketByID = function (req, res, next, id) {
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).send({
      message: 'Ticket is invalid'
    });
  }

  Ticket.findById(id).exec(function (err, ticket) {
    if (err) {
      return next(err);
    } else if (!location) {
      return res.status(400).send({
        message: 'No ticket with that identifier has been found'
      });
    }
    req.ticket = ticket;
    next();
  }); 
};