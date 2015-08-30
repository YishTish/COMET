app.directive('cometForm', ['jsonServices','$filter', 'ajaxServices', function(jsonServices, $filter, ajaxServices) {
	return{
		restrict: 'E',
		scope: {
			formData: '=formData',
			formTitle: '=formTitle',
		},
		controller: ['$scope', function($scope){
			var self = this;
			self.element = undefined;
			self.formScope = undefined;
			self.submitVal = "Send Form";
			require: 'form';

			self.sessionId ="";
			
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

			self.getSomeValue = function(){
				return "sdsdsds";
			}

			self.save = function() {
				var queryString = jsonServices.buildQueryString(self.formData);
				console.log("Saving form");
				newString = queryString.substring(12,queryString.length);
				console.log(newString);
				ajaxServices.httpPromise(queryString).then(function(res){
						self.handleResponse(res);
				})

			}

			self.handleResponse = function(res){
				console.log(res);
				if(res.error){
					alert(res.error);
					console.log(res.error);
				}
				else{
					self.getDefaultForm();
				}
			}

			self.getDefaultForm = function(){
				var curForm = "WRX2002";
				var resId = "12404";
				var url = "/comet.icsp?MGWLPN=iCOMET&COMETMode=JS&SERVICE=DATAFORM&REQUEST="+curForm+"&STAGE=REQUEST&COMETSID="+self.sessionId+"&ID="+resId;

				ajaxServices.httpPromise(url).then(function(newData){
					if(newData.error){
						loginUrl ="/comet.icsp?MGWLPN=iCOMET&COMETMode=JS&SERVICE=DATAFORM&REQUEST=WSY1001&STAGE=REQUEST";
						ajaxServices.httpPromise(loginUrl).then(function(loginData){
							self.setupForm(loginData);
						});
					}
					else{
						self.setupForm(newData);
					}
				})
			}

			self.setupForm = function(serverData){
				self.sessionId = serverData.session[0].COMETSID;
				self.currentForm = serverData.form[0].id;
				self.formTitle = serverData.form[0].title;
				self.formData = jsonServices.parseJson(serverData);
				self.dataMap = jsonServices.mapJson(serverData);
			}

			self.reset = function() {
				console.log("reset");
				$scope.$broadcast('show-errors-reset');
			}

			self.getElementLabel = function(elementId){
				result = "";
				for(field in self.formData.fields){
					result = $filter('filter')(self.formData.fields[field], function(res){
						if(res.id == elementId){
							return res;
						}
					});
					if(result != ""){
						break;
					}
				}
				return result[0].label;
			}

			self.getDefaultForm();
		}],
		controllerAs: 'formCtrl',
		bindToController: true,
		templateUrl: function(elem, attr){
			return 'tpl/form.tpl.html';
		},
		link: function(scope, elem, attr,ctrl){
			elem.bind('blur', function(val){
				console.log(val);
			});
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

.directive('validateText', ['ajaxServices', 'jsonServices', function (ajaxServices, jsonServices) {
	return {
		restrict: 'A',
		require: '^cometForm',
		controller: ['$scope', function($scope) {
				
		}],
		
		link: function (scope, element, attr, formCtrl) {
			element.bind('keyup', function(){
				var inputName = element.attr('name');
				var dataFormat = element.attr('dataformat');
				var valid = true;
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
				if(attr.afterTextValidation != undefined && attr.afterTextParams != undefined){
					sendAfterFieldRequest(scope.$parent.field.id, attr.afterTextValidation, attr.afterTextParams);
					validateUrl = "/comet.icsp?MGWLPN=iCOMET&COMETSID="+formCtrl.sessionId+"&COMETMode=JS&SERVICE=AFTERFLD&STAGE=REQUEST&MODE=0&FORMCODE="+formCtrl.currentForm+"&FIELD="+scope.$parent.field.id+"&REQUEST="+attr.afterTextValidation+"&DATA=^"+scope.$parent.field.id+"="+scope.$parent.field.value;
					ajaxServices.httpPromise(validateUrl).then(function(resp){
						//scope.handleAfterFieldResponse(resp);
					})
				}
			});
			
			sendAfterFieldRequest =  function(fieldId, request, data){
					dataArr = data.split(";");
					validateUrl = "/comet.icsp?MGWLPN=iCOMET&COMETSID="+formCtrl.sessionId+"&COMETMode=JS&SERVICE=AFTERFLD&STAGE=REQUEST&MODE=0&\
					FORMCODE="+formCtrl.currentForm+"&FIELD="+fieldId+"&REQUEST="+request+"&DATA=^"+fieldId+"="+scope.$parent.field.value;
					for(element in dataArr){
						elementValue = jsonServices.getDataValue(formCtrl.formData, formCtrl.dataMap[dataArr[element]]).value;
						validateUrl += "^"+dataArr[element]+"="+elementValue;
					}
					ajaxServices.httpPromise(validateUrl).then(function(res){
						handleAfterFieldResponse(res);
					})
					


			};

			self.handleAfterFieldResponse = function(responseJson){
				fields = responseJson.fields
				for(field in fields){
					if( formCtrl.dataMap[fields[field].id] == undefined){
						console.log("An unrecognized attribute was received: "+fields[field].id + "("+fields[field].value+")");
					}
					else{
						console.log(fields[field]);
						console.log(fields[field].id+": "+fields[field].value);
						fieldToChange = jsonServices.getDataValue(formCtrl.formData, formCtrl.dataMap[fields[field].id])
						for(attr in fields[field]){
							console.log("before: "+attr+": "+fieldToChange[attr]);
							fieldToChange[attr] = fields[field][attr];
							console.log("after: "+attr+": "+fieldToChange[attr]);
						}
						
					}
				console.log("==================");
				}
			}
		}
	};
}])


// AFTER FIELD
// Service    = "AFTERFLD"
// Stage      = "REQUEST"
// Request    =  data-ServerValidation
// Mode       = "0"
// Formcode   =  FormCode
// Field      =  FieldID
// Data       =  data-ServerValidationParameters (list of fields with their values delimited by carret (^))
// ScrollLine = Scrln
// for example : http://www.lintechhq.com:3757/comet.icsp?MGWLPN=iCOMET&COMETSID=6375326330&COMETMode=JS
// &SERVICE=AFTERFLD&STAGE=REQUEST&MODE=0&FORMCODE=WRX2002&FIELD=DRUGCODE&REQUEST=ADRUG^WRX2002
// &DATA=^DRUGCODE=205023^RXORD=^RXOSDT=07/20/2015^RXOSTM=7:31^RXOFREQ=&SCRLN=
