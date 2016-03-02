require('angular');

var app = angular.module('COMET');

app.factory("spinnerServ", function() {
	var spin = 0;
	var spinner = {
		display: 'none'
	};

	spinner.show = function () {
		spinner.display = 'block';
		spin++;
	}

	spinner.hide = function () {
		spin = spin > 0 ? spin - 1 : 0;

		if (spin === 0) {
			spinner.display = 'none';
		}
	}
	return spinner;
});
