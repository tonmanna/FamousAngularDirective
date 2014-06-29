define(['src/App','src/AppFamous'], function (app,famous) {
    app.register.directive('logo',function(){
        return{
            restrict : 'E',
            scope : {onclick:"=",width:"@",height:"@",path:"@"},
            link : function(scope,element,attrib)
            {
                var image = new famous.ImageSurface({
                    size: [+scope.width, +scope.height], content: 'http://upload.wikimedia.org/wikipedia/commons/f/fd/Ghostscript_Tiger.svg',
                    classes: ['double-sided']
                });
                var initialTime = Date.now();
                var centerSpinModifier = new famous.Modifier({
                    origin: [0.5, 0.5],
                    opacity : 0.1,
                    transform: function () {
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
            scope : {onclick:"=",width:"@",height:"@",top:"@",left:"@",zIndex:"@"},
            link : function(scope,element,attrib) {

                if(scope.width===undefined)
                {
                    scope.width = window.innerWidth -10;
                }

                var stateModifier = new famous.StateModifier({
                    transform: famous.Transform.translate(scope.left,scope.top,scope.zIndex)
                });

                var rotateModifierOne = new famous.StateModifier({
                    transform: famous.Transform.rotateZ(Math.PI/4)
                });

                var modifier = new famous.StateModifier({
                    opacity : 0.5,
                    transform: famous.Transform.scale(1.5,1.5,1),
                    align: [0.1, 0.1],
                    origin: [0.1, 0.1]
                });


                var text = element[0].innerHTML;
                element[0].innerHTML = "";
                var textSurface = new famous.Surface({
                    size : [scope.width,Number(scope.height)],
                    content: text,
                    properties: element[0].style
                });
                famous.mainContext
                    .add(modifier)
                    .add(rotateModifierOne)
                    .add(stateModifier)
                    .add(textSurface);

            }
        }
    })
});
