'use strict';

angular.module('support').controller('IssuesController', ['$scope', '$stateParams', '$location', 'Authentication', 'Issues', 'Categories', 'Subcategories',
	function ($scope, $stateParams, $location, Authentication, Issues, Categories, Subcategories) {
		$scope.authentication = Authentication;

		$scope.addNew = false;
		$scope.edit = false;
		$scope.selected = null;
		$scope.editOrig = null;

		$scope.cat = $stateParams.category;
		$scope.subCat = $stateParams.subcategory;
		Categories.query().$promise.then(function(data) {
			$scope.prettyCat = null;
			for (var c = 0 ; c < data.length; c++) {
				if (data[c].catCode === $scope.cat) {
					$scope.prettyCat = data[c].category;
				}
			}
		});
		Subcategories.query().$promise.then(function(data) {
			$scope.prettySub = null;
			for (var s = 0; s < data.length; s++) {
				if (data[s].subCode === $scope.subCat && data[s].catCode === $scope.cat) {
					$scope.prettySub = data[s].subcategory
				}
			}
		});

		$scope.items = Issues.query();

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

			var issue = new Issues({
				issue: this.issue,
				isactive: true,
				catCode: $scope.cat,
				subCode: $scope.subCat
			});

			issue.$save(function (response) {
				$scope.issue = '';
				$scope.addNew = false;
				$scope.items.push(issue);
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

			var issue = $scope.editOrig;

			issue.$update({id: issue.id});
			
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
				item.$remove({id: item.id});
				for (var i in $scope.items) {
					if ($scope.items[i] === item) {
						$scope.items.splice(i, 1);
					}
				}
			} else {
				$scope.location.$remove(function() {
					$location.path('support.issues');
				});
			}
		};
	}
]);