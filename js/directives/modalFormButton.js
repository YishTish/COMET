var app = angular.module('COMET');

app.directive('modalFormButton', [function(){
    return{
        restrict: 'A',
        require: '^cometForm',
        link: function(scope, elem, attr, formCtrl){
            elem.bind('click', function(){
                formCtrl.loadModalForm(attr.modalForm, attr.modalFormParams);
            });
        }
    };
}]);
