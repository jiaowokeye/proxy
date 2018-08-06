/**
 * Created by Administrator on 2017/4/8.
 */
$(function(){

    if ($(window).width() < 1210) {
        $('#floorLeft').css('left', 0);
    } else {
        var left = parseInt(($(window).width() - 1210) / 2);
        $('#floorLeft').css('left', left);
    }

    $('#floorLeft li').on('click',function(){
        $('#floorLeft li').attr('class','');
        $(this).addClass('active');
        var index = $(this).index();
        $('#content-right').children('.item').hide();
        $('#content-right').children('.item').eq(index).show();
        toTop();
    });

    $(window).scroll(function(){
        var top = $(window).scrollTop();
        if(top>137){
            $('#banner-wrap').css('position','fixed');
        }else{
            $('#banner-wrap').css('position','relative');
        }

        if(top>3000){
            $(".toTop").parent().show();
        }else{
            $(".toTop").parent().hide();
        }

        if(top>92){
            $("#floorLeft").css({"position":"fixed","top":159});
        }else{
            $("#floorLeft").css({"position":"absolute","top":250});
        }
    });
    $("#banner li").on("click",function(){
        $('#floorLeft li').attr('class','');
        $('#floorLeft li').eq(0).addClass('active');
        $('#content-right').children('.item').hide();
        $('#content-right').children('.item').eq(0).show();
    });
    var active = getUrlParam('active');

    if(active){
        $('#floorLeft li').eq(active).click();
    }
    CommonResource.checkCookie();
    $("#content .edition").html(CommonResource.editionData[0].ver);
    $("#content .resTime").html(CommonResource.editionData[0].date);
});
function getUrlParam(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
    var r = window.location.search.substr(1).match(reg);
    if (r != null) return unescape(r[2]); return null;
}

function toTop(){
    $("html,body").animate({scrollTop:0},200);
}
