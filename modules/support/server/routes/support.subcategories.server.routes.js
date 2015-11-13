'use strict';

/**
 * Module dependencies
 */
var subcategoryPolicy = require('../policies/support.subcategories.server.policy'),
  subcategories = require('../controllers/support.subcategories.server.controller');

module.exports = function (app) {
	app.route('/api/support/:category/subcategories').all(subcategoryPolicy.isAllowed)
		.get(subcategories.list);

	app.route('/api/support/subcategories').all(subcategoryPolicy.isAllowed)
		.get(subcategories.list)
		.post(subcategories.create);

	app.route('/api/support/subcategories/:subcategoryId').all(subcategoryPolicy.isAllowed)
		.put(subcategories.update)
		.delete(subcategories.delete);

	// Bind the locations middleware
	app.param('subcategoryId', subcategories.subcategoryByID);
	app.param('category', subcategories.category);
};