'use strict';

angular.module('support').factory('Tickets', ['$resource', function($resource) {
	return $resource('api/support/tickets/:ticketId', {
		ticketId: '@_id'
	}, {
		update: {
			method: 'PUT'
		}
	});
}]);