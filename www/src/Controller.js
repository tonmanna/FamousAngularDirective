define(['src/App','src/AppFamous','src/Directive'], function (app,famous) {
    app.register.controller('HomeController', function ($scope) {
        $scope.Name = "MyCtrl";
        $scope.init = function () {
            //    // your app here
            var firstSurface = new famous.Surface({
                size: [document.innerWidth, 400],
                content: 'hello world',
                properties: {
                    color: '#ff0000',
                    textAlign: 'center'
                }
            });
            firstSurface.setContent('<div style="padding-top: 20px">HELLO WORLD</div>');

            famous.mainContext.add(firstSurface);
        }
    });
});
