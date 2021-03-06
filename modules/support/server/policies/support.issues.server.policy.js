'use strict';

/** 
 * Module dependencies
 */
 var acl = require('acl');

// Using the memory backend
acl = new acl(new acl.memoryBackend());

/**
 * Invoke Locations Permissions
 */
 exports.invokeRolesPolicies = function() {
 	acl.allow([{
 		roles: ['admin'],
 		allows: [{
 			resources: '/api/support/issues',
 			permissions: '*'
 		}, {
 			resources: '/api/support/issues/:issueId',
 			permissions: '*'	
 		}, {
 			resources: '/api/support/:category/:subcategory/issues',
 			permissions: '*'
 		}, {
 			resources: '/api/support/:category/:subcategory/issues/:issueid',
 			permissions: '*'
 		}]
 	}]);
 };

 /**
  * Check if Locations Policy Allows
  */
exports.isAllowed = function (req, res, next) {
	var roles = (req.user) ? req.user.roles : ['guest'];

	// Check for user roles
	acl.areAnyRolesAllowed(roles, req.route.path, req.method.toLowerCase(), function (err, isAllowed) {
		if (err) {
			// An authorization error occurred.
			return res.status(500).send('Unexpected authorization error');
		} else {
			if (isAllowed) {
				// Access allowed. Invoke middleware
				return next();
			} else {
				return res.status(403).json({
					message: 'User is not authorized'
				});
			}
		}
	});	
};