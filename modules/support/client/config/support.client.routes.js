'use strict';

// Setting up route
angular.module('support').config(['$stateProvider',
	function ($stateProvider) {
		// Support state routing
		$stateProvider
			.state('support', {
				abstract: true,
				url: '/support',
				template: '<ui-view/>'
			})
			.state('support.locations', {
				url: '/locations',
				templateUrl: 'modules/support/client/views/support.locations.client.view.html',
				roles: ['admin']
			});
	}
]);