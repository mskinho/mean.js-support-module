'use strict';

angular.module('support').controller('CategoriesController', ['$scope', '$stateParams', '$location', 'Authentication', 'Categories', 
	function ($scope, $stateParams, $location, Authentication, Categories) {
		$scope.authentication = Authentication;

		$scope.addNew = false;
		$scope.edit = false;
		$scope.selected = null;
		$scope.editOrig = null;

		// Get list of items
		$scope.find = function() {
			$scope.items = Categories.query();
		};

		$scope.add = function() {
			$scope.addNew = !$scope.addNew;
			//focus('newLocation');
		};

		// Create a new item
		$scope.submit = function(isValid) {
			$scope.error = null;

			if (!isValid) {
				$scope.$broadcast('show-errors-check-validity', 'newForm');

				return false;
			}

			var category = new Categories({
				category: this.category,
				isactive: true
			});

			category.$save(function (response) {
				$scope.category = '';
				$scope.addNew = false;
				$scope.items.push(category);
			}, function (errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		$scope.editItem = function(item) {
			$scope.editOrig = angular.copy(item);
			$scope.selected = item;
		};

		// Update an existing item
		$scope.update = function (isValid) {
			$scope.error = null;

			if (!isValid) {
				$scope.$broadcast('show-errors-check-validity', 'editForm');

				return false;
			}

			var category = $scope.editOrig;

			category.$update({id: category.id});
			
			$scope.selected = null;
			for (var i in $scope.items) {
				if ($scope.items[i] === $scope.selected) {
					$scope.items[i] = $scope.editOrig;
				}
			}
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

		// Cancel the creation of a new item
		var _cancelNew = function() {
			$scope.addNew = false;
		};

		// Cancel the editing of an existing item
		var _cancelEdit = function() {
			$scope.selected = $scope.editOrig;
			$scope.selected = null;
		};

		// Delete an existing item
		$scope.delete = function (item) {
			if (item) {
				item.$remove({id: item.id});
				for (var i in $scope.items) {
					if ($scope.items[i] === item) {
						$scope.items.splice(i, 1);
					}
				}
			} else {
				$scope.location.$remove(function() {
					$location.path('support.categories');
				});
			}
		};
	}
]);