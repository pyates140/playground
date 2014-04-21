define(["jquery"], function($) {
    function create() {
        var ObjectManager = {};
        
        ObjectManager.objectList = [];
        
        function executeMethod(methodName, params) {
            for( var key in ObjectManager.objectList ) {
                var object = ObjectManager.objectList[key];
                
                if( object[methodName] ) {
                    object[methodName](params);
                }
            }
        }
        
        ObjectManager.createObject = function(definition) {
            var object = definition ? definition : {};
            ObjectManager.objectList.push(object);
              
            return object;
        };
        
        ObjectManager.update = function() {
            executeMethod("update");
        };
        
        ObjectManager.draw = function() {
            executeMethod("draw");
        };
        
        return ObjectManager;
    }
    
    function getInstance() {
        if( !top._objectManager ) {
            top._objectManager = create();
        }
        
        return top._objectManager;
    }
    
    return { getInstance : getInstance };
});