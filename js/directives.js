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
			field: '@'
		},
		// template: '<span>test</span>'
		// controller: ['$scope', function($scope) {
		// 	alert('1')
		// }]
		template: function(elem, attr){
			return	'<span>123</span>'
		}
	}
}])

.directive('cometField',[ '$compile','ajaxServices', function( $compile, ajaxServices ){
	var getTemplate = function(type){
			return 'tpl/'+type+'.tpl.html';
		};
	var linker = function(scope, element, attr){
			//fieldJson = JSON.parse(scope.field);

			var url = "tpl/"+scope.field.type+".tpl.html";
			ajaxServices.httpPromise(url).then(function(result){
				var elem = $compile(result)(scope);	
				element.append(elem[0]);
			});
			

		};

	return{
		restrict: 'EA',
		scope: {
			field: '=',
		},
		// controller: ['$scope', function($scope) {
		// 	var test = '<span>test</span>'
		// 	console.log($scope.field);
		// }]
		// controller: [ '$scope',function($scope){
		// 	self = this;
		// 	self.getTpl = function(){
		// 		return 'tpl/browse.tpl.html'
		// 	}
		// }],
		
		//controllerAs: 'fieldCtrl',
		// templateUrl: function(elem, attr){
		// 	console.log(this.scope)
		// 	return this.controller.getTpl
		// },
		link: linker
		// templateUrl: function(elem, attr){
		// 	// f = JSON.parse(attr.field);
		// 	console.log(attr);
		//  	return getTemplate(attr.type);
		// }
	}
}])


