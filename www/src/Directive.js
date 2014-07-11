define(['src/App','src/AppFamous','src/Beaw'], function (app,famous) {
    var default_params = {onclick:"=",
        size:"=",align:"=",origin:"=",opacity:"="
        ,translate:"=",scale:"=",rotatez:"@"
        ,animateRotatey:"@",animateRotatex:"@",animateRotatez:"@"
        ,animateScale:"=",
        animateAtOrigin:"="
    };
    app.register.directive('logo',function(){
        var param = _.extend(default_params,{src:"@"});
        return{
            restrict : 'E',
            scope : param,
            link : function(scope)
            {
                if (scope.size === undefined) {
                    scope.size = [100, 100];
                }
                var image = new famous.ImageSurface({
                    size: scope.size,
                    content: scope.src,
                    classes: ['double-sided']
                });
                var modchain  = famous.addModifier(image,scope);
                famous.mainContext.add(modchain).add(image);
            }
        }
    });
    app.register.directive('text',function(){
        return{
            restrict : 'E',
            scope : default_params,
            link : function(scope,element) {
                if (scope.size === undefined) {
                    scope.size = [100, 100];
                }
                var text = element[0].innerHTML;
                element.remove();
                var textSurface = new famous.Surface({
                    size: scope.size,
                    content: text,
                    properties: element[0].style
                });
                var modchain  = famous.addModifier(textSurface,scope,true);
                famous.mainContext.add(modchain).add(textSurface);
            }
        }
    })

    app.register.directive('surface',function(){
        return{
            restrict : 'E',
            scope : default_params,
            link : function(scope,element) {
                if (scope.size === undefined) {
                    scope.size = [100, 100];
                }
                var text = element[0].innerHTML;
                element.remove();
                var textSurface = new famous.Surface({
                    size: scope.size,
                    properties: element[0].style
                });
                var modchain  = famous.addModifier(textSurface,scope,true);
                famous.mainContext.add(modchain).add(textSurface);
            }
        }
    })
});
