define(['src/App','src/AppFamous'], function (app,famous) {
    app.register.directive('logo',function(){
        return{
            restrict : 'E',
            template: '',
            scope : false,
            link : function(scope,element,attrib)
            {
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
                famous.mainContext.add(centerSpinModifier).add(logo);
            }
        }
    })
});
