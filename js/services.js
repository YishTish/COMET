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
				for(field in jsonObject.fields){
					var field = jsonObject.fields[field];
					if(field.type.toUpperCase() == "text".toUpperCase() && field.dataFormat!=undefined){
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
				return jsonObject;
			},
	};
}])


.factory('ajaxServices', ['$q', '$http', '$templateCache', function ($q, $http, $templateCache) {
	return {
		httpPromise: function(url){
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
