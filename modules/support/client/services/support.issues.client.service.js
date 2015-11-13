'use strict';

// Issues service used for communicating with the locations REST endpoints
angular.module('support').factory('Issues', ['$resource',
	function ($resource) {
		return $resource('api/support/issues/:issueId', {
			issueId: '@_id'
		}, {
			update: {
				method: 'PUT'
			}
		});
	}
]);