var app = angular.module('COMET');
var config = require('../config');

app.factory('cometServices', ['jsonServices',function (jsonServices) {
	return {
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
		}
	}
}]);
