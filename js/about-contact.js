/**
 * 产品订购
 */
var formObj = "";

var validator = "";
$(function(){
    $("#order_btn").click(function(){
        Order.add();
    });

    /**
     *清除表单
     */
    Order.clearForm();
    ProvinceCityUtils.initProvinces("province_ul");
    CommonResource.checkCookie();

});



var Order = {};

Order.clearForm = function(){
    formObj = CommonResource.createAndResetForm("order_form");
    $("#province_text").html("<span style='color:#dedede'>请选择</span>");
    $("#city_text").html("<span style='color:#dedede'>请选择</span>");
    $("#country_text").html("<span style='color:#dedede'>请选择</span>");
    $("#province_value").val(0);
    $("#city_value").val(0);
    $("#country_value").val(0);
    $("#span_message").html("");
    $("#span_message").removeAttr("class");
    if(validator){
        validator.resetForm();
    }
};

Order.validateForm = function(){

    var companyVal = $("#comp_name").val();
    if(!companyVal){
        $("#alt").html("公司名称不能为空");
        $("#alt").addClass("err");
        return false;
    }
    var province_value = Number($("#province_value").val());
    if(!province_value){
        $("#alt").html("请选择省份");
        $("#alt").addClass("err");
        return false;
    }
    var city_value = Number($("#city_value").val());
    if(!city_value){
        $("#alt").html("请选择城市");
        $("#alt").addClass("err");
        return false;
    }
    var country_value = Number($("#country_value").val());
    if(!country_value){
        $("#alt").html("请选择区县");
        $("#alt").addClass("err");
        return false;
    }
    var name = $("#contactor").val();
    if(!name){
        $("#alt").html("联系人不能为空");
        $("#alt").addClass("err");
        return false;
    }
    var phone = $("#telephone").val();
    if(!phone){
        $("#alt").html("联系电话不能为空");
        $("#alt").addClass("err");
        return false;
    }
    $("#alt").html("请填写所有字段");
    $("#alt").removeClass("err");
    return true;
};


Order.add = function(){
    if(!Order.validateForm()){
        return;
    }
    $.post(
        Constant.PROJECT_NAME + "/market/buyintent.do?add",
        CommonResource.getFormData("order_form"),
        function(responseInfo){
            if(responseInfo.result == 1){

                Order.clearForm();
                $("#send").hide();
                $("#sendSucc").show();
            }else{
                $.jGrowl(responseInfo.message);
            }
        }
        ,"json");
};