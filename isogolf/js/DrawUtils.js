define(["jquery"], function($) {
    function init(canvas, CANVAS_WIDTH, CANVAS_HEIGHT) {
        var DrawUtils = {};
        top._drawUtils = DrawUtils;
        
        DrawUtils.canvas = canvas;
        DrawUtils.CANVAS_WIDTH = CANVAS_WIDTH;
        DrawUtils.CANVAS_HEIGHT = CANVAS_HEIGHT;
        
        return DrawUtils;
    }
    
    function getInstance() {
        if( !top._drawUtils ) {
            alert("MAJOR ERROR");
        }
        
        return top._drawUtils;
    }
    
    return {
        getInstance : getInstance,
        init : init
    };
});