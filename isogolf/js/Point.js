define(["jquery"], function($) {
    var PointClass = {};
    
    PointClass.create = function(x, y) {
        var Point = {};
        Point.x = x;
        Point.y = y;
        Point.toString = function() {
            return "(" + Point.x + "," + Point.y + ")";
        };
        
        return Point;
    };
    
    return PointClass;
});