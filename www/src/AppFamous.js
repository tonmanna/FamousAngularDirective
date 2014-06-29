define(function(require) {
    var Engine = require('famous/core/Engine');
    var Modifier = require('famous/core/Modifier');
    var Transform = require('famous/core/Transform');
    var ImageSurface = require('famous/surfaces/ImageSurface');
    var Surface = require('famous/core/Surface');
    var StateModifier = require('famous/modifiers/StateModifier');
    var ModifierChain = require("famous/modifiers/ModifierChain");
    var Easing = require("famous/transitions/Easing");


    // create the main context
    var mainContext = Engine.createContext();

    var MyObject = {};
    MyObject.Engine = Engine;
    MyObject.Modifier = Modifier;
    MyObject.Transform = Transform;
    MyObject.ImageSurface = ImageSurface;
    MyObject.Surface = Surface;
    MyObject.mainContext = mainContext;
    MyObject.StateModifier = StateModifier;

    MyObject.addModifier = function(surface,scope){
        var modifier = new StateModifier({
            opacity : scope.opacity,
            align: scope.align,
            origin: scope.origin
        });
        surface.chain = new ModifierChain();
        surface.chain.addModifier(modifier);
        var transform = MyObject.transformMod(scope);
        if(transform.length>1)
        {
            angular.forEach(transform,function(trans){
                var currentmodifier = new StateModifier({
                    transform : trans
                });
                surface.chain.addModifier(currentmodifier);
            });
        }
        return surface.chain;
    }
    MyObject.transformMod = function(scope){
        var transforms = [];
        if (scope.scale !== undefined) {
            var scale = Transform.scale(scope.scale[0],scope.scale[1],scope.scale[2]);
            transforms.push(scale);
        }
        if (scope.translate !== undefined) {
            var translate = Transform.translate(scope.translate[0], scope.translate[1], scope.translate[2]);
            transforms.push(translate);
        }
        if (scope.rotatez != undefined)
        {
            var rotatez = Transform.rotateZ(Math.PI/scope.rotatez)
            transforms.push(rotatez);
        }
        return transforms;
    }
    return MyObject;
});
