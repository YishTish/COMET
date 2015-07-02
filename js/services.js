app.factory('jsonServices', [ '$http' , function ($http) {
	
	return {
		 loadFile: function(filename, scope){
			$http.get("json_src/"+filename+".json").then(function(res){
				scope.formData =  res.data;
			});
		}
	};
}]);