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
				console.log("Saving form");
				var currentForm = "WSY1001";
				var url = "http://www.lintechhq.com:3757/comet.icsp?MGWLPN=iCOMET&COMETMode=JS&SERVICE=DATAFORM&REQUEST="+currentForm+"&STAGE=SAVE"
				var sessionId = self.formData.session[0].COMETSID;
				var vars ="";
				for(field in self.formData.fields){
					vars = vars +"&"+self.formData.fields[field].id+"="+self.formData.fields[field].value;	
				}
				url = url + "&COMETSID="+sessionId + vars;
				console.log(url);
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
			
			

			element.bind('keyup', function(){
				var inputName = element.attr('name');
				var dataFormat = element.attr('dataformat');
				var valid = true;
				if(dataFormat){
					switch(dataFormat.toLowerCase()){
						case "alphanumeric":
							formCtrl[inputName].$setValidity("alphanumeric",is.alphaNumeric(element[0].value));
						break;
						case "phonenumber":
							formCtrl[inputName].$setValidity("phonenumber",is.nanpPhone(element[0].value));
						break;
						case "socialsecuritynumber":
							formCtrl[inputName].$setValidity("socialsecurity",is.socialSecurityNumber(element[0].value));
						break;
						case "zipcode":
							formCtrl[inputName].$setValidity("zipcode",is.usZipCode(element[0].value));
						break;

					}
				}
				element.toggleClass('has-error', formCtrl[inputName].$invalid);
			});

			element.bind('blur', function(){
				if(element.attr('dataformat') != undefined && element.attr('dataformat').toLowerCase() == "capitalletters"){
					console.log("fff");
					element.addClass("text-uppercase");				
				}
			});
			
		}
	};
}])


