var app = angular.module('COMET');
var config = require('../config');

app.directive('cometMenu', ['jsonServices','$filter', 'ajaxServices', 'cometServices', 'menuServices',
function(jsonServices, $filter, ajaxServices, cometServices, menuServices) {
	return {
		restrict: 'AE',
		scope: {},
		controller: ['$scope', 'cometServices', 
		function($scope, cometServices, elem){
			var self = this;
			// self.currentTopic = {};
			// self.urlPrefix = config.base_url+":"+config.port;
			self.loadPath = "/comet.icsp?MGWLPN=iCOMET&COMETMode=JS";//"   COMETSID=&COMETMode=JS&SERVICE=DATAFORM&REQUEST=WSY1001&STAGE=REQUEST";
			// self.formTitle = "COMET Login"
			self.menuData = [];

			self.loadedItem = true;

			// load menu items on click
			$scope.loadItem = function (item, index) {
				console.log(item);
				self.loadedItem = false;
				var url = self.loadPath + "&COMETSID="+config.sessionId+
										  "&SERVICE="+item.service+
										  "&REQUEST="+item.request+
										  "&STAGE="+item.stage+
										  "&"+item.parameters;
				cometServices.processCall(url, function(res){
					self.loadedItem = true;
				});
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

			self.sendCleanRequest = function(){
				var url = self.loadPath + "&COMETSID="+config.sessionId+
										  "&SERVICE=CLEANVAR"
				cometServices.processCall(url, function(res){
					self.loadedItem = true;
				});
			}

			var remote = true;

			// get remote menu json
			$scope.$watch(function() {
				return menuServices.data;
			}, function (newValue, oldValue) {
				self.menuData = newValue;
			});

			$scope.$on("jsonLoaded:menu", function(event, data){
				console.log(data);
				menuServices.updateMenu(data.menu);
				self.menuData = data;
			});

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
			});
		}
	} // close return from first line of directive
}]);

app.directive('menuDisplay', ['ajaxServices', function($scpoe, ajaxServices){
	return {
		restrict: 'A',
		require: '^cometMenu',
		link: function(scope, elem, attr, cometMenu){
			//This piece of code is a hack to make the menu dissapear after the click,
			//and be available for the next time the menu is hovered over.
			elem.bind('click', function(event){
				//cometMenu.sendCleanRequest();
				elem.hide();
				var intID = setInterval(function(){
					if(cometMenu.loadedItem === true){
						elem.show();
						clearInterval(intID);
					}
				},1000);
			})
		}
	}
}])
