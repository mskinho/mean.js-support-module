'use strict';

// Categories service used for communicating with the locations REST endpoints
angular.module('support').factory('Categories', ['$resource',
	function ($resource) {
		return $resource('api/support/categories/:categoryId', {
			categoryId: '@_id'
		}, {
			update: {
				method: 'PUT'
			}
		});
	}
]);