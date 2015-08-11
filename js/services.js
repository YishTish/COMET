app.factory('jsonServices', [ '$http' , function ($http) {
	return {
		 // loadFile: function(filename, dataToReturn){
		 // 	var self = this;
			// $http.get("json_src/"+filename+".json").then(function(res){
			// 	//res.data = self.parseJson(res.data);
			// 	dataToReturn = self.parseJson(res.data);
			// 	//console.log(dataToReturn);
			// });
		//},
			parseJson: function(jsonObject){
				for(row in jsonObject.fields){
					for(singleField in jsonObject.fields[row]){
						var field = jsonObject.fields[row][singleField];
						if(field.type.toLowerCase() == "text" && field.dataFormat!=undefined){
							switch(field.dataFormat.toLowerCase()){
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
									field.type = "time"
									break;
								case "browse":
									field.required = "false"
									break;
								case "float":
								case "float1":
								case "numeric":
									field.value= + field.value;
									field.type = "number";
									break;
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

			buildQueryString: function(formData){
				queryString = formData.session[0].COMETURL;
				queryString += "&REQEST="+formData.form[0].id;
				for(row in formData.fields){
					for(field in formData.fields[row]){
						if(angular.isObject(formData.fields[row][field]))
							queryString += "&"+formData.fields[row][field].id+"="+formData.fields[row][field].value;
					}
				}
				queryString +="&STAGE=SAVE"
				return queryString;



			}
	};
}])


.factory('ajaxServices', ['$q', '$http', '$templateCache', function ($q, $http, $templateCache) {
	return {
		httpPromise: function(url){
			$http.defaults.useXDomain = true;
			delete $http.defaults.headers.common['X-Requested-with'];
			var data = $templateCache.get(url);

		    if (data) {
		         return $q.when(data);
		    } else {
		        var deferred = $q.defer();

		        $http.get(url, { cache: true }).success(function (html) {
		            $templateCache.put(url, html);

		            deferred.resolve(html);
		    	});
	        	return deferred.promise;
		    }
		}
 	} 
}]);