'use strict';

/**
 * Module dependencies
 */
var categoryPolicy = require('../policies/support.categories.server.policy'),
  categories = require('../controllers/support.categories.server.controller');

module.exports = function (app) {
	// Categories collection routes
	app.route('/api/support/categories').all(categoryPolicy.isAllowed)
		.get(categories.list)
		.post(categories.create);

	// Single category routes
	app.route('/api/support/categories/:categoryId').all(categoryPolicy.isAllowed)
		.get(categories.read)
		.put(categories.update)
		.delete(categories.delete);

	// Bind the locations middleware
	app.param('categoryId', categories.categoryByID);
};