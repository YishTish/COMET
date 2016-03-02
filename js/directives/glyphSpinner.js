require('angular');

var app = angular.module('COMET');

app.directive('glyphSpinner', ['spinnerServ', function (spinnerServ) {

	function link(scope, elem, attr) {
		scope.display = spinnerServ.display;

		scope.$watch(function () {
			return spinnerServ.display;
		}, function (value) {
			scope.display = value;
		})
	}


	var template = "<div style='display: {{ display }}' class='glyph-spinner'><i class='fa fa-spinner fa-spin fa-3x'></i><span>Please wait while loading…</span></div>";

	return {	
		restrict: 'E',
		link: link,
		template: template
	}	
}]);