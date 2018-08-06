var Is_Index = true;

$(function(){
    $('#moreCir').on('click',function(){
        $('#introduce').toggleClass('active');
        if($('#introduce').hasClass('active')){
            $('#introduceMore').html('收起');
        }else{
            $('#introduceMore').html('更多');
        }
    });
    CommonResource.checkCookie();
});
