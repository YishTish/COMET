app.controller('modalController',['$scope','close','data', function($scope, close, data){
	
	$scope.data = data;
	$scope.formElements = data.form[0];
	$scope.fields = data.fields;
	$scope.dismissModal = function(result){
		close(result, 200);
	}
	console.log(data);
}]);