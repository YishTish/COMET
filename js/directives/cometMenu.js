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

			// reload form on click
			$scope.reloadForm = function (item) {
				console.log(item.label);
				formService.updateForm(item.request);
			}

			// get static menu json from local server
			self.getLocalMenuData = function(callback){
				ajaxServices.httpPromise("","json_src/menu.js").then(function(response){
					self.menuData = response.menu;
					if (typeof(callback) === "function") {
						callback(response.menu);
					}
				});
			};

			var remote = true;

			// get remote menu json
			if (remote) {

				$scope.$watch(function() {
					return menuServices.data;
				}, function (newValue, oldValue) {
					self.menuData = newValue;
				});

			// get local menu json, for debug purpose,
			// do not forget to update menu.js to current version
			} else {

				self.getLocalMenuData(function (data) {
					menuServices.updateMenu(data);
					self.menuData = menuServices.data;
				});

			}

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
