var loggingEnabled = false;




(function($) {

    // videoId2 = "example_video_2";
    // videoId3 = "example_video_3";
    mediagroupId = "main";

    $(document).on("sync", function() {

        //UPDATES

        //buttons
        $("#buttonPlay").click(function() {
            $(document).trigger("sjs:play", []);
        });
        $("#buttonPause").click(function() {
            $(document).trigger("sjs:pause", []);
        });
        $("#buttonResetVideo").click(function() {
            $(document).trigger("sjs:setCurrentTime", [0]);
        });

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



        //INFO


        $(document).on("sjs:allPlayersReady", function() {
            $("#bufferInfo").html("All players have been successfully initialized.");
            $(document).trigger("sjs:play", []);
        });
        $(document).on("sjs:buffering", function() {
            $("#bufferInfo").html("Not every player has buffered, yet. Pausing...");
        });
        $(document).on("sjs:bufferedAndAutoplaying", function() {
            $("#bufferInfo").html("Every player has buffered now. Starting playing again...");
        });
        $(document).on("sjs:bufferedButNotAutoplaying", function(event) {
            $("#bufferInfo").html("Every player has buffered now, but there was a timeupdate, pause, ... event...");
            $(document).trigger("sjs:play", []);
        });
        $(document).on("sjs:masterTimeupdate", function(event, param) {
            var rounded = Math.round(param * 10) / 10;
            $("#currentTime").html(rounded);
        });


        $(document).trigger("sjs:debug", loggingEnabled);
        $(document).trigger("sjs:stopBufferChecker");
        $.synchronizeVideos(0, mediagroupId);



    });
})(jQuery);