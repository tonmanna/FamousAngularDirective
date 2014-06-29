define(['src/App','src/AppFamous'], function (app,famous) {
    var default_params = {onclick:"=",
        size:"=",align:"=",origin:"=",opacity:"="
        ,translate:"=",scale:"=",rotatez:"@"
        ,animateRotatey:"@",animateRotatex:"@",animateRotatez:"@",
        animateAtOrigin:"="
    };
    app.register.directive('logo',function(){
        var param = _.extend(default_params,{src:"@"});
        return{
            restrict : 'E',
            scope : param,
            link : function(scope,element,attrib)
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
            link : function(scope,element,attrib) {
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
                var modchain  = famous.addModifier(textSurface,scope);
                famous.mainContext.add(modchain).add(textSurface);
            }
        }
    })
});
