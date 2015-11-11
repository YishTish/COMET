app.controller('modalController',['$scope', 'close','loadPath', 'formTitle', '$element', function($scope, close, loadPath, formTitle, $element){
	
	$scope.loadPath = loadPath;
	//$scope.formElements = data.form[0];
	$scope.title = formTitle;

	$scope.dismissModal = function(res){
		close(res, 200);
		//angular modal clashes with bootstrap modal. The following lines take care of bootstrap
		$(".modal-backdrop").remove();
		$("body").removeClass("modal-open");
	}

}]);