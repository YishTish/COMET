var app = angular.module('COMET');

app.factory('autoCompleteServices', ['cometServices', 'jsonServices', function(cometServices, jsonServices){
	return{
		buildAutoCompleteQuery: function(formId, fieldId, request, sessionId){
			var queryString = cometServices.getUrlPrefix()+"/comet.icsp?MGWLPN=iCOMET&COMETMode=JS&SERVICE=SRCHFLD&STAGE=REQUEST&MODE=0&";
			queryString += "FORMCODE="+formId+"&FIELD="+fieldId+"&COMETSID="+sessionId+"&REQUEST="+request+"&SRCHFLD=";
			return queryString;
		},

		formatAutoCompleteResponse: function(result){
			for(line in result.results){
				disp = result.results[line].display;
				var displayList = "";
				// displayList = "<ul class=\"list-unstyled\">";
				for(element in disp){
					// displayList+= "<li>"+disp[element]+"</li>";
					displayList+= disp[element]+" | ";
				}
				// displayList+= "</ul>";
				result.results[line].finalDisplay = displayList;//"<ul  style='font-size:11px'><li>"+disp.data2+"</li><li>"+disp.data1+" - "+disp.data3+"</li></ul>";
				//result.results[line].finalDisplay = disp.data2+" ("+disp.data1+")";
			}
			return result;
		},

		handleAutoCompleteResult: function(res, formData, dataMap){
			var fieldsToUpdate = res.originalObject.update;
			for(field in fieldsToUpdate){
				element = jsonServices.getDataValue(formData, dataMap[field]);
				element.value = fieldsToUpdate[field];
			}
			return formData;
		}
	}
}]);