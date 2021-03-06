'use strict';

angular.module('support').controller('SubcategoriesController', ['$scope', '$q', '$state', '$stateParams', '$location', 'Authentication', 'Subcategories', 'Categories',
	function ($scope, $q, $state, $stateParams, $location, Authentication, Subcategories, Categories) {
		$scope.authentication = Authentication;

		$scope.addNew = false;
		$scope.edit = false;
		$scope.selected = null;
		$scope.editOrig = null;

		$scope.cat = $stateParams.category;
		Categories.query().$promise.then(function(data) {
			$scope.prettyCat = null;
			for (var c = 0 ; c < data.length; c++) {
				if (data[c].catCode === $scope.cat) {
					$scope.prettyCat = data[c].category;
				}
			}
		});

		$scope.items = Subcategories.query();

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
				catCode: $scope.cat
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

			subcategory.$update({subcategory: subcategory.id});
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
				item.$remove(item._id);
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