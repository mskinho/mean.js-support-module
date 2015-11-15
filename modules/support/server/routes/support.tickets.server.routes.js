'use strict';

/**
 * Module dependencies
 */
var ticketPolicy = require('../policies/support.tickets.server.policy'),
  tickets = require('../controllers/support.tickets.server.controller');

module.exports = function (app) {
	// Tickets collection routes
	app.route('/api/support/tickets').all(ticketPolicy.isAllowed)
		.get(tickets.list)
		.post(tickets.create);

	// Single ticket routes
	app.route('/api/support/tickets/:ticketId').all(ticketPolicy.isAllowed)
		.put(tickets.update)
		.delete(tickets.delete);

	// Bind the tickets middleware
	app.param('ticketId', tickets.ticketByID);
};