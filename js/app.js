var app = angular.module('COMET', ['ngMaterial']);

app.controller('appCtrl', ['$scope', '$mdSidenav', '$http', 'jsonServices', function ($scope, $mdSidenav, $http, jsonServices) {
	$http.get("json_src/pilot.json").then(function fileLoaded(res){
		$scope.formData = res.data;
	});
	$scope.toggleSidenav = function(menuId){
		$mdSidenav(menuId).toggle();
	}
	$scope.title = "COMET";
	$scope.files = ["Json_order14-524","pilot"];

	$scope.loadFile = function(fileName){
		jsonServices.loadFile(fileName, $scope);
	}
}])

.config(function($mdThemingProvider) {
  $mdThemingProvider.theme('altTheme')
    .primaryPalette('purple')
})
.directive('cometText', [function () {
	return {
		restrict: 'E',
		scope: {
			formField: '=field'
		},
		templateUrl: function(elem, attr){
			return 'tpl/input_tpl.html';
		}
	};
}]);