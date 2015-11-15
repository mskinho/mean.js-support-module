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
				controller: 'CategoriesController',
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
				controller: 'IssuesController',
				roles: ['admin']
			})
			.state('support.tickets', {
				parent: 'support',
				url: '/tickets',
				views: {
					'': { 
						templateUrl: 'modules/support/client/views/support.tickets.client.view.html',
						controller: 'TicketsController' 
					},
					'ticketContent@support.tickets': { 
						templateUrl: 'modules/support/client/views/support.tickets-list.client.view.html',
						controller: 'TicketsController' 
					}
				},
				data: {
					roles: ['user', 'admin']
				}
			})
			.state('support.tickets.create', {
				url: '/create',
				views: {
					'ticketContent@support.tickets': {templateUrl: 'modules/support/client/views/support.tickets-create.client.view.html'}
				},
				controller: 'TicketsController',
				data: {
					roles: ['user', 'admin']
				}
			})
			.state('support.tickets.edit', {
				url: '/tickets/:ticketId',
				templateUrl: 'modules/support/client/views/support.tickets-detail.client.view.html',
				controller: 'TicketsController',
				data: {
					roles: ['user', 'admin']
				}
			});
	}
]);