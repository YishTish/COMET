app.controller('modalController',['$scope','close','loadPath', 'formTitle', function($scope, close, loadPath, formTitle){
	
	$scope.loadPath = loadPath;
	//$scope.formElements = data.form[0];
	$scope.title = formTitle;

	$scope.dismissModal = function(result){
		close(result, 200);
	}

}]);