
$(document).ready(function(){
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
});

