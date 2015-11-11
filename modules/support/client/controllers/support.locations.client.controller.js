'use strict';

angular.module('support').controller('LocationsController', ['$scope', '$stateParams', '$location', 'Authentication', 'Locations',
	function ($scope, $stateParams, $location, Authentication, Locations) {
		$scope.authentication = Authentication;

		$scope.addNew = false;
		$scope.edit = false;
		$scope.selected = null;
		$scope.editOrig = null;

		// Get list of locations
		$scope.find = function() {
			$scope.locations = Locations.query();
		};

		$scope.addNewLocation = function() {
			$scope.addNew = !$scope.addNew;
			//focus('newLocation');
		};

		// Create a new location
		$scope.submit = function(isValid) {
			$scope.error = null;

			if (!isValid) {
				$scope.$broadcast('show-errors-check-validity', 'newLocationForm');

				return false;
			}

			var location = new Locations({
				location: this.location,
				isactive: true
			});

			location.$save(function (response) {
				$scope.location = '';
				$scope.addNew = false;
				$scope.locations.push(location);
			}, function (errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		$scope.editLoc = function(location) {
			$scope.editOrig = angular.copy(location);
			$scope.selected = location;
		};

		// Update an existing location
		$scope.update = function (isValid) {
			$scope.error = null;

			if (!isValid) {
				$scope.$broadcast('show-errors-check-validity', 'editLocationForm');

				return false;
			}

			var location = $scope.editOrig;

			location.$update({id: location.id});
			
			$scope.selected = null;
			$scope.locations = Locations.query();
		};

		// Cancel a submit or updated
		$scope.cancel = function(idx) {
			if (idx === undefined)
			{
				_cancelNew();
			} else {
				_cancelEdit(idx);
			}
		};

		// Cancel the creation of a new location
		var _cancelNew = function() {
			$scope.addNew = false;
		};

		// Cancel the editing of an existing location
		var _cancelEdit = function(idx) {
			$scope.selected = null;
			angular.copy($scope.editOrig, $scope.locations[idx]);
		};

		// Delete an existing location
		$scope.delete = function (location) {
			if (location) {
				location.$remove({id: location.id});
				for (var i in $scope.locations) {
					if ($scope.locations[i] === location) {
						$scope.locations.splice(i, 1);
					}
				}
			} else {
				$scope.location.$remove(function() {
					$location.path('support.locations');
				});
			}
		};
	}
]);