/**
 * Created by Administrator on 2017/4/8.
 */

var maxPage = 0;
$(function(){
    if($(window).width()<1210){
        $('#floorLeft').css('left',0);
    }else{
        var left = parseInt(($(window).width()-1210)/2);
        $('#floorLeft').css('left',left);
    }

    $(window).scroll(function(ev) {
        var top = $(window).scrollTop();
        if (top > 500) {
            if (!$('#floorLeft').hasClass('to')) {
                $('#floorLeft').addClass('to');
            }
        } else if (top < 500) {
            if ($('#floorLeft').hasClass('to')) {
                $('#floorLeft').removeClass('to');
            }
        }

        if(top>2000){
            $('.toTop').parent().show();
        }else{
            $('.toTop').parent().hide();
        }
    });
    $('#floorLeft li').on('click',function(){

        $('#floorLeft li').attr('class','');
        $(this).addClass('active');
        var index = $(this).index();
        $("#activityDiv").children('div').hide();
        $("#activityDiv").children('div').eq(index).show();
        var $pages = $("#activityDiv").children('div').eq(index).find(".page");
        maxPage = $pages.length;
        var html = "<ul>";
        if(maxPage>1){
            for(var i=0;i<maxPage;i++){
                html += "<li><a href='javascript:toPage("+(i+1)+")'>"+(i+1)+"</a></li>";
            }
            html += "<li class='next'><a href='javascript:toPage( nowPage + 1)'>下一页</a></li>"
        }
        html+= "</ul>";
        $("#page-nav").html("");
        $("#page-nav").html(html);
        $("#page-nav li").eq(0).addClass("active");
        $(".page").hide();
        $(".page1").show();
    });
    var active = getUrlParam('active')?getUrlParam('active'):0;
    $('#floorLeft li').eq(active).click();
    CommonResource.checkCookie();
});
var nowPage = 1;
function toPage(page){
    nowPage = page;
    if(nowPage>maxPage){
        return;
    }
    $('#page-nav').find('.active').removeClass('active');
    $('#page-nav li').eq(nowPage-1).addClass('active');
    $(".page").hide();
    $(".page"+nowPage).show();
    $("html,body").animate({scrollTop:300});
}

/**
 * 获取url参数
 * 
 * @param {参数名称} name 
 * @returns 
 */
function getUrlParam(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
    var r = window.location.search.substr(1).match(reg);
    if (r != null) return unescape(r[2]); return null;
}


function toTop(){
    $("html,body").animate({scrollTop:0},200);
}