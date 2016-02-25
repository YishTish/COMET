app.directive('cometMenu', ['jsonServices','$filter', 'ajaxServices', 'cometServices', 
	function(jsonServices, $filter, ajaxServices, cometServices) {
	return{
		restrict: 'AE',
		scope: {
			
		},
		controller: ['$scope', 'spinnerService', 'menuServices',
		function($scope, spinnerService, menuServices, elem){
			var self = this;
			self.currentTopic = {};
			self.urlPrefix = config.base_url+":"+config.port;
			self.loadPath = "/comet.icsp?MGWLPN=iCOMET&COMETSID=&COMETMode=JS&SERVICE=DATAFORM&REQUEST=WSY1001&STAGE=REQUEST";
			self.formTitle = "COMET Login"
			self.menuData = Array("1","2","3");

			self.getMenuData = function(callback){
				ajaxServices.httpPromise("","json_src/menu.js").then(function(response){
					self.menuData = response.menu;
					if (typeof(callback) === "function") {
						callback(response.menu);
					}
				});
			};
			self.getMenuData(menuServices.columnLayout);

		}], //close controller

		controllerAs: 'menuCtrl',
		bindToController: true,
		transclude: false,
		templateUrl: function(elem, attr){
			return 'tpl/menu.tpl.html';
		},
		link: function(scope, elem, attr,ctrl){
		}
	} // close return from first line of directive
}]);