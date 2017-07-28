




(function($) {

    // videoId2 = "example_video_2";
    // videoId3 = "example_video_3";
    mediagroupId = "main";

    $(document).on("controls", function() {

        //buttons


        //keys

        document.body.onkeydown = function() {
            var e = event.keyCode;
            var step = 0.01;
            if (e == 40) { //down function

                setPosition(xpos, ypos + step);
            } if (e == 37) { //left function
                setPosition(xpos - step, ypos);
            } if (e == 39) { //right function
                setPosition(xpos + step, ypos);
            } if (e == 38) { //up function
                setPosition(xpos, ypos - step);
            }


        };

        window.addEventListener("keydown", function(e) {
            // space and arrow keys
            if ([32, 37, 38, 39, 40].indexOf(e.keyCode) > -1) {
                e.preventDefault();
            }
        }, false);

    });
})(jQuery);