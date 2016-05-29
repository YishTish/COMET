var app = angular.module('COMET');
var config = require('../config');

app.directive('scrollingArea', ['jsonServices','$filter', 'ajaxServices', '$uibModal', 'cometServices', 'menuServices', 'spinnerServ',
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

			self.sortedDef = {};
			self.sortedMenuOptions = {};

			
			self.handleScrolling = function(scrollingData){
				console.log(scrollingData);
				if (typeof scrollingData === "string"){
					return;
				}
				if( scrollingData.form.type =! "Summary"){
					return;
				}
				
				self.serverData = scrollingData;
				self.definitions = scrollingData.fields;
				self.formData = scrollingData.form;
				self.tableData = scrollingData.dataRows;
				self.setupScreen();
			};

			self.setupScreen = function(){
				serverData = self.serverData;
				self.sessionId = serverData.session[0].COMETSID;
				self.currentForm = serverData.form[0].id;
				self.summaryTitle = serverData.form[0].title;
				
				self.definitions.forEach(function(def){
				//	if(def.type != "hidden"){
						self.sortedDef[def.id] = def;
				//	}
				});
				self.sortedTable = self.sortData();
				//self.setupMenuOptions();

			};

			//definitions are displayed as a sequential list. Therefore, their index will be used as the index for the data below
			self.sortData = function(){
				//sortedData is an array of all the data we will present. An array of JSON objects
				var sortedData = {};
				//Run through the data array received from server and create an array of items that will be used in the front-end
				self.tableData.forEach(function(row, index){
					var rowObj = {};
					//The first item of every row might be a "delete" item, and not a data item. Handle those differently
					if(row[0].id == "delete"){
						rowObj.deleteable = true;
					}
					//split the lines into columns based on the definition keys asigned above
					rowObj.deleteable = (row[0].id == "delete" ? true : false);
					angular.forEach(row, function(item, idx){
							if(item.id == undefined || item.id == "delete"){
								return;
							}
							rowObj[item.id] = {
								value: item.value,
								disabled: item.disabled,
								type: self.definitions
							}
							if(item.options){
								rowObj[item.id].options = item.options;
							}
					});
					sortedData[index] =rowObj;
				});
				console.log(sortedData);
				return sortedData;

			};

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
				cometServices.processCall(url);
			};

			self.save = function(){
				var queryString = "SERVICE=DATAFORM&REQUEST="+self.currentForm;
				console.log(self.sortedTable);
				angular.forEach(self.sortedTable, function(row){
					angular.forEach(row, function(val, ind){
						console.log(ind+" -- "+val.value);
						if(val.value){
							queryString +="&"+ind+"="+val.value;
						}
					})
				});
				console.log(queryString);

			}

			self.isDisabled = function(item){
				return item.disabled == "true" ;
			}

			self.deleteRow = function(itemId){
				var confirmModal = $uibModal.open({
					template: "<div class='modal-body'>Are you sure you want to delete this row?</div><div class='modal-footer'><button type='button' class='btn btn-primary' ng-click='ok(1)'>OK</button><button class='btn btn-warning' type='button' ng-click='cancel()'>No</button></div>", 
					size: "sm",
					controller: ['$scope', function($scope){
						$scope.ok = function(num){
							console.log(self.sortedTable);
							delete self.sortedTable[itemId];
							confirmModal.close("deleted");
						};

						$scope.cancel = function(){
							console.log('cancel');
							confirmModal.close("b");
						};
					}],
				});
				confirmModal.result.then(function(res){
					console.log(res);
				});
			}


			$scope.$on("jsonLoaded:ScrollingArea", function(event, data){
				self.handleScrolling(data);
			})


		}], //close controller

		controllerAs: 'scrlAreaCtrl',
		bindToController: true,
		templateUrl: function(elem, attr){
			return 'tpl/scrollingArea.tpl.html';
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

app.directive('updateRow', [
	function(){
		return{
		restrict: 'A',
		require: '^scrollingArea',
		link: function(scope, elem, attr, scrollingArea){
			elem.bind('click', function(event){
				console.log(elem);
				console.log(attr);
				console.log(scrollingArea.sortedTable);
				var rowId = parseInt(attr.updateRow);
				var numOfRows = Object.keys(scrollingArea.sortedTable).length;
				if(rowId+1 != numOfRows){
					return;
				}
				else{
					scrollingArea.sortedTable[rowId+1] = angular.copy(scrollingArea.sortedTable[rowId]);
					scrollingArea.sortedTable[rowId] = angular.copy(scrollingArea.sortedTable[rowId -1]);
				}
				console.log(scrollingArea.sortedTable);
				scope.$apply();

			})
			},
		}
	}]);
