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
				self.sortedDef = {};
				self.definitions.forEach(function(def){
				//	if(def.type != "hidden"){
						self.sortedDef[def.field] = def;
				//	}
				});
				self.sortedTable = sortData();

			};

			//definitions are displayed as a sequential list. Therefore, their index will be used as the index for the data below
			sortData = function(data){
				//sortedData is an array of all the data we will present. An array of array of Strings
				var sortedData = {};
				//Run through the data array received from server and create an array of items that will be used in the front-end
				self.tableData.forEach(function(row, index){
					var rowArr = {};
					//split the lines into columns based on the definition keys asigned above
					angular.forEach(self.sortedDef, function(item, idx){
							var displayText = row[item.field];
							if(displayText == "&nbsp;"){
								displayText = "";
							}
							rowArr[idx] = {
								text: displayText,
								type: item.type,
								key: item.field
							}
					});
					
					sortedData[index] =rowArr;
				});
				console.log(sortedData);
				return sortedData;

			}

			self.loadForm = function(itemKey, itemIndex){

				var keydef = self.sortedDef[itemKey];
				var rowData = self.tableData[itemIndex];

				var url = self.serverData.session[0].COMETURL+
						"&REQUEST="+keydef.linkRequest+
						"&SERVICE="+keydef.linkService+
						"&STAGE="+keydef.linkStage;

				var paramsArray = keydef.linkParams.split(";");
				var concatinatedParams = "";
				paramsArray.forEach(function(param){
					if(param.length > 0) {
						concatinatedParams +="&"+param+"="+rowData[param];
					}
				});
				url += concatinatedParams;
				console.log(keydef);
				console.log(rowData);
				console.log(url);
				ajaxServices.httpPromise(self.urlPrefix, url).then(function(res){
					console.log(res);
					cometServices.routeJson(res);
				});
			};

		

			self.buildRequestQueryString = function(fieldsStr){
				console.log(self.dataMap);
				return cometServices.buildRequestQueryString(fieldStr, self.formData, self.dataMap);

			};

			$scope.$on("jsonLoaded:Summary", function(event, data){
				self.handleSummary(data);
			})


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
