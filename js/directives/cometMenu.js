app.directive('cometMenu', ['jsonServices','$filter', 'ajaxServices', 'cometServices', 'menuServices',
function(jsonServices, $filter, ajaxServices, cometServices, menuServices
	) {
	return {
		restrict: 'AE',
		scope: {
			
		},
		controller: ['$scope', 'spinnerService', 
		function($scope, spinnerService,  elem){
			var self = this;
			self.currentTopic = {};
			self.urlPrefix = config.base_url+":"+config.port;
			self.loadPath = "/comet.icsp?MGWLPN=iCOMET&COMETSID=&COMETMode=JS&SERVICE=DATAFORM&REQUEST=WSY1001&STAGE=REQUEST";
			self.formTitle = "COMET Login"
			self.menuData = []; 

			$scope.$watch(function() {
				return menuServices.data;
			}, function (newValue, oldValue) {
				self.menuData = newValue;
			});

			/*
			self.getMenuData = function(callback){
				ajaxServices.httpPromise("","json_src/menu.js").then(function(response){
>>>>>>> 43d46017d0d0994401c9d73119933ca444d01470
					self.menuData = response.menu;
					if (typeof(callback) === "function") {
						callback(response.menu);
					}
				});
			};
<<<<<<< HEAD

			
			self.getMenuData();
			console.log($scope.$parent.menu);
=======
			self.getMenuData(menuServices.columnLayout);
			*/
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