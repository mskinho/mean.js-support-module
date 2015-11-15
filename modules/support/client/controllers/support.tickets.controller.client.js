'use strict';

angular.module('support').controller('TicketsController', ['$scope', '$stateParams', '$location', '$filter', 'Authentication', 'Issues', 'Categories', 'Subcategories', 'Locations',
	function ($scope, $stateParams, $location, $filter, Authentication, Issues, Categories, Subcategories, Locations) {

	$scope.categories = Categories.query();	
	$scope.subcategories = Subcategories.query();
	$scope.issues = Issues.query();	

}]);