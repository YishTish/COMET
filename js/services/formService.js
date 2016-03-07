var app = angular.module('COMET');

app.factory("formService", function() {
	var form = {
		currentForm: "WRX2002"
	};

	form.updateForm = function (formCode) {
		form.currentForm = formCode;
	};

	return form;
});