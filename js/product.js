/**
 * Created by Po on 2017/4/5.
 */
$(function(){
    scroll();
    $(window).scroll(scroll);
    CommonResource.checkCookie();
});

function scroll(ev){
    var top = $(window).scrollTop();
    if(top>334){
        $('#content-top-wrap').css('position','fixed');
    }else{
        $('#content-top-wrap').css('position','relative');
    }
    if(top<1384){
        $('#productList .item').attr('class','item');
        $('#productList .item').eq(0).addClass('active');
    }else if(top>=1384&&top<2819){
        $('#productList .item').attr('class','item');
        $('#productList .item').eq(1).addClass('active');
    }else{
        $('#productList .item').attr('class','item');
        $('#productList .item').eq(2).addClass('active');
    }



}
