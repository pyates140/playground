define(["jquery"], function($) {
    
    function getStaticList() {
        top._golfTriList = top._golfTriList or {};
        
        return _golfTriList;
    }
    
    function getKey(pointA, pointB, pointC) {
        var pointAString = pointA.toString();
        var pointBString = pointB.toString();
        var pointCString = pointC.toString();
        
        var key = "";
        
        var points = [pointAString, pointBString, pointCString];
        points.sort();
        for( var i in points ) {
            key += points[i];
        }
        
        return key;
    }
    
    return function (pointA, pointB, pointC) {
        var key = getKey(pointA, pointB, pointC);
        var existingTri = getStaticList()[key];
        if( existingTri ) {
            return existingTri;
        }
        
        var newTri = { a: pointA, b: pointB, c: pointC };
        getStaticList().push(newTri);
        
        return newTri;
    };
});