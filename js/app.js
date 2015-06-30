var app = angular.module('COMET', ['ngMaterial']);

app.controller('appCtrl', ['$scope', '$mdSidenav', '$http', function ($scope, $mdSidenav, $http) {
	$http.get("json_src/pilot.json").then(function fileLoaded(res){
		$scope.formData = res.data;
	});
	$scope.toggleSidenav = function(menuId){
		$mdSidenav(menuId).toggle();
	}
	$scope.title = "COMET";
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
}])
;