var app = angular.module('COMET');
var config = require('../config');

app.directive('cometFooter', ['jsonServices','$filter', 'ajaxServices', 'cometServices',
function(jsonServices, $filter, ajaxServices, cometServices) {
	return {
		restrict: 'E',
		scope: {},
		controller: ['$scope', 'cometServices', 
			function($scope, cometServices, elem){
				var self=this;
				$scope.$on("jsonLoaded:buttons", function(event, data){
					console.log("received buttons");
					self.buttons = data;
					console.log(self.buttons);
				});

			}],
		controllerAs: 'footerCtrl',
		bindToController: true,
		transclude: true,
		templateUrl: function(elem, attr){
			return 'tpl/footer.tpl.html';
		},
		link: function(scope, elem, attr,ctrl){
			elem.bind('click', function(event){
				console.log(event);
				console.log(elem);
				if(event.target.attributes['loadpath']){
					console.log(event.target.attributes['loadpath']);
					cometServices.processCall("/comet.icsp?MGWLPN=iCOMET&COMETMode=JS"+event.target.attributes['loadpath']);
				}

			})
		}
	}
}]);