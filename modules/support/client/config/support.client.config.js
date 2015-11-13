'use strict';

// Configuring the Support module
angular.module('support').run(['Menus',
	function (Menus) {
		// Add the Support dropdown item
		Menus.addMenuItem('topbar', {
			title: 'Support',
			state: 'support',
			type: 'dropdown',
			roles: ['admin', 'user']
		});

		// Add the dropdown list for locations
		Menus.addSubMenuItem('topbar', 'support', {
			title: 'Locations',
			state: 'support.locations'
		});

		// Add the drop down for categories
		Menus.addSubMenuItem('topbar', 'support', {
			title: 'Categories & Issues',
			state: 'support.categories'
		});
	}
]);