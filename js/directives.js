app.directive('cometForm', ['jsonServices','$filter', 'ajaxServices', 'ModalService','autoCompleteServices', 'cometServices', 'afterFieldServices', 'spinnerService',
	function(jsonServices, $filter, ajaxServices, ModalService, autoCompleteServices, cometServices, afterFieldServices, spinnerService) {
	return{
		restrict: 'E',
		transclude: true,
		scope: {
			loadPath: '=loadPath',
			formTitle: '=formTitle',
			closeFunction: '&'

		},
		controller: ['$scope', 'spinnerService', function($scope, spinnerService, elem){
			var self = this;
			self.element = undefined;
			self.formScope = undefined;
			self.submitVal = "Send Form";
			require: 'form';
			self.sessionId ="";
			self.errorMessage="";
			self.urlPrefix = config.base_url+":"+config.port;
			self.modalLoaded = false;

			self.getFormData = function(){
				if(self.formData == undefined){
					return [];
				}
				return self.formData.fields;
			}
			self.hasError = function(){
				return self.errorMessage!="";
			}

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
				ModalService.showModal({
						templateUrl: "tpl/modal.tpl.html",
						controller: "modalController",
						inputs: { loadPath: modalQueryUrl, formTitle: "Please wait. Loading form", modal: this}
				}).then(function(modal){
						modal.element.modal();
						console.log("modal open");
						self.modalLoaded = true;
						modal.close.then(function(modalRes){
							afterFieldServices.handleAfterFieldResponse(modalRes, self.formData, self.dataMap);
							self.modalLoaded = false;
						});
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
				if(self.modalLoaded == true){
					var queryString = jsonServices.buildQueryString(self.formData)+"&SERVICE=DATAFORM";
					ajaxServices.httpPromise(self.urlPrefix, queryString).then(function(response){
						if(response.error){
							self.errorMessage =  response.error;
						}
						else{
							self.closeFunction({res: response});
						}
					})
					return;
				}
				var queryString = jsonServices.buildQueryString(self.formData);
				spinnerService.show('saveSpinner');
				ajaxServices.httpPromise(self.urlPrefix, queryString).then(function(res){
					if(self.$modalInstance){
						$modalInstance.close();
					}
					else{
						self.handleResponse(res);
					}
					spinnerService.hide('saveSpinner');
				})

			}

			self.handleResponse = function(res){
				if(res.error){
					self.errorMessage = res.error;
				}
				else{
					self.errorMessage = "";
				}
				if(res.menu){
					var curForm = "WRX2002";
					var resId = "12404";
					var url = "/comet.icsp?MGWLPN=iCOMET&COMETMode=JS&SERVICE=DATAFORM&REQUEST="+curForm+"&STAGE=REQUEST&COMETSID="+self.sessionId+"&ID="+resId;
					self.loadNextForm(url);
					return;
				}
				if(res.instructions){
					self.loadNextForm(res.instructions[0].COMETMainLocation);
				}
				else{
					self.serverData = res;
					self.setupForm();
				}
			}

			self.loadNextForm = function(path){
				ajaxServices.httpPromise(self.urlPrefix, path).then(function(res){
					self.handleResponse(res);
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

			self.sendQuickSearchRequest =  function(fieldId, fieldValue, request){
					url = "/comet.icsp?MGWLPN=iCOMET&COMETSID="+self.sessionId+"&COMETMode=JS&SERVICE=SRCHFLD&STAGE=REQUEST&MODE=0&\
FORMCODE="+self.currentForm+"&FIELD="+fieldId+"&SCRLN=undefined&REQUEST="+request+"&SRCHFLD="+fieldValue;
					ajaxServices.httpDebounce(self.urlPrefix, url, self.handleQuickSearchResponse);
			};


			self.loadNextForm(self.loadPath);

		}], //close controller

		controllerAs: 'formCtrl',
		bindToController: true,
		templateUrl: function(elem, attr){
			return 'tpl/form.tpl.html';
		},
		link: function(scope, elem, attr,ctrl){
			elem.bind('blur', function(val){
			});	
			if(elem[0].attributes['close-function']){
				console.log("modal");
				ctrl.modalLoaded = true;
			}
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


.directive('validateText', ['ajaxServices', 'jsonServices', 'afterFieldServices', function (ajaxServices, jsonServices, afterFieldServices) {
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
}])

.directive('cometCheckbox', ['jsonServices', 'ajaxServices','afterFieldServices', function(jsonServices, ajaxServices,afterFieldServices){
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

.directive('submitButton', [function(){
	return{
		restrict: 'A',
		require: '^cometForm',
		link: function(scope, elem, attr, formCtrl){
			elem.bind('click', function(){
				elem.toggleClass('active');
			});
		}
	}
}])