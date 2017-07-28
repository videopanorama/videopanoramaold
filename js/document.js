/*jshint multistr: true */



var xtilesWindow = 3;
var ytilesWindow = 2;

var tileSize;



$(document).ready(function() {
    //tileSize = 800;
    tileSize = Math.round($(window).width() / (xtilesWindow));
    tileUpdate(tiles);
    $(document).trigger("startMaster");
});

function tiles() {
    var content = "";
    for (ytile = 0; ytile < ytilesWindow; ytile++) {
        content += "<tr>";
        for (xtile = 0; xtile < xtilesWindow; xtile++) {
            id = xtile + "_" + ytile;
            content += '<td> <video id="' + id + '" class="video-js"></video></td>';
        }
        content += "</tr>";
    }
    $("#videos").append(content);
    //$("#videoContainer").css("left", -tileSize/2).css("top", -tileSize/2);
    $("#videoContainer").css("height", tileSize * (ytilesWindow - 1)).css("width", tileSize * (xtilesWindow - 1));
}



window.onload = function start() {
    videoInfo();
};

function videoInfo() {
    var content;
    for (ytile = 0; ytile < ytilesWindow; ytile++) {
        content += "<tr>";
        for (xtile = 0; xtile < xtilesWindow; xtile++) {
            id = xtile + "_" + ytile;
            content += '<td id="' + id + "_info" + '"></td>';
        }
        content += "</tr>";
    }

    $("#videoInfo").append(content);
    window.setInterval(function() {
        //$(document).trigger('sjs:play');
        for (ytile = 0; ytile < ytilesWindow; ytile++) {
            for (xtile = 0; xtile < xtilesWindow; xtile++) {
                var id = xtile + "_" + ytile;
                var v = videojs(id);
                bufferedPercent = Math.round(v.bufferedPercent() * 100) + "%";
                currentTime = Math.round(v.currentTime() * 100) / 100 + "s";
                $("#" + id + "_info").text((xtile + xposTile) + "_" + (ytile + yposTile) + ": " + bufferedPercent + ", " + currentTime);
                //times.push(v.currentTime());
            }
        }





    }, 500); 
}

$(window).on('beforeunload', function() { $(".video-js").hide(); });