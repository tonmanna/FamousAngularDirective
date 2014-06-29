define(function(require) {
    var Engine = require('famous/core/Engine');
    var Modifier = require('famous/core/Modifier');
    var Transform = require('famous/core/Transform');
    var ImageSurface = require('famous/surfaces/ImageSurface');
    var Surface = require('famous/core/Surface');
    var StateModifier = require('famous/modifiers/StateModifier');
    var ModifierChain = require("famous/modifiers/ModifierChain");
    var Easing = require("famous/transitions/Easing");

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
        var initObj = {};
        if(scope.animateAtOrigin) {
            initObj = {
                    opacity: scope.opacity,
                    align: scope.align
            }
        }else
        {
            initObj = {
                opacity: scope.opacity,
                align: scope.align,
                origin : scope.origin
            }
        }

        var modifier = new StateModifier(initObj);
        surface.chain = new ModifierChain();
        surface.chain.addModifier(modifier);

        var animateMod = MyObject.animateMod(scope);
        if(animateMod.length>0)
        {
            angular.forEach(animateMod,function(trans){
                var initialTime = Date.now();
                var currentmodifier = new Modifier({
                    origin : scope.origin,
                    transform : function(){
                        return trans.TransFunc(initialTime)
                    }
                });
                surface.chain.addModifier(currentmodifier);
            });
        }
        var transform = MyObject.transformMod(scope);
        if(transform.length>0)
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
        if (scope.rotatez !== undefined)
        {
            var rotatez = Transform.rotateZ(Math.PI/scope.rotatez)
            transforms.push(rotatez);
        }
        return transforms;
    }
    MyObject.animateMod = function(scope){
        var animate = [];

        if(scope.animateRotatey!==undefined){
            var transform = {};
            transform.origin = scope.origin;
            transform.TransFunc = function(initialTime){
               return Transform.rotateY(Number(scope.animateRotatey) * (Date.now() - initialTime));
           }
           animate.push(transform);
        }

        if(scope.animateRotatex!==undefined){
            var transform = {};
            transform.origin = scope.origin;
            transform.TransFunc = function(initialTime){
                return Transform.rotateX(Number(scope.animateRotatex) * (Date.now() - initialTime));
            }
            animate.push(transform);
        }

        if(scope.animateRotatez!==undefined){

            var transform = {};
            transform.origin = scope.origin;
            transform.TransFunc = function(initialTime){
                return Transform.rotateZ(Number(scope.animateRotatez) * (Date.now() - initialTime));
            }
            animate.push(transform);
        }

        return animate;
    }

    return MyObject;
});
