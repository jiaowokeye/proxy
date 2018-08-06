/**
 * Created by Po on 2017/4/7.
 */
$(function() {
    if ($(window).width() < 1210) {
        $('#floorLeft').css('left', 0);
    } else {
        var left = parseInt(($(window).width() - 1210) / 2);
        $('#floorLeft').css('left', left);
    }
    $(window).scroll(function(ev) {
        var top = $(window).scrollTop();
        if (top > 1000) {
            if (!$('#floorLeft').hasClass('to')) {
                $('#floorLeft').addClass('to');
            }
        } else if (top < 500) {
            if ($('#floorLeft').hasClass('to')) {
                $('#floorLeft').removeClass('to');
            }
        }

        if (top < 410) {
            $('#floorLeft li').attr('class', '');
            if (!$('#floorLeft li').eq(0).hasClass('active')) {
                $('#floorLeft li').eq(0).addClass('active');
            }
        } else if (top >= 410 && top < 962) {
            $('#floorLeft li').attr('class', '');
            if (!$('#floorLeft li').eq(1).hasClass('active')) {
                $('#floorLeft li').eq(1).addClass('active');
            }
        } else if (top >= 962 && top < 1848) {
            $('#floorLeft li').attr('class', '');
            if (!$('#floorLeft li').eq(2).hasClass('active')) {
                $('#floorLeft li').eq(2).addClass('active');
            }
        } else if (top >= 1848 && top < 3342) {
            $('#floorLeft li').attr('class', '');
            if (!$('#floorLeft li').eq(3).hasClass('active')) {
                $('#floorLeft li').eq(3).addClass('active');
            }
        } else {
            $('#floorLeft li').attr('class', '');
            if (!$('#floorLeft li').eq(4).hasClass('active')) {
                $('#floorLeft li').eq(4).addClass('active');
            }
        }

    });
    loadScript();
    $("#companyList .item").on("click", function() {
        var index = $(this).index() + 1;
        panTo(index);
    });
    CommonResource.checkCookie();
});

function toTop() {
    $("html,body").animate({
        scrollTop: 0
    }, 200);
}
var map = '';
var x = "";
var y = "";
/**
 * 
 * 
 */
function initialize(x, y) {
    map = new BMap.Map('map');
    var point = new BMap.Point(116.299725,40.049061);
    map.centerAndZoom(point, 22);
    map.addOverlay(new BMap.Marker(new BMap.Point(116.299725,40.049061)));
}

function panTo(index) {


    switch (index) {
        case 1:
            x = 116.299725;
            y = 40.049061;
            break;
        case 2:
            x = 125.26914;
            y = 43.829868;
            break;
        case 3:
            x = 113.984523;
            y = 35.287902;
            break;
        case 4:
            x = 104.076503;
            y = 30.663081;
            break;
        case 5:
            x = 121.471099;
            y = 29.95244;
            break;
        default:
            break;
    }
    $("#map").html("");
    map = new BMap.Map('map');
    var point = new BMap.Point(x, y);
    map.centerAndZoom(point, 22);
    map.addOverlay(new BMap.Marker(new BMap.Point(x, y)));

}

function loadScript() {
    var script = document.createElement("script");
    script.src = " http://api.map.baidu.com/api?v=2.0&ak=FD875602aba2509d2e43a52b98cf7b7f&s=1&callback=initialize";
    document.body.appendChild(script);
}