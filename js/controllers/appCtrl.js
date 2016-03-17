var app = angular.module('COMET');
var config = require('../config');


app.controller('appCtrl', ['$scope', 'ajaxServices', 'jsonServices','spinnerServ', 'cometServices', 
	function ($scope, ajaxServices, jsonServices, spinnerServ, cometServices) {

		var self = this;
		self.urlPrefix = config.base_url+":"+config.port;
		self.curForm = "WRX2002";
		self.resId = "12404";
		self.sessionId = "";
		self.url = "/comet.icsp?MGWLPN=iCOMET&COMETMode=JS&SERVICE=DATAFORM&REQUEST="+this.curForm+"&STAGE=REQUEST&COMETSID="+this.sessionId+"&ID="+this.resId;
		self.pageTitle = "";
		self.errorMessage = "";
		self.pageType = "";



		self.loadPath = self.url;
		


		//Go through the response page received for page-related data, before sending it to be routed and managed by specific directives/controllers
		// self.handleResponse = function(res){
		// 			if (typeof res === "string") {
		// 				return;
		// 			}
		// 			if(res.error){
		// 				self.errorMessage = res.error;
		// 			}
		// 			if(res.session){
		// 				self.sessionId = res.session[0].COMETSID;
		// 			}
		// 			if(res.menu){
		// 				var curForm = "WRX2002";
		// 				var resId = "12404";
		// 				var url = "/comet.icsp?MGWLPN=iCOMET&COMETMode=JS&SERVICE=DATAFORM&REQUEST="+curForm+"&STAGE=REQUEST&COMETSID="+self.sessionId+"&ID="+resId;
		// 				//menuServices.updateMenu(res.menu);
		// 				self.loadServerData(url);
		// 				//return;
		// 			}
		// 			if(res.instructions){
		// 				self.loadServerData(res.instructions[0].COMETMainLocation);
		// 			}
		// 			if(res.form){
		// 				self.pageTitle = res.form[0].title;
		// 				self.pageType = res.form[0].type;
		// 			}
		// 			cometServices.routeJson(res);
		// 		};

		self.loadServerData = function(path){
			console.log("Loading path: " + path);
			console.log(self.urlPrefix);
			//spinnerServ.show();
			cometServices.processCall(path);
			// ajaxServices.httpPromise("", path).then(function(res){
			// //ajaxServices.httpPromise("", "json_src/summary_screen.js").then(function(res){
			// 	self.handleResponse(res);
			// 	spinnerServ.hide();
			// });
		};


		$scope.menu = {};

		$scope.$on("valChanged:pageData", function(event, data){
			self.pageType = data.type;
			self.pageTitle = data.title
			self.sessionId = data.sessionId;
		});
		$scope.$on("valChanged:errorMessage", function(event, data){
			self.errorMessage = data;
		});

		self.loadServerData(self.loadPath);
}]);
