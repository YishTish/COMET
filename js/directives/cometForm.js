app.directive('cometForm', ['jsonServices','$filter', 'ajaxServices', 'ModalService','autoCompleteServices', 'cometServices', 'afterFieldServices', 'spinnerService',
	function(jsonServices, $filter, ajaxServices, ModalService, autoCompleteServices, cometServices, afterFieldServices, spinnerService) {
	return{
		restrict: 'E',
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
}]);