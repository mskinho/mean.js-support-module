'use strict';

/**
 * Module dependencies
 */
var issuePolicy = require('../policies/support.issues.server.policy'),
  issues = require('../controllers/support.issues.server.controller');

module.exports = function (app) {
	app.route('/api/support/issues').all(issuePolicy.isAllowed)
		.get(issues.list)
		.post(issues.create);

	app.route('/api/support/issues/:issueId').all(issuePolicy.isAllowed)
		.put(issues.update)
		.delete(issues.delete);


	app.route('/api/support/:category/:subcategory/issues')
		.get(issues.list);
	
	// Bind the issues middleware
	app.param('issueId', issues.issueByID);
};