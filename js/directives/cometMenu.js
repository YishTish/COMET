var app = angular.module('COMET');
var config = require('../config');

app.directive('cometMenu', ['jsonServices','$filter', 'ajaxServices', 'cometServices', 'menuServices',
function(jsonServices, $filter, ajaxServices, cometServices, menuServices ) {
	return {
		restrict: 'AE',
		scope: {},
		controller: ['$scope', 'formService',
		function($scope, formService, elem){
			var self = this;
			self.currentTopic = {};
			self.urlPrefix = config.base_url+":"+config.port;
			self.loadPath = "/comet.icsp?MGWLPN=iCOMET&COMETSID=&COMETMode=JS&SERVICE=DATAFORM&REQUEST=WSY1001&STAGE=REQUEST";
			self.formTitle = "COMET Login"
			self.menuData = []; 

			
			$scope.reloadForm = function (item) {
				formService.updateForm(item.request);
			}
			
			$scope.$watch(function() {
				return menuServices.data;
			}, function (newValue, oldValue) {
				self.menuData = newValue;
			});

			self.getMenuData = function(data) {
				menuServices.updateMenu(data);
				self.menuData = menuServices.data;
			};
		}], //close controller

		controllerAs: 'menuCtrl',
		bindToController: true,
		transclude: false,
		templateUrl: function(elem, attr){
			return 'tpl/menu.tpl.html';
		},
		link: function(scope, elem, attr,ctrl){
			scope.$watch(
				"$scope.$parent.menu",
				function(menu){
					console.log("My Watch Watches");
					self.menuData = menu;
			})

		}
	} // close return from first line of directive
}]);