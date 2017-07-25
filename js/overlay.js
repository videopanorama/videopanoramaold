/*jshint multistr: true */



var xtilesWindow = 3;
var ytilesWindow = 2;

var tileSize;


$(document).ready(function() {
    //tileSize = $(window).width()/(xtilesWindow-1); 
    tileSize = 800;
    tileUpdate(tiles);
    $(document).trigger("startMaster");
});





function tiles() {
    var content = "";
    for (ytile = 0; ytile < ytilesWindow; ytile++) {
        content += "<tr>";
        for (xtile = 0; xtile < xtilesWindow; xtile++) {
            id = xtile + "_" + ytile;
            content +='<td> <video id="' + id + '" class="video-js"></video></td>';
        }
        content += "</tr>";
    }
    $("#videos").append(content);
    //$("#videoContainer").css("left", -tileSize/2).css("top", -tileSize/2);
    $("#videoContainer").css("height", tileSize * (ytilesWindow - 1)).css("width", tileSize * (xtilesWindow - 1));
}

/*

window.onload = function start() {
    videoInfo();
};

function videoInfo() {

    for (ytile = 0; ytile < ytilesWindow; ytile++) {
        $("#videoInfo").append("<tr>");
        for (xtile = 0; xtile < xtilesWindow; xtile++) {
            id = xtile + "_" + ytile;
            $("#videoInfo").append('<td>0</td>');
        }
        $("#videoInfo").append("</tr>");
    }


    window.setInterval(function() {
        // increase by num 1, reset to 0 at 4
        num = (num + 1) % 4;

        // -600 * 1 = -600, -600 * 2 = -1200, etc 
        style.marginLeft = (-600 * num) + "px";
    }, 3000); // repeat forever, polling every 3 seconds
}
*/