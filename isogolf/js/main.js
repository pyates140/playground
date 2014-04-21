require.config({
    baseUrl: 'js',
    paths: {
        // the left side is the module ID,
        // the right side is the path to
        // the jQuery file, relative to baseUrl.
        // Also, the path should NOT include
        // the '.js' file extension. This example
        // is using jQuery 1.9.0 located at
        // js/lib/jquery-1.9.0.js, relative to
        // the HTML page.
        jquery: 'includes/jquery-2.1.0',
        paper: 'includes/paper',
        sylvester: 'includes/sylvester'
    },
    shim: {
        'paper' : {
            exports: 'paper'
        }
    },
});

require(["jquery", "paper", "ObjectManager", "Course"], function($, paper, ObjectManager, Course) {
    
    paper.install(window);
	$(document).ready(function() {
        var course = Course.getInstance();
        
        try {
            function init() {
                try {
                    function isActive(id) {
                        return $(id).hasClass('active');
                    }
                    
                    function disableButton(id) {
                        $(id).addClass('inactive');
                        $(id).removeClass('active');
                    }
                    
                    function enableButton(id) {
                        $(id).addClass('active');
                        $(id).removeClass('inactive');
                    }
                    
                    function toggleButton(id) {
                        if( isActive(id) ) {
                            disableButton(id);
                        } else {
                            enableButton(id);
                        }
                    }
                    
                    $('#button_display_nodes').click(function(e) {
                        enableButton('#button_display_nodes');
                        disableButton('#button_display_edges');
                        disableButton('#button_display_tris');
                        course.setShowMode('nodes');
                    });
                    
                    $('#button_display_edges').click(function() {
                        disableButton('#button_display_nodes');
                        enableButton('#button_display_edges');
                        disableButton('#button_display_tris');
                        course.setShowMode('edges');
                    });
                    
                    $('#button_display_tris').click(function() {
                        disableButton('#button_display_nodes');
                        disableButton('#button_display_edges');
                        enableButton('#button_display_tris');
                        course.setShowMode('tris');
                    });
                    
                    $('#button_export_hole').click(function() {
                        $('#export_output').html(course.export());
                    });
                    
                    
                    var CANVAS_WIDTH = 600;
                    var CANVAS_HEIGHT = 600;
                    
                    var canvasElement = $("#gameCanvas")[0];
                    
                    paper.setup(canvasElement);
                    
                    for( var x=0; x<3; ++x ) {
                        for( var y=0; y<2; ++y ) {
                            course.createCourseTri(x+y,y,0);
                        }
                    }
                    
                    draw();
                    
                    paper.view.onFrame = function(event) {
                        update();
                        draw();
                    };
                    paper.view.draw();
                } catch(e) {
                    alert(e);
                }
            }
            
            function update() {
                try {
                    ObjectManager.getInstance().update();
                } catch(e) {
                    alert(e);
                }
            }
            
            function draw() {
                try {
                    ObjectManager.getInstance().draw();
                } catch(e) {
                    alert(e);
                }
            }
            
            init();
        } catch(e) {
            alert(e);
        }
    });
});
