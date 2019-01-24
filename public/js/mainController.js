angular.module('pepes').controller('mainController', function($scope, $http) {

	$scope.saveAndResetForm = function() {
		$scope.form.$setPristine();
		$scope.form.$setUntouched();
		console.log($scope.message);
	}

	$scope.getLoyalty = function() {
		return $http.get('http://wwww.testing.elitecode.pro/integration/orderingsystem')
					.then(function(res) {
						console.log(res.data);
					})
	};
})