'use strict';

// Locations service used for communicating with the locations REST endpoints
angular.module('support').factory('Locations', ['$resource',
	function ($resource) {
		return $resource('api/support/locations/:locationId', {
			locationId: '@_id'
		}, {
			update: {
				method: 'PUT'
			}
		});
	}
]);