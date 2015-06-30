var app = angular.module('COMET', ['ngMaterial']);

app.controller('appCtrl', ['$scope', '$mdSidenav', '$http', function ($scope, $mdSidenav, $http) {
	$http.get("json_src/pilot.json").then(function fileLoaded(res){
		console.log("File loaded");
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
.directive('cometInt', function(){
	return {
		template: "<input type='text' ng-minlength='1' ng-maxlength='3' name='ACBX' value='' />"
	}
})

;