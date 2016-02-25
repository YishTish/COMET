app.directive('cometMenu', ['jsonServices','$filter', 'ajaxServices', 'cometServices', 
	function(jsonServices, $filter, ajaxServices, cometServices) {
	return{
		restrict: 'AE',
		scope: {
			
		},
		controller: ['$scope', 'spinnerService', function($scope, spinnerService, elem){
			var self = this;
			self.currentTopic = {};
			self.urlPrefix = config.base_url+":"+config.port;
			self.loadPath = "/comet.icsp?MGWLPN=iCOMET&COMETSID=&COMETMode=JS&SERVICE=DATAFORM&REQUEST=WSY1001&STAGE=REQUEST";
			self.formTitle = "COMET Login"
			self.menuData = Array("1","2","3");

			self.getMenuData = function(){
				ajaxServices.httpPromise(self.urlPrefix, self.loadPath).then(function(response){
					self.menuData = response.menu;
				});
			};

			
			self.getMenuData();
			console.log($scope.$parent.menu);

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