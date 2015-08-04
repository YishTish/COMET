app.directive('cometForm', ['jsonServices','$filter', function(jsonServices, $filter) {
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

			self.save = function() {
				$scope.$broadcast('show-errors-check-validity');

				if($scope.cometForm.$invalid) {
					return;
				}
			}

			self.reset = function() {
				console.log("reset");
				$scope.$broadcast('show-errors-reset');
			}

			self.getElementLabel = function(elemntId){

				var result = $filter('filter')(self.formData.fields, function(res){
					if(res.id == elemntId){
						return res.label;
					}
				});
				return result[0].label;
			}
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

.directive('showErrors', ['$timeout', function ($timeout) {
	return {
		restrict: 'A',
		require: '^form',
		link: function (scope, element, attr, formCtrl) {
			var inputEl = element[0].querySelector("[name]");
			var inputNgEl = angular.element(inputEl);

			scope.$on('show-errors-check-validity', function(){
				var inputName = inputNgEl.attr('name');
				if(inputName != undefined){
					element.toggleClass('has-error', formCtrl[inputName].$invalid);
				}
			});

			scope.$on('show-errors-reset', function() {
  				$timeout(function() {
    				element.removeClass('has-error');
  				}, 0, false);
			});
			

			inputNgEl.bind('keyup', function(){
				var inputName = inputNgEl.attr('name');
				var dataFormat = inputNgEl.attr('dataformat');
				if(dataFormat){
					switch(dataFormat.toLowerCase()){
						case "alphanumeric":
							if(formCtrl[inputName].$viewValue === undefined || formCtrl[inputName].$viewValue == ""){
								formCtrl[inputName].$setValidity("alphanumeric", 1);
								return;
							}
							formCtrl[inputName].$setValidity("alphanumeric", is.alphaNumeric(formCtrl[inputName].$viewValue));
						break;
						case "capitalletters":
							inputNgEl.addClass("text-uppercase");
						break;
						case "PhoneNumber":
						break;
					}
				}
				//element.toggleClass('has-error', formCtrl[inputName].$invalid);
			});

			 inputNgEl.bind('blur', function(){
			 	var inputName = inputNgEl.attr('name');
			 	element.toggleClass('has-error', formCtrl[inputName].$invalid);
			 });
			
		}
	};
}])

.directive('validateText', [function () {
	return {
		restrict: 'A',
		require: '^form',
		link: function (scope, element, attr, formCtrl) {
			var inputEl = element[0].querySelector("[name]");
			var inputNgEl = angular.element(inputEl);

			inputNgEl.bind('blur', function(){
				console.log(inputNgEl);
				var dataFormat = inputNgEl.attr('dataformat');
				if(dataFormat){
					console.log(dataFormat);
				}
				var inputName = inputNgEl.attr('name');
			})
			
		}
	};
}])


