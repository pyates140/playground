define(["jquery", "ObjectManager", "paper"], function($, ObjectManager, paper) {
    try {
    var GolfCourse = ObjectManager.getInstance().createObject();
    
    GolfCourse.grid = [[]];
    GolfCourse.tris = [];
    
    function Get(gridX, gridY) {
        if( GolfCourse.grid[gridX] ) {
            if( GolfCourse.grid[gridX][gridY] ) {
                return GolfCourse.grid[gridX][gridY];
            }
        }
        
        return null;
    }
    
    function Set(gridX, gridY, value) {
        if( !GolfCourse.grid[gridX] ) {
            GolfCourse.grid[gridX] = [];
        }
        
        GolfCourse.grid[gridX][gridY] = value;
    }
    
    GolfCourse.AddTri = function(gridX, gridY) {
        var tri = Get(gridX, gridY);
        if( tri ) {
            return tri;
        }
        
        tri = { gridX: gridX, gridY: gridY };
        Set(gridX, gridY, tri);
        
        return tri;
    };
    
    GolfCourse.draw = function() {
        try {
        for( var x in GolfCourse.grid ) {
            var row = GolfCourse.grid[x];
            for( var y in row ) {
                var path = new paper.Path.Circle({
                    center: new paper.Point(x * 100, y * 100),
                    radius: 10
                });
                
                // The hue is defined by the amount of times the onMouseMove
                // event has been fired, multiplied by 10:
                path.fillColor = {
                    hue: 1,
                    saturation: 1,
                    brightness: 1
                };
            }
        }
        } catch(e) {
            alert("Golf draw error:" + e);
        }
    };
    
    return GolfCourse;
} catch(e) {
    alert(e);
}
});