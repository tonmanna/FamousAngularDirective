define(['src/App','src/Directive'], function (app) {
    app.register.controller('HomeController', function ($scope) {
        $scope.Name = "MyCtrl";
        $scope.init = function () {

        }
    });
});
