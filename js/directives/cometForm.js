var app = angular.module('COMET');
var config = require('../config');

app.directive('cometForm', ['jsonServices','$filter', 'ajaxServices', '$uibModal','autoCompleteServices', 'cometServices', 'afterFieldServices', 'menuServices', 'spinnerServ',
	function(jsonServices, $filter, ajaxServices, $uibModal, autoCompleteServices, cometServices, afterFieldServices, menuServices, spinnerServ) {
	return{
		restrict: 'E',
		transclude: true,
		scope: {
			loadPath: '=loadPath',
			formTitle: '=formTitle',
			closeFunction: '&'

		},
		controller: ['$scope', '$uibModal', '$log', "formService",
		function($scope, $uibModal, $log, formService, elem){
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
				var modalUrl = "/comet.icsp?MGWLPN=iCOMET&COMETSID="+self.sessionId+"&COMETMode=JS&SERVICE=DATAFORM&STAGE=REQUEST&MODE=0&\
	FORMCODE="+self.currentForm+"&REQUEST="+modalForm+"&DATA=^";
				var dataQueryString = cometServices.buildRequestQueryString(modalFormParameters, self.formData, self.dataMap);
				var modalQueryUrl = modalUrl+dataQueryString;
				var modalInstance = $uibModal.open({
	      			animation: true,
	      			templateUrl: "tpl/modal.tpl.html",
	      			controller: "ModalInstanceCtrl",
	      			 resolve: {
				        loadPath: function(){
				        	return modalQueryUrl;
				        }
				//        formTitle:  "Please wait. Loading form", 
				       // modal: this
	      			}
	    		});

			    modalInstance.result.then(function (modalRes) {
			     	afterFieldServices.handleAfterFieldResponse(modalRes, self.formData, self.dataMap);
					self.modalLoaded = false;
			  	});
			}




			/*	modalUrl = "/comet.icsp?MGWLPN=iCOMET&COMETSID="+self.sessionId+"&COMETMode=JS&SERVICE=DATAFORM&STAGE=REQUEST&MODE=0&\
FORMCODE="+self.currentForm+"&REQUEST="+modalForm+"&DATA=^";
				dataQueryString = cometServices.buildRequestQueryString(modalFormParameters, self.formData, self.dataMap);
				modalQueryUrl = modalUrl+dataQueryString;
				ModalService.showModal({
						templateUrl: "tpl/modal.tpl.html",
						controller: "modalController",
						inputs: { loadPath: modalQueryUrl, formTitle: "Please wait. Loading form", modal: this}
				}).then(function(modal){
						console.log(modal);
						modal.element.modal();
						console.log("modal open");
						self.modalLoaded = true;
						modal.close.then(function(modalRes){
							afterFieldServices.handleAfterFieldResponse(modalRes, self.formData, self.dataMap);
							self.modalLoaded = false;
						});
				}).catch(function(error){
					console.log(error);
				})
			};*/
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
				console.log("Save");
				spinnerServ.show();
				if(self.modalLoaded == true){
					var queryString = jsonServices.buildQueryString(self.formData)+"&SERVICE=DATAFORM";
					ajaxServices.httpPromise(self.urlPrefix, queryString).then(function(response){
						if(response.error){
							self.errorMessage =  response.error;
						}
						else{
							self.closeFunction({res: response});
						}
						spinnerServ.hide();
					});
					return;
				}
				var queryString = jsonServices.buildQueryString(self.formData);
				ajaxServices.httpPromise(self.urlPrefix, queryString).then(function(res){
					if(self.$modalInstance){
						$modalInstance.close();
					}
					else{
						self.handleResponse(res);
					}
					spinnerServ.hide();
				});

			};

			self.handleResponse = function(res){
				if (typeof res === "string") {
					return;
				}
				if(res.error){
					self.errorMessage = res.error;
				}
				else{
					self.errorMessage = "";
				}
				if(res.menu){
					console.log(res.menu);
					$scope.$parent.menu=res.menu;
					var curForm = "WRX2002";
					var resId = "12404";
					var url = "/comet.icsp?MGWLPN=iCOMET&COMETMode=JS&SERVICE=DATAFORM&REQUEST="+curForm+"&STAGE=REQUEST&COMETSID="+self.sessionId+"&ID="+resId;
					menuServices.updateMenu(res.menu);
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
			};

			self.loadNextForm = function(path){
				spinnerServ.show();
				ajaxServices.httpPromise(self.urlPrefix, path).then(function(res){
				//ajaxServices.httpPromise("", "json_src/wrx2002.json").then(function(res){
					self.handleResponse(res);
					spinnerServ.hide();
				});
			};

			self.setupForm = function(){
				serverData = self.serverData;
				self.sessionId = serverData.session[0].COMETSID;
				self.currentForm = serverData.form[0].id;
				self.formTitle = serverData.form[0].title;
				self.formData = jsonServices.parseJson(serverData);
				console.log(self.formData);
				self.dataMap = jsonServices.mapJson(serverData);
			};

			self.reset = function() {
				console.log("reset");
				$scope.$broadcast('show-errors-reset');
			};


			self.getElementLabel = function(elementId){
				element = jsonServices.getDataValue(self.formData, self.dataMap[elementId]);
				if(element != undefined){
					return element.label;
				}
				else
					return "";
			};

			self.buildRequestQueryString = function(fieldsStr){
				console.log(self.dataMap);
				return cometServices.buildRequestQueryString(fieldStr, self.formData, self.dataMap);

			};

			self.sendQuickSearchRequest =  function(fieldId, fieldValue, request){
					url = "/comet.icsp?MGWLPN=iCOMET&COMETSID="+self.sessionId+"&COMETMode=JS&SERVICE=SRCHFLD&STAGE=REQUEST&MODE=0&\
FORMCODE="+self.currentForm+"&FIELD="+fieldId+"&SCRLN=undefined&REQUEST="+request+"&SRCHFLD="+fieldValue;
					ajaxServices.httpDebounce(self.urlPrefix, url, self.handleQuickSearchResponse);
			};


			self.loadNextForm(self.loadPath);

			$scope.$watch(function() {
				return formService.currentForm;
			}, function (curForm) {
				var url = "/comet.icsp?MGWLPN=iCOMET&COMETMode=JS&SERVICE=DATAFORM&REQUEST="+
				curForm + "&STAGE=REQUEST&COMETSID=" + self.sessionId;
				self.loadNextForm(url);
			});


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
				ctrl.modalLoaded = true;
			}
		}
	} // close return from first line of directive
}]);