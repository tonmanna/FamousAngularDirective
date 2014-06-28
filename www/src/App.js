define(['angularAMD','src/AppFamous'],function(angularAMD) {
    var App = angular.module("MyApp", ['ngRoute']);
    App.config(function ($routeProvider) {
        $routeProvider.when("/", angularAMD.route({
            templateUrl: 'views/home.html',
            controller: 'HomeController',
            controllerUrl: 'src/Controller.js'
        }))
            .otherwise({
                redirectTo: "/"
            })
    });
    angularAMD.bootstrap(App);
    return App;
});


