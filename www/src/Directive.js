define(['src/App','src/AppFamous'], function (app,famous) {

    var default_params = {onclick:"=",size:"=",align:"=",origin:"=",opacity:"=",translate:"=",scale:"=",rotatez:"@",animate:"="};

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
                element.remove();
                var image = new famous.ImageSurface({
                    size: scope.size,
                    content: scope.src,
                    classes: ['double-sided']
                });

                var initialTime = Date.now();
                var centerSpinModifier = new famous.Modifier({
                    origin: [0.5, 0.5],
                    transform : function(){
                        return famous.Transform.rotateY(.002 * (Date.now() - initialTime));
                    }
                });
                famous.mainContext.add(centerSpinModifier).add(image);
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
