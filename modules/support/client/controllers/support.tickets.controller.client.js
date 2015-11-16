'use strict';

angular.module('support').controller('TicketsController', ['$scope', '$stateParams', '$location', '$filter', 'Authentication', 'Issues', 'Categories', 'Subcategories', 'Locations', 'Tickets',
	function ($scope, $stateParams, $location, $filter, Authentication, Issues, Categories, Subcategories, Locations, Tickets) {

	$scope.categories = Categories.query();	
	$scope.subcategories = Subcategories.query();
	$scope.issues = Issues.query();	
	$scope.locations = Locations.query();

	$scope.submit = function(isValid) {
		$scope.error = null;

		if (!isValid) {
			$scope.$broadcast('show-errors-check-validity', 'newForm');

			return false;
		}

		var selectedLocation;
		var selectedCategory;
		var selectedSubcategory;
		var selectedIssue;
		// find the location
		for (var l = 0; l < $scope.locations.length; l++)
		{
			if ($scope.locations[l].locationCode === this.newItem.locationCode) {
				selectedLocation = $scope.locations[l];
			}
		}
		//find the category
		for (var c = 0; c < $scope.categories.length; c++)
		{
			if ($scope.categories[c].catCode === this.newItem.catCode) {
				selectedCategory = $scope.categories[c];
			}
		}
		// find the subcategory
		for (var s = 0; s < $scope.subcategories.length; s++)
		{
			if ($scope.subcategories[s].catCode === this.newItem.subCode) {
				selectedSubcategory = $scope.subcategories[s];
			}
		}
		// find the issue
		for (var i = 0; i < $scope.issues.length; i++)
		{
			if ($scope.issues[i].issueCode === this.newItem.issueCode) {
				selectedIssue = $scope.issues[i];
			}
		}

console.log(selectedLocation);
		
		var ticket = new Tickets({
			location: selectedLocation,
			category: selectedCategory,
			subcategory: selectedSubcategory,
			issue: selectedIssue,
			description: this.description  
		});

		ticket.$save(function (response) {
			$scope.ticket = '';
			$location.path('tickets/');
		}, function (errorResponse) {
			$scope.error = errorResponse.data.message;
		});
	};

}]);