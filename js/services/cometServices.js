var app = angular.module('COMET');
var config = require('../config');

app.factory('cometServices', ['$rootScope','jsonServices', 'ajaxServices', 'spinnerServ',
	function ($rootScope, jsonServices, ajaxServices, spinnerServ) {

	var serviceMethods = {
		self: this,
		getUrlPrefix: function(){
			return config.base_url+":"+config.port;
		},

		buildRequestQueryString: function(fieldsStr, formData, dataMap){
			var dataArr = [];
			var queryString = "";
			if(fieldsStr != ""){
				dataArr = fieldsStr.split(";");
			}
			if(dataArr.length){
				for(element in dataArr){
					elementValue = jsonServices.getDataValue(formData, dataMap[dataArr[element]]);
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
					queryString += "^"+dataArr[element]+"="+elementStringValue;
				}
			}
			return queryString;
		},

		routeJson: function(jsonData){
			var sessionId, pageTitle, pageType;

			if (typeof jsonData === "string") {
				return;
			}
			if(jsonData.error){
				$rootScope.$broadcast("valChanged:errorMessage", jsonData.error);
			}
			if(jsonData.session){
				sessionId = jsonData.session[0].COMETSID;
			}
			if(jsonData.instructions){
				serviceMethods.processCall(jsonData.instructions[0].COMETMainLocation);
			}
			if(jsonData.form){
				pageTitle = jsonData.form[0].title;
				pageType = jsonData.form[0].type;

				$rootScope.$broadcast("jsonLoaded:"+jsonData.form[0].type, jsonData);
				$rootScope.$broadcast("valChanged:pageData", {
																'type': pageType,
																'title': pageTitle,
																'sessionId': sessionId
															});
			}
			if(jsonData.menu){
				$rootScope.$broadcast("jsonLoaded:menu", jsonData);
			}
		},

		processCall: function(path, callback){
			spinnerServ.show();
			//var route = this.routeJson;
			ajaxServices.httpPromise(this.getUrlPrefix(), path).then(function(res){	
				serviceMethods.routeJson(res);
				spinnerServ.hide();
				if(callback != undefined){
					callback(res);
				}
			});
		}


	};

	return serviceMethods;
}]);
