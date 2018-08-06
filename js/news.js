/**
 * Created by Administrator on 2017/4/13.
 */
$(function(){
    CommonResource.checkCookie();
    $(".text_con p").each(function(i,e){
        if($(e).find("img").length>0){
            $(e).addClass("textCenter");
        }
    })
});