'use strict';

// Subcategory service used for communicating with the locations REST endpoints.
angular.module('support').factory('Subcategories', ['$resource', function($resource) {
	return $resource('api/support/subcategories/:subcategoryId', {
		subcategoryId: '@_id'
	}, {
		update: {
			method: 'PUT'
		}
	});
}]);