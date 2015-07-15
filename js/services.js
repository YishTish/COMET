app.factory('jsonServices', [ '$http' , function ($http) {
	
	return {
		 loadFile: function(filename, scope){
			$http.get("json_src/"+filename+".json").then(function(res){
				scope.formData = res.data;
				scope.parseJson(scope.formData);
			});
		},
		parseJson: function(jsonObject){
			for(field in jsonObject.fields){
				var field = jsonObject.fields[field];
				if(field.type.toUpperCase() == "date".toUpperCase()){
					field.dateObject = Date(field.value);
				}
				if(field.required==undefined){
					field.required=false;
				}
				console.log(field.id +": "+field.required);

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
