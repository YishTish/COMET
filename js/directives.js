app.directive('cometForm', ['jsonServices','$filter', 'ajaxServices', 'ModalService','autoCompleteServices', 'cometServices', 'afterFieldServices', function(jsonServices, $filter, ajaxServices, ModalService, autoCompleteServices, cometServices, afterFieldServices) {
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
			self.errorMessage="";
			self.urlPrefix = config.base_url+":"+config.port;

			self.getFormData = function(){
				if(self.formData == undefined){
					return [];
				}
				return self.formData.fields;
			}
			self.hasError = function(){
				return self.errorMessage!="";
			}
			
			// self.getTemplate= function(field)  {
			// 	return "tpl/"+field.type+".tpl.html";
			// };

			self.sendForm = function(){
			};


			self.buildAutoCompleteQuery = function(fieldId, request){
				return autoCompleteServices.buildAutoCompleteQuery(self.formData.form[0].id, fieldId, request, self.sessionId);
			};
			
			self.formatAutoCompleteResponse = function(result){
				if(result){
					return autoCompleteServices.formatAutoCompleteResponse(result);
				}
			};

			self.handleAutoCompleteResult = function(res){
				self.formData = autoCompleteServices.handleAutoCompleteResult(res, self.formData, self.dataMap);
				
				// var fieldsToUpdate = res.originalObject.update;
				// for(field in fieldsToUpdate){
				// 	element = jsonServices.getDataValue(self.formData, self.dataMap[field]);
				// 	element.value = fieldsToUpdate[field];
				// }
				//Call After-field server request if relevant
				elementToValidate = jsonServices.getDataValue(self.formData, self.dataMap[this.id]);
				if(elementToValidate.ServerValidation){
					afterFieldServices.sendAfterFieldRequest(self.formData, self.dataMap, elementToValidate.id, elementToValidate.value, elementToValidate.ServerValidation, elementToValidate.ServerValidationParameters);
				}
			}

			self.loadModalForm = function (modalForm, modalFormParameters){
				modalUrl = "/comet.icsp?MGWLPN=iCOMET&COMETSID="+self.sessionId+"&COMETMode=JS&SERVICE=DATAFORM&STAGE=REQUEST&MODE=0&\
FORMCODE="+self.currentForm+"&REQUEST="+modalForm+"&DATA=^";
				dataQueryString = cometServices.buildRequestQueryString(modalFormParameters, self.formData, self.dataMap);
				modalQueryUrl = modalUrl+dataQueryString;
				ajaxServices.httpPromise(self.urlPrefix, modalQueryUrl).then(function(res){
					console.log(res);
					ModalService.showModal({
						templateUrl: "/tpl/form.tpl.html",
				//		controller: "modalController",
						inputs: { data: res }
				}).then(function(modal){
						modal.element.modal();
						modal.close.then(function(modalRes){
							console.log(modalRes);
						})
					})
					//console.log(res.error);
					})
			};
			self.getFieldDisplay = function(field, row){
				if(field.visible=="false" || field.type=="hidden"){
					return "item-hidden";
				}
				var columnWidth = "col-md-"+Math.round(12/row.length);
				return "item "+columnWidth;
			};

			self.getDateField = function(fieldVal){
				return Date(fieldVal);
			}

			self.initForm = function initForm(){
				self.formScope = self.element.find('form').scope();
			};

			self.save = function() {
				var queryString = jsonServices.buildQueryString(self.formData);
				ajaxServices.httpPromise(self.urlPrefix, queryString).then(function(res){
					//newString = queryString.substring(12,queryString.length);
					self.handleResponse(res);
				})

			}

			self.handleResponse = function(res){
				if(res.error){
					console.log(res);
					self.errorMessage = res.error;
				}
				else{
					self.getDefaultForm();
					self.errorMessage="";
				}
			}

			self.getDefaultForm = function(){
				var curForm = "WRX2002";
				var resId = "12404";
				var url = "/comet.icsp?MGWLPN=iCOMET&COMETMode=JS&SERVICE=DATAFORM&REQUEST="+curForm+"&STAGE=REQUEST&COMETSID="+self.sessionId+"&ID="+resId;

				ajaxServices.httpPromise(self.urlPrefix, url).then(function(newData){
					if(newData.error){
								self.errorMessage = newData.error;
						}
					else {
						self.errorMessage="";
					}
					if(newData.instructions){
						newPath = newData.instructions[0].COMETMainLocation;
						ajaxServices.httpPromise(self.urlPrefix, newPath).then(function(loginData){
							if(loginData.error){
								self.errorMessage = loginData.error;
							}
							self.serverData = loginData;
							self.setupForm();
						});
					}
					else{
						self.serverData = newData;
						self.setupForm();
					}
				})
			}

			self.setupForm = function(){
				serverData = self.serverData;
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
				element = jsonServices.getDataValue(self.formData, self.dataMap[elementId]);
				if(element != undefined){
					return element.label;
				}
				else
					return "";
			}

			self.buildRequestQueryString = function(fieldsStr){
				console.log(self.dataMap);
				return cometServices.buildRequestQueryString(fieldStr, self.formData, self.dataMap);

			}

			self.sendAfterFieldRequest =  function(fieldId, fieldValue, request, data){
				afterFieldServices.sendAfterFieldRequest(self.formData, self.dataMap, fieldId, fieldValue, request, data);

			};

			self.handleAfterFieldResponse = function(responseJson){
				console.log("after field request sent");
// 					validateUrl = "/comet.icsp?MGWLPN=iCOMET&COMETSID="+self.sessionId+"&COMETMode=JS&SERVICE=AFTERFLD&STAGE=REQUEST&MODE=0&\
// FORMCODE="+self.currentForm+"&FIELD="+fieldId+"&REQUEST="+request+"&DATA=^"+fieldId+"="+fieldValue;
// 					dataQueryString = self.buildRequestQueryString(data);
// 					validateUrl = validateUrl+dataQueryString;
// 					ajaxServices.httpPromise(self.urlPrefix, validateUrl).then(function(res){
// 						self.handleAfterFieldResponse(res);
// 					})
			};

			self.handleAfterFieldResponse = function(responseJson){

				self.formData = afterFieldServices.handleAfterFieldResponse(responseJson, self.formData, self.dataMap);
				$scope.$evalAsync();
				//self.setupForm();
			};

			self.handleQuickSearchResponse = function(res){
				console.log(res.results[0]);
			}

			self.sendQuickSearchRequest =  function(fieldId, fieldValue, request){
					url = "/comet.icsp?MGWLPN=iCOMET&COMETSID="+self.sessionId+"&COMETMode=JS&SERVICE=SRCHFLD&STAGE=REQUEST&MODE=0&\
FORMCODE="+self.currentForm+"&FIELD="+fieldId+"&SCRLN=undefined&REQUEST="+request+"&SRCHFLD="+fieldValue;
					//self.debounceRequest(url);
					ajaxServices.httpDebounce(self.urlPrefix, url, self.handleQuickSearchResponse);
			};
			
			self.getDefaultForm();

		}], //close controller

		controllerAs: 'formCtrl',
		bindToController: true,
		templateUrl: function(elem, attr){
			return 'tpl/form.tpl.html';
		},
		link: function(scope, elem, attr,ctrl){
			elem.bind('blur', function(val){
			});	
		}
	} // close return from first line of directive
}])

