define(['src/App','src/AppFamous','src/Directive'], function (app,famous) {
    app.register.controller('HomeController', function ($scope) {
        $scope.Name = "MyCtrl";
        $scope.init = function () {

        }
    });
});
