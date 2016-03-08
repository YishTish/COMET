var app = angular.module('COMET');

app.factory('afterFieldServices', ['cometServices', 'jsonServices', 'ajaxServices', function(cometServices, jsonServices, ajaxServices){
	return{
		handleAfterFieldResponse: function(responseJson, formData, dataMap){
			fields = responseJson.fields;
			for(field in fields){
				if( dataMap[fields[field].id] == undefined){
					console.log("An unrecognized attribute was received: "+fields[field].id + "("+fields[field].value+")");
				}
				else{
					fieldToChange = jsonServices.getDataValue(formData, dataMap[fields[field].id]);
					switch(fieldToChange.type){
						case "number":
							fields[field].value = parseInt(fields[field].value);
							break;
						case "date":
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
		return formData;
		//self.setupForm();
		},

		sendAfterFieldRequest: function(formData, dataMap, fieldId, fieldValue, request, data){
			var self = this;
			sessionId = formData.session[0].COMETSID;
			formId = formData.form[0].id;
			validateUrl = "/comet.icsp?MGWLPN=iCOMET&COMETSID="+sessionId+"&COMETMode=JS&SERVICE=AFTERFLD&STAGE=REQUEST&MODE=0&\
FORMCODE="+formId+"&FIELD="+fieldId+"&REQUEST="+request+"&DATA=^"+fieldId+"="+fieldValue;
			dataQueryString = cometServices.buildRequestQueryString(data, formData, dataMap);
			validateUrl = validateUrl+dataQueryString;
			ajaxServices.httpPromise(cometServices.getUrlPrefix(), validateUrl).then(function(res){
				formData = self.handleAfterFieldResponse(res, formData, dataMap);
			})
		}

	}
}]);