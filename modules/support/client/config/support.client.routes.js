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
				controller: 'LocationsController',
				roles: ['admin']
			})
			.state('support.categories', {
				url: '/categories',
				templateUrl: 'modules/support/client/views/support.categories.client.view.html',
				roles: ['admin']
			})
			.state('support.subcategories', {
				url: '/:category/subcategories',
				templateUrl: 'modules/support/client/views/support.subcategories.client.view.html',
				controller: 'SubcategoriesController',
				roles: ['admin']
			})
			.state('support.issues', {
				url:'/:category/:subcategory/issues',
				templateUrl: 'modules/support/client/views/support.issues.client.view.html',
				roles: ['admin']
			});
	}
]);