

var xtilesWindow = 3;
var ytilesWindow = 3;

var tileSize = 390;

var xtiles = 2;
var ytiles = 2;

var xposTile; //x of current top left tile of 3x3 grid 
var yposTile; //y of current top left tile of 3x3 grid

var xpos; //x of top left tile of visible 2x2
var ypos; //y of top left tile of visible 2x2

var xmax = 10; //maximum x of available tiles 
var ymax = 4; //maximum y of available tiles

var nearestSecond;

/////////////////

//maintains time variable of videos

var time;

$(document).on("sjs:masterTimeupdate", function(event, param) {
            time = param;
        });

/////////////////////

//gets the src of specific second frame, should be changed to work for seconds/half seconds

function imageSrc(x,y,second) {
    return 'seafront/seafront_full/twolevels/level3/pics/' + '0' + y + '_' + '0' + x + "_" + second + '.jpg';
}

//gets the src of specific video tile

function videoSrc(x,y) {
    return 'seafront/seafront_full/twolevels/level3/vids/' + '0' + y + '_' + '0' + x + '.mp4';
}

//loads video into memory 

function bufferVideo(x,y){
    v = $("<video/>");
    id = x + "." + y;
    v.attr("id",id);
    $("#bufferedVideos").append(v);
    vjs = videojs(id);
    vjs.src(videoSrc(x,y));
    return vjs;
}

//for loop that runs through every tile in the window and supplies videojs id

function tileUpdate(operation) {
    tile = 0;
    for (ytile = 0; ytile < ytilesWindow; ytile++) {
        for (xtile = 0; xtile < xtilesWindow; xtile++) {
            id = xtile + "_" + ytile;
            operation();
        }
    }
}

/////////////////

//changes video src depending on xposTile and yposTile, for tileUpdate

function update() {
    var video = videojs(id);
    video.poster(imageSrc(xtile+xposTile,ytile+yposTile, nearestSecond));  //should be changed to appropriate thumbnail
    console.log(imageSrc(xtile+xposTile,ytile+yposTile, nearestSecond));
    video.src(videoSrc(xtile+xposTile,ytile+yposTile));
}

//runs update for every tile

function changeTilesSrc(newxposTile, newyposTile) {
    timeBefore = time;
    nearestSecond = Math.round(timeBefore) || 8;
    xposTile = newxposTile;
    yposTile = newyposTile;
    tileUpdate(update);

    $(document).trigger("sjs:setCurrentTime", [timeBefore]);
    $(document).trigger("sjs:play", []);
}

//changes xpos and ypos, if xposTile or yposTile needs to be changed then changesTilesSrc is runned

function setPosition(newxpos, newypos) {


    var newxposTile = Math.floor(newxpos);
    var newyposTile = Math.floor(newypos);



    if ((newxposTile) > (xmax - xtilesWindow) || (newxpos < 0)) {
        return;
    }

    if ((newyposTile) > (ymax - ytilesWindow) || (newypos < 0)) {
        return;
    }


    if (newxposTile != xposTile || newyposTile != yposTile) {
        changeTilesSrc(newxposTile, newyposTile);
    }



    var right = newxpos - newxposTile - 0.5;
    $("#videos").css("right", right*tileSize);

    var bottom = newypos - newyposTile - 0.5;
    $("#videos").css("bottom", bottom*tileSize);

    xpos = newxpos;
    ypos = newypos;
}

////////////////////

//initializes every video container, for tileUpdate

function initialize() {
    $("#videos").append('<div class="col-sm-4 space-0 video"><video width="' + tileSize + '" height="' + tileSize + '" mediagroup="main" id="' + id + '" class="video-js"></video></div>');
    var video = videojs(id, { loop: true, loadingSpinner: false });
    video.poster("http://via.placeholder.com/390x390");
}

$(document).ready(function() {
    tileUpdate(initialize);
    setPosition(3, 1);
    changeTilesSrc(3,1);
});
























































