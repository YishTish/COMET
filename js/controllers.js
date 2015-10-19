app.controller('modalController',['$scope','close','msg', function($scope, close, msg){
	$scope.msg = msg;
	$scope.dismissModal = function(result){
		close(result, 200);
	}
	console.log("I was called");
}]);