.directive('cometField',[ '$compile','ajaxServices', function( $compile, ajaxServices ){
	var getTemplate = function(type){
			return 'tpl/'+type+'.tpl.html';
		};
	var linker = function(scope, element, attr, ctrl){
			//fieldJson = JSON.parse(scope.field);

			var url = "tpl/"+scope.field.type+".tpl.html";
			ajaxServices.httpPromise(self.urlPrefix, url).then(function(result){
				var elem = $compile(result)(scope);	
				element.append(elem[0]);
			});

			element.bind('keyup', function(){
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
					formCtrl.sendAfterFieldRequest(element[0].name, element[0].value, attr.afterTextValidation, attr.afterTextParams);
				}
			});


		}
	};
}])

.directive('cometCheckbox', ['jsonServices', 'ajaxServices', function(jsonServices, ajaxServices){
	return{
		restrict: 'A',
		require: '^cometForm',
		link: function(scope, elem, attr, formCtrl){
			elem.bind('change', function(){
				numericVal = elem[0].checked ? 1 : 0;
				formCtrl.sendAfterFieldRequest(attr.name, numericVal, attr.afterTextValidation, attr.afterTextParams);
			});
		}
	}
}])

.directive('modalFormButton', [function(){
	return{
		restrict: 'A',
		require: '^cometForm',
		link: function(scope, elem, attr, formCtrl){
			elem.bind('click', function(){
				formCtrl.loadModalForm(attr.modalForm, attr.modalFormParams)
			});
		}
	}
}])