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
					if(field.type.toUpperCase() == "date".toUpperCase()){
						field.dateObject = new Date(field.value);
					}
					if(field.type.toUpperCase() =="numeric".toUpperCase() ||
						field.type.toUpperCase() =="float".toUpperCase()){
						field.value= + field.value;
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
