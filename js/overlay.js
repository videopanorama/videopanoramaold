/*jshint multistr: true */

var tileSize = 1280; 

var xtilesWindow = 4;
var ytilesWindow = 3;

$(document).ready(function(){
    tileUpdate(tiles);
    overlay();
    $(document).trigger("startMaster");
});





function tiles() {
  for (ytile = 0; ytile < ytilesWindow; ytile++) {
        $("#videos").append("<tr>");
        for (xtile = 0; xtile < xtilesWindow; xtile++) {
            id = xtile + "_" + ytile;
            $("#videos").append('<th> <video id="' + id + '" class="video-js"></video></th>');
        }
        $("#videos").append("</tr>");
    }
 $("#videoContainer").css("left", -tileSize/2).css("top", -tileSize/2);
}

function overlay(){
        var x = tileSize/2;
        $('.overlay:eq(0)').css({
            top: 0,
            left: 0,
            width: '100%',
            height: x
        });
        $('.overlay:eq(1)').css({
            top: 0,
            left: 0,
            width: x,
            height: '100%'
        });
        $('.overlay:eq(2)').css({
            bottom: 0,
            right: 0,
            width: x,
            height: '100%'
        });
        $('.overlay:eq(3)').css({
            bottom: 0,
            right: 0,
            width: '100%',
            height: x
        });
}

