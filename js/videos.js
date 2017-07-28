var xposTile; //x of current top left tile of 3x3 grid 
var yposTile; //y of current top left tile of 3x3 grid

var xpos; //x of top left tile of visible 2x2
var ypos; //y of top left tile of visible 2x2

var xmax = 10; //maximum x of available tiles 
var ymax = 4; //maximum y of available tiles

var nearestSecond;

var buffer = true;

var firstTime = true;

var bufferedPosters = Create2DArray(xmax, ymax);

var useVideos = !(urlParams.video == "false");
/////////////////////

//gets the src of specific second frame, should be changed to work for seconds/half seconds

function imageSrc(x, y, second) {
    return 'https://videopanorama.github.io/seafront/seafront_full/twolevels/level3/pics/' + '0' + y + '_' + '0' + x + "_" + second + '.jpg';
}

//gets the src of specific video tile

function videoSrc(x, y) {
    return 'https://videopanorama.github.io/seafront/seafront_full/twolevels/level3/old/' + '0' + y + '_' + '0' + x + '.mp4';
}

//checks for valid tile

function validTile(x, y) {
    if (x > (xmax - 1) || (x < 0)) {
        return false;
    }

    if (y > (ymax - 1) || (y < 0)) {
        return false;
    }
    return true;
}


//loads video into memory 

function bufferVideo(x, y) {
    v = $("<video/>");
    id = x + "." + y;
    v.attr("id", id);
    $("#bufferedVideos").append(v);
    vjs = videojs(id);
    vjs.src(videoSrc(x, y));
    return vjs;
}

//loads poster into memory

function bufferPoster(x, y) {

    if (!validTile(x, y)) {
        return;
    }
    if (bufferedPosters[x][y]) {
        return;
    }

    bufferedPosters[x][y] = true;
    var img = $('<img>');
    img.attr('src', imageSrc(x, y, 9));
    img.appendTo('#imagediv');
    img.attr("id", x + "." + y);
    $("#buffering").append(img);

}

//loads all images directly around current view

function bufferAllPosters() {
    for (ytile = -1; ytile < ytilesWindow + 1; ytile++) {
        for (xtile = -1; xtile < xtilesWindow + 1; xtile++) {
            bufferPoster(xtile + xposTile, ytile + yposTile);
        }
    }

}



//for loop that runs through every tile in the window and supplies videojs id

function tileUpdate(operation) {
    for (ytile = 0; ytile < ytilesWindow; ytile++) {
        for (xtile = 0; xtile < xtilesWindow; xtile++) {
            id = xtile + "_" + ytile;
            operation();
        }
    }
}

/////////////////

//changes video and poster src depending on xposTile and yposTile, for tileUpdate

function updatePoster() {
    var video = videojs(id);

    var src = imageSrc(xtile + xposTile, ytile + yposTile, 9 /*nearestSecond + 1*/ );
    video.poster(src);
    //$("#"+id).css("visibility", "hidden");
    //$("#"+id).parent().css("background-image", 'url("' + src + '")');
}


function updateVideo() {
    var video = videojs(id);
    video.src(videoSrc(xtile + xposTile, ytile + yposTile));
    video.currentTime(nearestSecond);
    video.play();
}


//runs update for every tile

function changeTilesSrc(newxposTile, newyposTile) {
    timeBefore = videojs("0_0").currentTime();

    nearestSecond = (Math.round(timeBefore) % 8) || 0;
    xposTile = newxposTile;
    yposTile = newyposTile;

    //$(".video-js").css("visibility", "hidden", 'important');
    tileUpdate(updatePoster);
    if (useVideos) { tileUpdate(updateVideo); }

    if (buffer) { bufferAllPosters(); }


    // setTimeout(function(){$(".video-js").css("visibility", "visible");}, 1000);


}

//changes xpos and ypos, if xposTile or yposTile needs to be changed then changesTilesSrc is runned

function setPosition(newxpos, newypos) {


    var newxposTile = Math.floor(newxpos);
    var newyposTile = Math.floor(newypos);



    if (!(validTile(newxposTile, newyposTile) & validTile(newxposTile + xtilesWindow - 1, newyposTile + ytilesWindow - 1))) {
        return;
    }


    if (newxposTile != xposTile || newyposTile != yposTile) {
        changeTilesSrc(newxposTile, newyposTile);
    }



    var right = newxpos - newxposTile;
    $("#videos").css("right", right * tileSize);

    var bottom = newypos - newyposTile;
    $("#videos").css("bottom", bottom * tileSize);

    xpos = newxpos;
    ypos = newypos;
}

////////////////////

//initializes every video container, for tileUpdate

function initialize() {
    $("#" + id).attr("mediagroup", "main");
    var video = videojs(id, { loop: true, loadingSpinner: false });
    video.width(tileSize);
    video.height(tileSize);
    video.on("progress", function() {
        //test
    });
}

function changeTileSize(size) {
    tileUpdate(function() {
        var video = videojs(id);
        video.dimensions(size, size);
    });
}

$(document).on("startMaster", function() {
    tileUpdate(initialize);

    setPosition(0, 0);
    $(document).trigger("controls");
    $(document).trigger("sync");
});