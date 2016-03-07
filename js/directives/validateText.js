var app = angular.module('COMET');

app.directive('validateText', ['ajaxServices', 'jsonServices', 'afterFieldServices', function (ajaxServices, jsonServices, afterFieldServices) {
	return {
		restrict: 'A',
		require: '^cometForm',
		controller: ['$scope', function($scope) {
				self.isDisabled = function(fieldId){
				console.log(jsonServices.getDataValue(self.formData, self.dataMap[fieldId]));
				if(jsonServices.getDataValue(self.formData, self.dataMap[fieldId]).disabled=="true"){
					console.log(fieldId + " is disabled");
					return "true";
				}
				console.log(fieldId + " is enabled");
				return "false";
			}
		}],
		
		link: function (scope, element, attr, formCtrl) {
			element.bind('keyup', function(){
				var inputName = element.attr('name');
				var dataFormat = element.attr('dataformat');
				var valid = true;
			//	var callquickSearch = _.debounce(formCtrl.sendQuickSearchRequest,1500,false);
				if(dataFormat){
					switch(dataFormat.toLowerCase()){
						case "alphanumeric":
							element[0].$setValidity("alphanumeric",is.alphaNumeric(element[0].value));
						break;
						case "phonenumber":
							element[0].$setValidity("phonenumber",is.nanpPhone(element[0].value));
						break;
						case "socialsecuritynumber":
							element[0].$setValidity("socialsecurity",is.socialSecurityNumber(element[0].value));
						break;
						case "zipcode":
							element[0].$setValidity("zipcode",is.usZipCode(element[0].value));
						break;

					}
				}
				element.toggleClass('has-error', element[0].$invalid);
			});

			element.bind('blur', function(){
				if(element.attr('dataformat') != undefined && element.attr('dataformat').toLowerCase() == "capitalletters"){
					element.addClass("text-uppercase");
				}
				if(attr.afterTextValidation){
					afterFieldServices.sendAfterFieldRequest(formCtrl.formData, formCtrl.dataMap, element[0].name, element[0].value, attr.afterTextValidation, attr.afterTextParams);
				}
			});


		}
	};
}]);