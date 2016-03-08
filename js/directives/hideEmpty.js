var app = angular.module('COMET');



app.directive('hideEmpty', [function(){
	return{
		restrict: 'A',
		require: '^cometForm',
		link: function(scope, elem, attr, formCtrl){
			if(attr.optionsCount==0){
				elem.parent().hide();
			}
		}
	}
}])
