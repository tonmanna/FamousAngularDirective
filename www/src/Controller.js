define(['src/App','src/AppFamous'], function (app,famous) {
    app.register.controller('HomeController', function ($scope) {
        $scope.Name = "MyCtrl";
        $scope.init = function () {
            //    // your app here
            var logo = new famous.ImageSurface({
                size: [200, 200], content: 'http://upload.wikimedia.org/wikipedia/commons/f/fd/Ghostscript_Tiger.svg',
                classes: ['double-sided']
            });

            var initialTime = Date.now();
            var centerSpinModifier = new famous.Modifier({
                origin: [0.5, 0.5],
                transform: function () {
                    return famous.Transform.rotateY(.002 * (Date.now() - initialTime));
                }
            });
            var firstSurface = new famous.Surface({
                size: [document.innerWidth, 400],
                content: 'hello world',
                properties: {
                    color: '#ff0000',
                    textAlign: 'center'
                }
            });
            firstSurface.setContent('<div style="padding-top: 20px">HELLO WORLD</div>');

            famous.mainContext.add(centerSpinModifier).add(logo)
            famous.mainContext.add(firstSurface);
        }
    });
});
