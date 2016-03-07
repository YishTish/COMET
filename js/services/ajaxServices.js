var app = angular.module('COMET');

app.factory('ajaxServices', ['$q', '$http', '$templateCache', function ($q, $http, $templateCache) {
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
}]);