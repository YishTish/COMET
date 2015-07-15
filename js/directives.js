app.directive('cometForm', [function() {
	return{
		restrict: 'E',
		scope: {
			formData: '=formData',
		},
		controller: ['$scope', function($scope){
			var self = this;
			self.element = undefined;
			self.formScope = undefined;
			self.submitVal = "Send Form";
			
			self.getTemplate= function(field)  {
				return "tpl/"+field.type+".tpl.html";
			};

			self.sendForm = function(){
				console.log(self.formData.fields);
			};

			self.getFieldDisplay = function(field){
				if(field.visible=="false" || field.type=="hidden"){
					return "item-hidden";
				}
				return "item";
			};

			self.initForm = function initForm(){
				self.formScope = self.element.find('form').scope();
			};

		}],
		controllerAs: 'formCtrl',
		bindToController: true,
		templateUrl: function(elem, attr){
			return 'tpl/form.tpl.html';
		},
		link: function(scope, elem, attr,ctrl){
		}
	}

}])

.directive('cometField',[ '$compile','ajaxServices', function( $compile, ajaxServices ){
	var getTemplate = function(type){
			return 'tpl/'+type+'.tpl.html';
		};
	var linker = function(scope, element, attr, ctrl){
			//fieldJson = JSON.parse(scope.field);

			var url = "tpl/"+scope.field.type+".tpl.html";
			ajaxServices.httpPromise(url).then(function(result){
				var elem = $compile(result)(scope);	
				element.append(elem[0]);
			});

			element.bind('keyup', function(){
				console.log(ctrl[0]);
				//console.log(form)
			})
			

		};

	return{
		restrict: 'EA',
		scope: {
			field: '=',
		},
		link: linker,
		require: '?testForm',
	}
}])

.directive('directFunc',[ function(){
	return{
		restrict: 'E',
		link: function(scope, element, attr,ctrl){
			console.log(element);
			return true;
		}
	}

}])


