var app = angular.module('COMET');

app.factory('jsonServices', [ '$http' , function ($http) {
	return {
			parseJson: function(jsonObject){
				for(row in jsonObject.fields){
					for(singleField in jsonObject.fields[row]){
						var field = jsonObject.fields[row][singleField];
						if(field.type == undefined){
							continue;
						}
						if(field.type.toLowerCase() == "text"){
							if(field.search){
								field.type = "autocomplete";
							}
							if(field.Format!=undefined){
							switch(field.Format.toLowerCase()){
								case "date":
									var d;
									if(field.value == undefined || field.value == ""){
										d = new Date();
									}
									else{
										d = new Date(field.value);
									}
									field.value = (d.getMonth()+1)+"/"+d.getDate()+"/"+d.getFullYear();
									field.type = "date";
									break;
								case "time":
									if(field.value==""){
									//	field.value = "00:00:00";
									}
									field.type = "time";
									break;
								case "browse":
									field.required = "false";
									break;
								case "float":
								case "float1":
								case "float4":
								case "numeric":
									field.value= + field.value;
									field.type = "number";
									break;
							}
						}
					}
					if(field.value!=null && field.value!="" && angular.isString(field.value)){
							field.size = field.value.length * 10;
						
					}
					else{
						field.size=100;
					}
				}
			}
				return jsonObject;
			},

			mapJson: function(jsonObject){
				jsonMap = [];
				for(row in jsonObject.fields){
					for(singleField in jsonObject.fields[row]){
						var field = jsonObject.fields[row][singleField];
						jsonMap[field.id] = ""+row+"-"+singleField;
					}
				}
				return jsonMap;
			},

			getDataValue: function(jsonObject, key){
				if(key == undefined){
					return "";
				}
				var row = key.substring(0, key.indexOf("-"));
				var field = key.substring(key.indexOf("-")+1);
				return jsonObject.fields[row][field];
			},


			buildQueryString: function(formData){
				queryString = formData.session[0].COMETURL;
				queryString += "&REQUEST="+formData.form[0].id;
				for(row in formData.fields){
					for(field in formData.fields[row]){
						console.log(formData.fields[row][field]);
						if(angular.isObject(formData.fields[row][field])){
							queryString += "&"+formData.fields[row][field].id+"="+formData.fields[row][field].value;
							console.log(queryString);
						}

					}
				}
				queryString +="&STAGE=SAVE";
				return encodeURI(queryString);
			}
	};
}]);
