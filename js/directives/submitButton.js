var app = angular.module('COMET');

app.directive('submitButton', [function(){
	return{
		restrict: 'A',
		require: '^cometForm',
		link: function(scope, elem, attr, formCtrl){
			elem.bind('click', function(){
				elem.toggleClass('active');
			});
		}
	}
}]);