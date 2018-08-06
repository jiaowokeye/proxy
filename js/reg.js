var Reg = {}

Reg.TimeStr = 60;
Reg.Time1 = null;
Reg.CanSend = true;
//FORM表单元素ID
var formElementID = "editInfoForm";
var formOBJ = CommonResource.getForm("editInfoForm");


$(function(){
    ProvinceCityUtils.initProvinces("province_ul");
    CommonResource.checkCookie();
    Reg.getIndustryList();
})
/**
 * 前往步骤 
 * @param {*} step   1-试用注册  2-填写资料 3-设置管理者信息
 */
Reg.toStep = function(step){

    switch(step){
        case 2:
            Reg.valiteCond();
            break;
        case 3:
            Reg.checkComponyName();
            break;
        default:
            break;
    }


    // $(".step").hide();
    // $("#step"+step).show();
}


/**
 * 发送验证码
 */
Reg.sendCode = function(){
    if(!Reg.CanSend){
        return;
    }
    var url = Constant.PROJECT_NAME + "/sys/phonecode.do?sendCode";
    $.ajax({
        type : "POST",
        url : url,
        dataType :"json",
        data:{"phone":$("#tel").val(),
              "template_id":24,
              "rand":Math.random(),
              "iswebsite": 1
        },				  
        success:function(responseInfo){
            if (responseInfo.result == 1) {
                Reg.CanSend = false;
                $("#tel").next().html("已发送,"+Reg.TimeStr+"S后重新发送");
                Reg.Time1 = setInterval(Reg.showTime,1000)
            }else{
                
            }				
        }
    });		
}


Reg.showTime = function () {
    if(Reg.TimeStr==0){
        clearInterval(Reg.Time1);
        Reg.TimeStr = 60;
        Reg.CanSend = true;
        $("#tel").next().html("发送验证码");
    }else{
        Reg.TimeStr = Reg.TimeStr-1;
        $("#tel").next().html("已发送,"+Reg.TimeStr+"S后重新发送");
    }

}

/**
 * 验证验证码
 */
Reg.valiteCond = function () {
    if(Reg.CanSend){
        alert("请先发送验证码");
        return;
    }
    var url = Constant.PROJECT_NAME + "/sys/phonecode.do?validate";
    $.ajax({
        type : "POST",
        url : url,
        dataType :"json",
        data:{"phone":$("#tel").val(),
            "code":$("#code").val(),
            "rand":Math.random(),
            "iswebsite": 1
        },
        success:function(responseInfo){
            if (responseInfo.result == 1) {
                $(".step").hide();
                $("#step2").show();
                $("#phone").val($("#tel").val())
            }else{

            }
        }
    });

}

/**
 * 取行业列表
 */
Reg.getIndustryList = function () {
    var url = Constant.PROJECT_NAME + "/comp/comp.do?getIndustryList";
    $.ajax({
        type: "POST",
        url: url,
        dataType: "json",
        data: {
            "iswebsite": 1
        },
        success: function (responseInfo) {
            if (responseInfo.result == 1) {
                var data = responseInfo.data;
                if (data && data.length > 0) {
                    var html = '';
                    for (var i = 0; i < data.length; i++) {
                        html += '<option value="' + data[i].id + '">' + data[i].name + '</option>';
                    }
                    $("#industry").html(html);
                }
            } else {

            }
        }
    });
}

/**
 * 编辑表单数据验证
 */
var validtorCompany = "";
Reg.validateForm = function(){
    var rules = {
        "name":{
            required:true
        },
        "contactor":{
            required:true
        },
        "phone":{
            required:true
        },
        "province_id":{
            min:1
        },
        "city_id":{
            min:1
        },
        "address":{
            required:true
        }
    };

    var messages = {
        "name":{
            required:"公司名称不能为空"
        },
        "contactor":{
            required:"联系人不能为空"
        },
        "phone":{
            required:"联系人电话不能为空"
        },
        "province_id":{
            min:"省份不能为空"
        },
        "city_id":{
            min:"城市不能为空"
        },
        "address":{
            required:"联系地址不能为空"
        }
    };
    rules['accountname'] = {required:true};
    messages['accountname'] = {required:"管理员名字不能为空"};

    rules['username'] = {required:true,loginName:true};
    messages['username'] = {required:"登陆账号不能为空"};

    rules['password'] = {required:true};
    messages['password'] = {required:"登陆密码不能为空"};

    rules['confirm_password'] = {equalTo:"#password"};
    messages['confirm_password'] = {equalTo:"密码不匹配"};
    validtorCompany = $("#"+formElementID).validate({
        rules:rules,
        messages:messages
    });

    if($("#"+formElementID).valid()){
        return true;
    }else{
        return false;
    }
};

/**
 * 表单提交
 *
 * @param type 0-新增 1-修改
 */
Reg.commitForm = function(){
    $("#province_id").val($("#province_value").val());
    $("#city_id").val($("#city_value").val());
    $("#country").val($("#country_value").val());
    if(Reg.validateForm()){
        var commitUrl = "";
        commitUrl = Constant.PROJECT_NAME + "/comp/comp.do?add";
        $.post(
            commitUrl,
            CommonResource.getFormObject("#"+formElementID),
            function(responseInfo){
                if(responseInfo.result == 1){
                    $(".step").hide();
                    $("#step4").show();
                    $("#login_username").val($("#username").val());
                    $("#login_password").val($("#password").val());
                }
                //消息提示
                alert(responseInfo.message);
            }
            ,"json");
    }
};

/**
 * 验证公司名
 */
Reg.checkComponyName = function () {
    var url = Constant.PROJECT_NAME + "/comp/comp.do?isDuplicateComp";
    $.ajax({
        type : "POST",
        url : url,
        dataType :"json",
        data:{
            "name":$("#componyname").val(),
            "rand":Math.random(),
            "iswebsite": 1
        },
        success:function(responseInfo){
            if (responseInfo.result == 1) {
                $(".step").hide();
                $("#step3").show();
            }else{
                alert(responseInfo.message);
            }
        }
    });
}
/**
 * 第三步点登录
 */
Reg.login = function () {
    var url = Constant.PROJECT_NAME + "/comp/user/account.do?isDuplicateUser";
    $.ajax({
        type : "POST",
        url : url,
        dataType :"json",
        data:{
            "username":$("#username").val(),
            "rand":Math.random(),
            "iswebsite": 1
        },
        success:function(responseInfo){
            if (responseInfo.result == 1) {
                Reg.commitForm();
            }else{
                alert(responseInfo.message);
            }
        }
    });
}