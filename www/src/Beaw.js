define(['src/AppFamous'], function (famous) {
    var surface = new famous.ImageSurface({
        size: [100, 100],
        content: "./img/arrow.svg"
    });
    var textSurface = new famous.Surface({
        size: [100,100],
        content: "Change page",
        properties: {
            color : "RED",
            fontSize : "10px",
            textTransform:"capitalize",
            fontWeight : "BOLD"
        }
    });

    var stateModifier = new famous.StateModifier({
        origin: [0, 0],
        align: [0, 0],
        transform : famous.Transform.scale(0, 0, 1),
        opacity: 0
    });

    var stateText = new famous.StateModifier({
        origin: [0, 0],
        align: [0, 0]
    })


    famous.mainContext.add(stateModifier).add(surface);
    famous.mainContext.add(stateText).add(textSurface);


    stateModifier.setTransform(
        famous.Transform.translate(200, 15, 1),
        { duration: 1000, curve: famous.Easing.outBack }
    );

    stateModifier.setOpacity(1, {
        duration: 2000, curve: famous.Easing.outBack
    },function(){
        stateModifier.setOpacity(0, {
            duration: 4800, curve: famous.Easing.outBack
        });
    });



    stateText.setTransform(
        famous.Transform.translate(160, 65, 1),
        { duration: 1000, curve: famous.Easing.outBack },
        function(){
            stateText.setOpacity(0, {
                duration: 6000, curve: famous.Easing.outBack
            });

        }
    );



});