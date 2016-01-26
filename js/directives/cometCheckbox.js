app.directive('cometCheckbox', ['jsonServices', 'ajaxServices','afterFieldServices', function(jsonServices, ajaxServices,afterFieldServices){
	return{
		restrict: 'A',
		require: '^cometForm',
		link: function(scope, elem, attr, formCtrl){
			elem.bind('change', function(){
				numericVal = elem[0].checked ? 1 : 0;
				afterFieldServices.sendAfterFieldRequest(formCtrl.formData, formCtrl.dataMap, attr.name, numericVal, attr.afterTextValidation, attr.afterTextParams);
			});
		}
	}
}]);
