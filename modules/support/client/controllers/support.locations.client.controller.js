'use strict';

angular.module('support').controller('LocationsController', ['$scope', '$stateParams', '$location', 'Authentication', 'Locations',
	function ($scope, $stateParams, $location, Authentication, Locations) {
		$scope.authentication = Authentication;

		$scope.addNew = false;
		$scope.edit = false;
		$scope.selected = null;
		$scope.editOrig = null;

		// Get list of items
		//$scope.find = function() {
		//	$scope.items = Locations.query();
		//};
		$scope.items = Locations.query();

		$scope.add = function() {
			$scope.addNew = !$scope.addNew;
			//focus('newLocation');
		};

		// Create a new location
		$scope.submit = function(isValid) {
			$scope.error = null;

			if (!isValid) {
				$scope.$broadcast('show-errors-check-validity', 'newForm');

				return false;
			}

			var location = new Locations({
				location: this.location,
				isactive: true
			});

			location.$save(function (response) {
				$scope.location = '';
				$scope.addNew = false;
				$scope.items.push(location);
			}, function (errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		$scope.editItem = function(item) {
			$scope.editOrig = angular.copy(item);
			$scope.selected = item;
		};

		// Update an existing location
		$scope.update = function (isValid) {
			$scope.error = null;

			if (!isValid) {
				$scope.$broadcast('show-errors-check-validity', 'editForm');

				return false;
			}

			var location = $scope.editOrig;

			location.$update({id: location.id});
			
			
			for (var i in $scope.items) {
				if ($scope.items[i] === $scope.selected) {
					$scope.items[i] = $scope.editOrig;
				}
			}

			$scope.selected = null;
		};

		// Cancel a submit or updated
		$scope.cancel = function() {
			if ($scope.selected === null)
			{
				_cancelNew();
			} else {
				_cancelEdit();
			}
		};

		// Cancel the creation of a new location
		var _cancelNew = function() {
			$scope.addNew = false;
		};

		// Cancel the editing of an existing location
		var _cancelEdit = function() {
			$scope.selected = $scope.editOrig;
			$scope.selected = null;
		};

		// Delete an existing location
		$scope.delete = function (item) {
			if (item) {
				item.$remove({id: location.id});
				for (var i in $scope.items) {
					if ($scope.items[i] === item) {
						$scope.items.splice(i, 1);
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