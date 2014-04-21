define(["jquery", "paper", "sylvester", "ObjectManager", "World"], function($, paper, sylvester, ObjectManager, World) {
    
    function createPointKey(x,y) {
        return x + "," + y;
    }
    
    function createConnKey(a,b) {
        var aKey = createPointKey(a.x, a.y);
        var bKey = createPointKey(b.x, b.y);
        if( aKey < bKey ) {
            return aKey + ":" + bKey;
        } else {
            return bKey + ":" + aKey;
        }
    }
    
    function createTriKey(a,b,c) {
        var aKey = createPointKey(a.x, a.y);
        var bKey = createPointKey(b.x, b.y);
        var cKey = createPointKey(c.x, c.y);
        
        return aKey + ":" + bKey + ":" + cKey;
    }
    
    function getInstance() {
        try {
            if( !top._course ) {
                var Course = ObjectManager.getInstance().createObject({
                    points: {},
                    conns: {},
                    tris: {},
                    showMode: ""
                });
                
                Course.createCoursePoint = function(x,y,z) {
                    try {
                        var key = createPointKey(x,y);
                        if( !Course.points[key] ) {
                            var xPos = x - 0.5 * y;
                            var yPos = 0.5 * y * Math.sqrt(3);
                            var zPos = z ? z : 0;
                            
                            var pos = sylvester.Vector.create([xPos,yPos,zPos]);
                            var circle = new paper.Path.Circle({
                                radius: 3
                            });
                            
                            circle.fillColor = "blue";
                            
                            Course.points[key] = {
                                x: x,
                                y: y,
                                pos: pos,
                                graphic: circle
                            };
                            
                            World.getInstance().registerPos(pos, circle.position);
                        }
                        
                        return Course.points[key];
                    } catch(e) {
                        alert(e);
                    }
                };
                
                Course.createCourseConn = function(a,b) {
                    try {
                        var key = createConnKey(a,b);
                        if( !Course.conns[key] ) {
                            var line = new paper.Path.Line(
                                a.dfgdfgdf,
                                b.dgfdgw
                            );
                            
                            Course.conns[key] = {
                                a: a,
                                b: b,
                                graphic: line
                            };
                            
                            line.strokeColor = 'black';
                            
                            World.getInstance().registerPos(a.pos, line.segments[0].point);
                            World.getInstance().registerPos(b.pos, line.segments[1].point);
                        }
                        
                        return Course.conns[key];
                    } catch(e) {
                        alert(e);
                    }
                };
                
                Course.createCourseTri = function(x,y) {
                    try {
                        var halfX = Math.floor(x/2);
                        var topTri = halfX * 2 == x;
                        
                        var a = Course.createCoursePoint(halfX, y, 0);
                        var b = Course.createCoursePoint(halfX+1, y+1, 0);
                        var c;
                        
                        if( topTri ) {
                            c = Course.createCoursePoint(halfX, y+1, 0);
                        } else {
                            c = Course.createCoursePoint(halfX+1, y, 0);
                        }
                        
                        var key = createTriKey(a,b,c);
                        if( !Course.tris[key] ) {
                            var tri = new paper.Path();
                            tri.add(new paper.Point());
                            tri.add(new paper.Point());
                            tri.add(new paper.Point());
                            tri.closed = true;
                            tri.fillColor = 'green';
                            
                            Course.tris[key] = {
                                x: x,
                                y: y,
                                a: a,
                                b: b,
                                c: c,
                                graphic: tri
                            };
                            
                            Course.createCourseConn(a,b);
                            Course.createCourseConn(b,c);
                            Course.createCourseConn(c,a);
                            
                            World.getInstance().registerPos(a.pos, tri.segments[0].point);
                            World.getInstance().registerPos(b.pos, tri.segments[1].point);
                            World.getInstance().registerPos(c.pos, tri.segments[2].point);
                        }
                        
                        return Course.tris[key];
                    } catch(e) {
                        alert(e);
                    }
                };
                
                Course.setShowMode = function(mode) {
                    try {
                        var key, point, edge, tri;
                        
                        if( Course.showMode != mode ) {
                            if( mode == 'nodes' ) {
                                for( key in Course.points ) {
                                    point = Course.points[key];
                                    if( point.graphic ) {
                                        point.graphic.visible = true;
                                    }
                                }
                            } else {
                                for( key in Course.points ) {
                                    point = Course.points[key];
                                    if( point.graphic ) {
                                        point.graphic.visible = false;
                                    }
                                }
                            }
                            
                            if( mode == 'edges' ) {
                                for( key in Course.conns ) {
                                    edge = Course.conns[key];
                                    if( edge.graphic ) {
                                        edge.graphic.visible = true;
                                    }
                                }
                            } else {
                                for( key in Course.conns ) {
                                    edge = Course.conns[key];
                                    if( edge.graphic ) {
                                        edge.graphic.visible = false;
                                    }
                                }
                            }
                            
                            if( mode == 'tris' ) {
                                for( key in Course.tris ) {
                                    tri = Course.tris[key];
                                    if( tri.graphic ) {
                                        tri.graphic.visible = true;
                                    }
                                }
                            } else {
                                for( key in Course.tris ) {
                                    tri = Course.tris[key];
                                    if( tri.graphic ) {
                                        tri.graphic.visible = false;
                                    }
                                }
                            }
                        }
                        
                        Course.showMode = mode;
                    } catch(e) {
                        alert(e);
                    }
                };
                
                Course.export = function() {
                    var join = "";
                    var key;
                    
                    var output = "{";
                    
                    output += "points: [";
                    for( key in Course.points ) {
                        var point = Course.points[key];
                        output += join + "{";
                        output += "x:" + point.pos.elements[0] + ",";
                        output += "y:" + point.pos.elements[1] + ",";
                        output += "z:" + point.pos.elements[2];
                        output += "}";
                        
                        join = ",";
                    }
                    output += "],";
                    
                    output += "tris: [";
                    join = "";
                    
                    for( key in Course.tris ) {
                        var tri = Course.tris[key];
                        output += join + "{";
                        output += "x:" + tri.x + ",";
                        output += "y:" + tri.y;
                        output += "}";
                        
                        join = ",";
                    }
                    
                    output += "]}";
                    
                    return output;
                };
                
                Course.setShowMode('edges');
                
                top._course = Course;
            }
        } catch(e) {
            alert(e);
        }
        
        return top._course;
    }
    
    return {
        getInstance: getInstance
    };
});