app.directive('cometForm', ['jsonServices','$filter', 'ajaxServices', 'ModalService', function(jsonServices, $filter, ajaxServices, ModalService) {
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

			self.hasError = function(){
				return self.errorMessage!="";
			}
			
			self.getTemplate= function(field)  {
				return "tpl/"+field.type+".tpl.html";
			};

			self.sendForm = function(){
				//console.log(self.formData.fields);
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
				console.log("received response");
				if(res.error){
					console.log(res);
					self.errorMessage = res.error;
					ModalService.showModal({
						templateUrl: "/tpl/modal.html",
						controller: "modalController",
						inputs: { msg: res.error }
					}).then(function(modal){
						modal.element.modal();
						modal.close.then(function(res){
							console.log(res);
						})
					})
					//console.log(res.error);
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
//					console.log(newData);
					if(newData.error){
								self.errorMessage = newData.error;
						}
					else {
						self.errorMessage="";
					}
					if(newData.instructions){
						newPath = newData.instructions[0].COMETMainLocation;
//						console.log(newPath);
						ajaxServices.httpPromise(self.urlPrefix, newPath).then(function(loginData){
							if(loginData.error){
								self.errorMessage = loginData.error;
							}
//							console.log(loginData);
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
				//console.log(serverData);
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


			self.sendAfterFieldRequest =  function(fieldId, fieldValue, request, data){
					var dataArr = []
					if(data != ""){
						dataArr = data.split(";");
					}
					console.log("AFTER FIELD");
					validateUrl = "/comet.icsp?MGWLPN=iCOMET&COMETSID="+self.sessionId+"&COMETMode=JS&SERVICE=AFTERFLD&STAGE=REQUEST&MODE=0&\
FORMCODE="+self.currentForm+"&FIELD="+fieldId+"&REQUEST="+request+"&DATA=^"+fieldId+"="+fieldValue;
					if(dataArr.length){
						console.log(dataArr);
						for(element in dataArr){
							elementValue = jsonServices.getDataValue(self.formData, self.dataMap[dataArr[element]]);
							if(elementValue.type=="date"){
								elementDateValue = elementValue.value;
								elementStringValue = elementDateValue.getFullYear()+'-'+elementDateValue.getMonth()+'-'+elementDateValue.getDate();
							}
							else if(elementValue.type=="time"){
								elementTimeValue = elementValue.value;
								if(elementTimeValue != "")
								{
									var hr = elementTimeValue.getHours();
									if(hr < 10) hr = "0"+hr;
									var mn = elementTimeValue.getMinutes();
									if(mn < 10) mn = "0"+mn;
									elementStringValue = hr+':'+mn;
								}
							}	
							else {
								elementStringValue = elementValue.value;	
							}
							console.log(dataArr[element]+" = "+elementStringValue);
							validateUrl += "^"+dataArr[element]+"="+elementStringValue;
						}
					}
					console.log(validateUrl);
					ajaxServices.httpPromise(self.urlPrefix, validateUrl).then(function(res){
						self.handleAfterFieldResponse(res);
					})
					


			};

			self.handleAfterFieldResponse = function(responseJson){
				console.log(responseJson);
				fields = responseJson.fields
				for(field in fields){
					if( self.dataMap[fields[field].id] == undefined){
						console.log("An unrecognized attribute was received: "+fields[field].id + "("+fields[field].value+")");
					}
					else{
						fieldToChange = jsonServices.getDataValue(self.formData, self.dataMap[fields[field].id]);
						switch(fieldToChange.type){
							case "number":
								fields[field].value = parseInt(fields[field].value);
								break;
							case "date":
								console.log(fields[field]);
								fields[field].value = new Date(fields[field].value);
								break;
							case "time":
								var timeArray = fields[field].value.split(":");
								var inputDate = new Date();
								inputDate.setHours(timeArray[0]);
								inputDate.setMinutes(timeArray[1]);
								fields[field].value = inputDate;
						}
						for(attr in fields[field]){
							fieldToChange[attr] = fields[field][attr];
							if(attr == "disabled"){
								toDisable = fields[field][attr] == "true" ? true : false
									document.querySelector("#"+fields[field].id).disabled=toDisable;					
							}
						}
						
					}
				}
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
				console.log(val);
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
				var callquickSearch = _.debounce(formCtrl.sendQuickSearchRequest,1500,false);
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
				if(element.attr('key-up-search')!=undefined && element.attr('key-up-search')!=""){
						//_.debounce(formCtrl.sendQuickSearchRequest(element[0].name, element[0].value, element.attr('key-up-search')),500);
						if(element[0].value.length>2)
							formCtrl.sendQuickSearchRequest(element[0].name, element[0].value, element.attr('key-up-search'));

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