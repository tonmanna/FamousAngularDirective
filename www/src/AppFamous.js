define(function(require) {
    var Engine = require('famous/core/Engine');
    var Modifier = require('famous/core/Modifier');
    var Transform = require('famous/core/Transform');
    var ImageSurface = require('famous/surfaces/ImageSurface');
    var Surface = require('famous/core/Surface');

    // create the main context
    var mainContext = Engine.createContext();

    var MyObject = {};
    MyObject.Engine = Engine;
    MyObject.Modifier = Modifier;
    MyObject.Transform = Transform;
    MyObject.ImageSurface = ImageSurface;
    MyObject.Surface = Surface;
    MyObject.mainContext = mainContext;

    return MyObject;
});
