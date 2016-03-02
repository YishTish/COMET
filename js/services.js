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
									if(field.value == undefined || field.value == ""){
										field.value = new Date();
									}
									else{
										field.value = new Date(field.value);
									}
									field.type = "date";
									break;
								case "time":
									if(field.value=""){
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
						if(angular.isObject(formData.fields[row][field]))
							queryString += "&"+formData.fields[row][field].id+"="+formData.fields[row][field].value;
					}
				}
				queryString +="&STAGE=SAVE"
				return encodeURI(queryString);
			}
	};
}])


.factory('ajaxServices', ['$q', '$http', '$templateCache', function ($q, $http, $templateCache) {
	return {
		httpPromise: function(url_prefix, url){
			$http.defaults.useXDomain = true;
			var fullUrl = url_prefix+url;
			delete $http.defaults.headers.common['X-Requested-with'];
			var data = $templateCache.get(fullUrl);
			if (data) {
		         return $q.when(data);
		    } else {
		        var deferred = $q.defer();
		        $http.get(fullUrl, { cache: true}).success(function (html) {
		            $templateCache.put(url, html);

		            deferred.resolve(html);
		    	});
	        	return deferred.promise;
		    }
		},
		httpDebounce: _.debounce(function(prefix, url, callback){
			this.httpPromise(prefix,url).then(function(res){
				callback(res);
			
			})
		}, 500, false)
 	} 
}])

.factory('cometServices', ['jsonServices',function (jsonServices) {
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
}])

.factory('autoCompleteServices', ['cometServices', 'jsonServices', function(cometServices, jsonServices){
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
}])

.factory('afterFieldServices', ['cometServices', 'jsonServices', 'ajaxServices', function(cometServices, jsonServices, ajaxServices){
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
}])

.factory('menuServices', [function () {
	var menu = {
		data: {}	
	};

	menu.updateMenu = function (data) {
		/*

		// save 'divideRatio' in data for each category
		calculateDivideRatio(data);
		// save 'layoutColumns' in data for each category
		generateLayout(data);

		*/

		generateLayoutStockColums(data);

		menu.data = data;
	}

	function calculateDivideRatio(data) {
		data.forEach(function(category, index) {
			// group title should be counted as well as group items 
			var items = category.groups.length; 

			category.groups.forEach(function(group) {
				// exclude the empty groups
				if (group.items.length === 0) items--; 
				
				// add group items
				items += group.items.length;
			});
			// an average value of dividing items into colums
			category.divideRatio = ~~(Math.sqrt(items) + 1); 
		}); 
	}

	function generateLayout(data) {
		data.forEach(function(category) {
			// change the ratio between columns and rows
			var rows = ~~(category.divideRatio * 1.67 + 2);

			var list = [ [] ];
			var currentColumn = 0, currentRow = 0;

			category.groups.forEach(function (group) {
				// we don't want to display empty groups
				if (group.items.length > 0) {

					// prevent the group title to be the last item in the column
					if (currentRow === rows - 1) nextColumn();

					// add group to the column
					list[currentColumn].push(group);
					currentRow++;
					if (currentRow >= rows) nextColumn();

					// add each item of the group to the column
					group.items.forEach(function (item) {
						list[currentColumn].push(item);
						currentRow++;
						if (currentRow >= rows) nextColumn();
					});
				};	
			});

			function nextColumn () {
				currentRow = 0; 
				currentColumn++; 
				list.push([]); 
			}

			category.layoutColumns = list;
		});
	}

	function generateLayoutStockColums(data) {
		data.forEach(function(category) {
			var list = [];
			for (var i = 0; i < +category.columns; i++) list[i] = [];
			category.groups.forEach(function (group) {
				// we don't want to display empty groups
				if (group.items.length > 0 && group.column) {

					// add group to the column
					list[+group.column - 1].push(group);
					
					// add each item of the group to the column
					group.items.forEach(function (item) {
						list[+group.column - 1].push(item);
					});
				};	
			});

			category.layoutColumns = list;
		});
	}

	return menu;
}])

.factory("formService", function() {
	var form = {
		currentForm: "WRX2002"
	};

	form.updateForm = function (formCode) {
		form.currentForm = formCode;
	};

	return form;
});
