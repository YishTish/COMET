app.directive('cometForm', ['jsonServices', function(jsonServices) {
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
			require: 'form';
			
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

			self.getDateField = function(fieldVal){
				return Date(fieldVal);
			}

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

.directive('cometTextField', [function(){
	return{
		restrict: 'AE',
		link: function(scope, elem, attr, ctrl){
			elem.bind('keyup', function(){
				console.log("keyup");
				if(attr.formatField=="CapitalLetters"){
					console.log(elem);
				}
			})
		},
		compile: function(){
			return{
				pre: function(scope, elem, attr, ctrl, transcludeFn){
					//console.log(scope.$parent.field.dateObject);
					switch(attr.cometTextField){
						case "Numeric":
							elem[0].type="number";
							scope.$parent.field.value = +scope.$parent.field.value;
							
							break;
						/*case "Date":
							elem[0].type="date";
							break;*/
						case "Time":
							elem[0].type="time";
							break;
					}
					if(attr.formatField=="CapitalLetters"){
						elem.css('text-transform','uppercase');
					}
				},
				post: function(scope, elem, attr, ctrl, transcludeFn){

					
				}
			}
		}
	}
}])


