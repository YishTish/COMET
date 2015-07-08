app.directive('cometText', [function () {

	var controller =  ['$scope', function($scope){

		var inputCtrl = this;

		function init(){
			console.log($scope.inputCtrl.formField.type);
		}

		$scope.template = function(){
			return '<div ng-include="\'tpl/'+$scope.formField.type+'.tpl.html\'"></div>';
		}

		init();
	}];
	return {
		restrict: 'EA',
		scope: {
			formField: '=field'
		},
		controller : controller,
		controllerAs : 'inputCtrl',
		bindToController : true,
		template: controller.inputCtrl.template()
	};
}])

.directive('cometForm', [function() {
	return{
		restrict: 'E',
		scope: {
			formData: '=formData',
		},
		controller: ['$scope', function($scope){
			var self = this;
			self.getTemplate= function(field)  {
				//console.log("'tpl/"+fieldType+".tpl.html'");
				return "tpl/"+field.type+".tpl.html";
			}
		}],
		controllerAs: 'formCtrl',
		bindToController: true,
		templateUrl: function(elem, attr){
			return 'tpl/form.tpl.html';
		}
	}

}])

.directive('cometBrowse',[function($scope){
	return{
		replace: true,
		restrict: 'EA',
		transclude: true,
		scope: {
			abc: '@'
		},
		// template: '<span>test</span>'
		// controller: ['$scope', function($scope) {
		// 	alert('1')
		// }]
		template: function(elem, attr){
			return	'<span>{{abc}}</span>'
		}
	}
}])