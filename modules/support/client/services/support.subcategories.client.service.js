'use strict';

// Subcategory service used for communicating with the locations REST endpoints.
// Made a basic one so basic CRUD can use out of the box solutions.
angular.module('support').factory('Subcategories', ['$resource', function($resource) {
	return $resource('api/support/subcategories/:subcategoryId', {
		subcategoryId: '@_id'
	}, {
		update: {
			method: 'PUT'
		}
	});
}]);

// This service has the extra functions
angular.module('support').factory('SubcategoriesExtra', ['$resource', function($resource) {
	var _subCategoriesService = {};
	
	_subCategoriesService.getSubs = function(category) {
		return $resource('api/support/' + category + '/subcategories').query(function (data) {
			var items = [];
			data.forEach(function(d) {
				items.push(d.toJSON());
			});
			return items;
		});
	};

	_subCategoriesService.delete = function(id) {
		return $resource('api/support/subcategories/:subcategoryId', {
			subcategoryId: id
		}).delete(function (data) {
			return data;
		});
	};

	_subCategoriesService.update = function(id) {
		return $resource('api/support/subcategories/:subcategoryId', {
			subcategoryId: id
		}, {update: { method: 'PUT'}}).update(function (data) {
			return data;
		});
	};

	return _subCategoriesService;
}]);