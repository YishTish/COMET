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


		//Development only: load static menu file
	    //cometServices.processCall("/json_src/summary_screen.js");

}]);
