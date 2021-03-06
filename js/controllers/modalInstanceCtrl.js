// app.controller('modalController',['$scope', 'close','loadPath', 'formTitle', '$element', function($scope, close, loadPath, formTitle, $element){

// $scope.loadPath = loadPath;
// //$scope.formElements = data.form[0];
// $scope.title = formTitle;

// $scope.dismissModal = function(res){
//  close(res, 200);
//  //angular modal clashes with bootstrap modal. The following lines take care of bootstrap
//  $(".modal-backdrop").remove();
//  $("body").removeClass("modal-open");
// }

// }]);

var app  = angular.module('COMET');

app.controller('ModalInstanceCtrl',['$scope', '$uibModalInstance', 'loadPath',
    function ($scope, $uibModalInstance, loadPath) {


    $scope.loadPath = loadPath;

    $scope.ok = function () {
        $uibModalInstance.close($scope.selected.item);
    };

    $scope.cancel = function () {
        $uibModalInstance.dismiss('cancel');
    };

    $scope.getPath = function(){
        return $scope.loadPath;
    };
}]);
