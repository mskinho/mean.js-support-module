'use strict';

/**
 * Module dependencies
 */
var locationPolicy = require('../policies/support.locations.server.policy'),
  locations = require('../controllers/support.locations.server.controller');

module.exports = function (app) {
	// Locations collection routes
	app.route('/api/support/locations').all(locationPolicy.isAllowed)
		.get(locations.list)
		.post(locations.create);

	// Single location routes
	app.route('/api/support/locations/:locationId').all(locationPolicy.isAllowed)
		.put(locations.update)
		.delete(locations.delete);

	// Bind the locations middleware
	app.param('locationId', locations.locationByID);
};