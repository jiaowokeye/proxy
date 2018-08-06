/**
 * 定义一个CommonResource对象。存放全局变量[为Ajax提交使用]和系统方法。
 */
var CommonResource = {};
var Is_Index = false;
//i到位产品升级数组三个
CommonResource.editionData = [
	{"date":"2018-07-13","ver":"V9.1"},
	{"date":"2018-05-18","ver":"V9.01"},
	{"date":"2018-04-13","ver":"V9.0"}
	
]
/**
 * 创建版本升级内容
 */
CommonResource.createEditionHtml = function(){
	var html = "";
	if(Is_Index){//主页
		html += '<li class="new"><a href="./html/productAction.html?active=1"><span class="data">'+CommonResource.editionData[0].date+'</span><span class="edition"><img src="./images/productUpgradeNow.png" alt="">i到位'+CommonResource.editionData[0].ver+'</span></a></li>';
		html += '<li><a href="./html/productAction.html?active=1"><span class="data">'+CommonResource.editionData[1].date+'</span><span class="edition"><img src="./images/productUpgrade.png" alt="">i到位'+CommonResource.editionData[1].ver+'</span></a></li>';
		html += '<li><a href="./html/productAction.html?active=1"><span class="data">'+CommonResource.editionData[2].date+'</span><span class="edition"><img src="./images/productUpgrade.png" alt="">i到位'+CommonResource.editionData[2].ver+'</span></a></li>';
	}else{
		html += '<li class="new"><a href="./productAction.html?active=1"><span class="data">'+CommonResource.editionData[0].date+'</span><span class="edition"><img src="./../images/productUpgradeNow.png" alt="">i到位'+CommonResource.editionData[0].ver+'</span></a></li>';
		html += '<li><a href="./productAction.html?active=1"><span class="data">'+CommonResource.editionData[1].date+'</span><span class="edition"><img src="./../images/productUpgrade.png" alt="">i到位'+CommonResource.editionData[1].ver+'</span></a></li>';
		html += '<li><a href="./productAction.html?active=1"><span class="data">'+CommonResource.editionData[2].date+'</span><span class="edition"><img src="./../images/productUpgrade.png" alt="">i到位'+CommonResource.editionData[2].ver+'</span></a></li>';
	}
	$(".productUpgrade .content ul").html(html);
}

//页面加载完成以后请求通知信息
$(function(){
	CommonResource.createEditionHtml();
	$.ajax({  
         type: "get",   
         url: "https://www.idaowei.com/php/notice.php?rand="+Math.random()+"&os=2",  
         dataType: "jsonp", 
         jsonp:"jsoncallback", 
         success: function(json){  
			if(json.message){
				var html = "";
				html += "<div id='SYSTEM_NOTICES_WRAP' style='width:100%;background:#fef9dc;border-top:1px solid #ede1b0;border-bottom:1px solid #b8b5ac;position:relative;'>";
				html += "<div id='SYSTEM_NOTICES' style='width:1210px;line-height:35px;font-size:16px;color:#dd434e;margin:0 auto;text-align:center;overflow:hidden;' title="+json.message+">"+json.message+"</div>";
				html += "<a href=\"javascript:$('#SYSTEM_NOTICES_WRAP').remove();\" style='font-size:18px;color:black;position:absolute;top:50%;margin-top:-17px;right:20px;height:35px;'>X</a></div>";
				$(html).insertBefore("#header-wrap");
			}	
         }	
    }); 
})

/*根据Form 表单的ID值获取表单数据*/
CommonResource.getFormData = function(formElementId) {
	var data = $('#' + formElementId).serializeArray();
	var formData = {};
	for ( var i = 0; i < data.length; i++) {
		var name = data[i].name;
		formData[name] = data[i].value;
	}
	formData.parentAuthId = 0;
	formData.authid = -1;
	formData.iswebsite = 1;
	return formData;
};

/*获取FormObj*/
CommonResource.getForm = function(formElementId) {
	var form = $('#' + formElementId);
	return form;
};

/**
 * 创建表单并将该表单上的数据重置为初始化状态。
 * 
 * @param formElementId
 *            给定的form的HTML元素的id。
 */
CommonResource.createAndResetForm = function(formElementId) {
	var formObj = CommonResource.getForm(formElementId);
	formObj[0].reset();
	return formObj;
};


/*取cookies函数,根据cookie的名字 */
CommonResource.getCookie =  function(name)       
{
    var arr = document.cookie.match(new RegExp("(^| )"+name+"=([^;]*)(;|$)"));
    if(arr != null) 
    	return unescape(arr[2]); 
    return "nocookie";
};

/*保存Cookie*/
CommonResource.saveCookie = function(key,value){
	var cookieString=key+"="+escape(value);
	document.cookie=cookieString; 
};

/*判断Cookie并获取用户名，设置欢迎或者登陆*/
CommonResource.checkCookie = function(){	
	var serverCookie = CommonResource.getCookie("smartlbs");
	if(serverCookie!= "nocookie")
	{	
		/**
		 * 验证新平台
		 */
		$.ajax({
			type : "POST",
			url :Constant.PROJECT_NAME + "/comp/user.do?verify&iswebsite=1",
			dataType :"json",
			data:{"rand":Math.random()},		
			success:function(responseInfo){
				if(responseInfo.data != ""){
					$("#logindiv .form-gruop").eq(0).html("<span class='userName'>" + responseInfo.data + "</span>&nbsp;&nbsp;您好，您已登录位智天下后台管理系统");
					$("#logindiv").show();
					$("#formdiv").hide();
					$("#innew").show();
				}
				
			}
		});
	}else{
		$("#logindiv").css({"display":"none"});
		$("#formdiv").css({"display":"block"});		
	}
};

/**
 * 封装页面端请求参数对象，为添加和修改准备。
 * @param formObject FORM表单对象
 */
CommonResource.getFormObject = function (formObject){
    var data = $(formObject).serializeArray();
    var formData = {};
    for ( var i = 0; i < data.length; i++) {
        var name = data[i].name;
        formData[name] = data[i].value;
    }
    return formData;

};