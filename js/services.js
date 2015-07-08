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
				if(field.type == "date"){
					var newDate = new Date(field.value);
					field.dateObject = newDate;
				}
			}
			return jsonObject;
		}
	};
}]);