define(['src/App','src/Directive'], function (app,famous) {
    app.register.controller('HomeController', function ($scope,$famous) {
        $scope.Name = "MyCtrl";
        $scope.init = function () {

        }

        var Transitionable = $famous['famous/transitions/Transitionable'];
        var Timer = $famous['famous/utilities/Timer'];

        $scope.spinner = {
            speed: 55
        };
        $scope.rotateY = new Transitionable(0);

        //run function on every tick of the Famo.us engine
        Timer.every(function(){
            var adjustedSpeed = parseFloat($scope.spinner.speed) / 1200;
            $scope.rotateY.set($scope.rotateY.get() + adjustedSpeed);
        }, 1);
    });
});
