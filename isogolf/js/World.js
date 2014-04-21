define(["jquery", "paper", "sylvester", "ObjectManager"], function($, paper, sylvester, ObjectManager) {
    function create() {
        var World = ObjectManager.getInstance().createObject({
            positions: [],
            transform: sylvester.Matrix.I(3),
            tool: new paper.Tool(),
            xRot: Math.PI/4,
            yRot: 0,
            zRot: Math.PI/4,
            xOffset: 15,
            yOffset: 5
        });
        
        World.registerPos = function(pos, object) {
            World.positions.push( { pos: pos, object: object } );
        };
        
        World.draw = function() {
            for( var key in World.positions ) {
                var posDef = World.positions[key];
                var pos = posDef.pos;
                var object = posDef.object;
                
                var transPos = World.transform.multiply(pos).add(sylvester.Vector.create([World.xOffset, World.yOffset,0]));
                
                object.x = 50 + transPos.elements[0] * 20;
                object.y = 50 + transPos.elements[1] * 20;
            }
        };
        
        World.tool.onKeyDown = function(event) {
            if( event.key == 'w' ) {
                World.xRot += 0.1;
            } else if( event.key == 's' ) {
                World.xRot -= 0.1;
            } else if( event.key == 'a' ) {
                World.yRot += 0.1;
            } else if( event.key == 'd' ) {
                World.yRot -= 0.1;
            } else if( event.key == 'q' ) {
                World.zRot += 0.1;
            } else if( event.key == 'e' ) {
                World.zRot -= 0.1;
            } else if( event.key == 'up' ) {
                World.yOffset -= 1;
            } else if( event.key == 'down' ) {
                World.yOffset += 1;
            } else if( event.key == 'left' ) {
                World.xOffset -= 1;
            } else if( event.key == 'right' ) {
                World.xOffset += 1;
            }
            
            updateTransform();
        };
        
        function updateTransform() {
            World.transform = sylvester.Matrix.I(3)
                                .multiply(sylvester.Matrix.RotationX(World.xRot))
                                .multiply(sylvester.Matrix.RotationY(World.yRot))
                                .multiply(sylvester.Matrix.RotationZ(World.zRot));
        }
        
        updateTransform();
        
        return World;
    }
    
    function getInstance() {
        if( !top._world ) {
            top._world = create();
        }
        
        return top._world;
    }
    
    return { getInstance : getInstance };
});