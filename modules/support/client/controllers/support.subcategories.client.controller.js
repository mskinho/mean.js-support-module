'use strict';

angular.module('support').controller('SubcategoriesController', ['$scope', '$q', '$state', '$stateParams', '$location', 'Authentication', 'Subcategories', 'SubcategoriesExtra',
	function ($scope, $q, $state, $stateParams, $location, Authentication, Subcategories, SubcategoriesExtra) {
		$scope.authentication = Authentication;

		$scope.addNew = false;
		$scope.edit = false;
		$scope.selected = null;
		$scope.editOrig = null;

		$scope.cat = $stateParams.category;
		$scope.items = SubcategoriesExtra.getSubs($scope.cat);

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
			
			var subcategory = new Subcategories({
				subcategory: this.subcategory,
				isactive: true,
				parentCategory: $scope.cat
			});

			subcategory.$save(function (response) {
				$scope.subcategory = '';
				$scope.addNew = false;
				$scope.items.push(subcategory);
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

			var subcategory = $scope.editOrig;

			SubcategoriesExtra.update(subcategory._id);
			
			$scope.selected = null;
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

		// Cancel the creation of a new item
		var _cancelNew = function() {
			$scope.addNew = false;
		};

		// Cancel the editing of an existing item
		var _cancelEdit = function(idx) {
			$scope.selected = null;
			angular.copy($scope.editOrig, $scope.items[idx]);
		};

		// Delete an existing item
		$scope.delete = function (item) {
			if (item) {
				SubcategoriesExtra.delete(item._id);
				for (var i in $scope.items) {
					if ($scope.items[i] === item) {
						$scope.items.splice(i, 1);
					}
				}
			} else {
				$scope.location.$remove(function() {
					$location.path('support.subcategories');
				});
			}
		};
	}
]);