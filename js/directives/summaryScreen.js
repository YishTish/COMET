var app = angular.module('COMET');
var config = require('../config');


app.directive('summaryScreen', ['jsonServices','$filter', 'ajaxServices', '$uibModal', 'cometServices', 'menuServices', 'spinnerServ',
	function(jsonServices, $filter, ajaxServices, $uibModal, cometServices, menuServices, spinnerServ) {
	return{
		restrict: 'E',
		transclude: true,
		scope: {
		},
		controller: ['$scope', '$uibModal', '$log', 
		function($scope, $uibModal, $log, elem){
			var self = this;
			self.sessionId ="";
			self.errorMessage="";
			self.urlPrefix = config.base_url+":"+config.port;
			self.modalLoaded = false;

			
			self.handleSummary = function(summary){
				console.log(summary);
				if (typeof summary === "string"){
					return;
				}
				if( summary.form.type =! "Summary"){
					return;
				}
				
				self.serverData = summary;
				self.definitions = summary.columnDefs;
				self.tableData = summary.data;
				self.setupScreen();
				
			};

			self.loadSummary = function(path){
				spinnerServ.show();
				//ajaxServices.httpPromise(self.urlPrefix, path).then(function(res){
				ajaxServices.httpPromise("", "json_src/summary_screen.js").then(function(res){
					self.handleSummary(res);
					spinnerServ.hide();
				});
			};

			self.setupScreen = function(){
				serverData = self.serverData;
				self.sessionId = serverData.session[0].COMETSID;
				self.currentForm = serverData.form[0].id;
				self.summaryTitle = serverData.form[0].title;
				self.sortedTable = sortData(self.definitions, self.tableData);
			};

			//definitions are displayed as a sequential list. Therefore, their index will be used as the index for the data below
			sortData = function(definitions, data){
				//sortedData is an array of all the data we will present. An array of array of Strings
				var sortedData = {};
				//keysArr is the key from the definitions - this is the index for the table
				var keysArr = [];
				//Run thrhough the definitions, and create an array of keys for the table
				definitions.forEach(function(def){
					keysArr.push(def.field);
				});

				data.forEach(function(row, index){
					var rowArr = {};
					keysArr.forEach(function(def, key){
						if(row[def]== "&nbsp;"){
							rowArr[key]="";
						}
						else{
							rowArr[key] = row[def];
						}
					});
					sortedData[index] =rowArr;
				});
				console.log(sortedData);
				return sortedData;

			}

		

			self.buildRequestQueryString = function(fieldsStr){
				console.log(self.dataMap);
				return cometServices.buildRequestQueryString(fieldStr, self.formData, self.dataMap);

			};


			self.loadSummary(self.loadPath);

			// $scope.$watch(function() {
			// 	return formService.currentForm;
			// }, function (curForm) {
			// 	var url = "/comet.icsp?MGWLPN=iCOMET&COMETMode=JS&SERVICE=DATAFORM&REQUEST="+
			// 	curForm + "&STAGE=REQUEST&COMETSID=" + self.sessionId;
			// 	self.loadNextForm(url);
			// });


		}], //close controller

		controllerAs: 'sumScrCtrl',
		bindToController: true,
		templateUrl: function(elem, attr){
			return 'tpl/summaryScreen.tpl.html';
		},
		link: function(scope, elem, attr,ctrl){
			elem.bind('blur', function(val){
			});	
			if(elem[0].attributes['close-function']){
				ctrl.modalLoaded = true;
			}
		}
	} // close return from first line of directive
}]);

app.directive('sumScrRow', [
	function(){
		return{
		restrict: 'E',
		template: "<td>This is me</td>",
		}
	}])
