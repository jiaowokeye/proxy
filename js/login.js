/*定义一个Login Json对象，存放*/
Login = {};

/*用于接收用户名信息*/
Login.userNameValue = "";

/*用于接收密码信息*/
Login.passWordValue = "";

//登陆成功后跳转的路径
Login.hrefUrl = "/index.jsp";

//进入的首个页面
Login.firstPathUrl = "";

$(function() {
	$("#password").parent().append("<i id='seePwd' class='seePwd'></i>");
	$("#seePwd").on("click",function() {
		if($("#seePwd").hasClass("active")){
			$("#password").attr("type","password");
			$("#seePwd").removeClass("active");
		}else{
			$("#password").attr("type","text");
			$("#seePwd").addClass("active");
		}
	})
})

/*由于存在新后台和老后台暂时用此方法处理,传递参数isNew  true代表新后台，false代表老后台*/
Login.tentLogon = function(isNew){
	if(isNew){
		Login.firstPathUrl = CommonResource.getCookie("firstUrl");
	}
	//成功后跳转的路径
	var newPath = Constant.PROJECT_NAME + Login.firstPathUrl;
	Login.hrefUrl = isNew?newPath:"/index.jsp";
};


/*检测用户名密码是否为空*/
Login.check = function(){
	var loginInfomation = CommonResource.getFormData("loginForm");
	Login.userNameValue = loginInfomation.username;
	Login.passWordValue = loginInfomation.password;
	if(Login.userNameValue == "" || Login.userNameValue=='undefined'){
		$("#username").attr("placeholder","请输入账号");
		$("#username").focus();
		return false;
	}
	if(Login.passWordValue == "" || Login.passWordValue=='undefined'){
		$("#password").attr("placeholder","请输入密码");
		$("#password").focus();
		return false;
	}
	return true;
};

/*处理登陆*/
Login.logon = function(isNew){
	var url = "";
	if(isNew){
		url = Constant.PROJECT_NAME + "/comp/user.do?login";
	}else{
		url = "/logon";
	}
	var isTrue = Login.check();
	if(isTrue){
		$.ajax({
			type : "POST",
			url : url,
			dataType :"json",
			data:{"username":Login.userNameValue,
				  "password":Login.passWordValue,
				  "rand":Math.random()
			},				  
			success:function(responseInfo){
			  	if (responseInfo.result == "3") {
			  		if(isNew){
			  			//首次进入的路径
			  			var firstActionUrlPath = responseInfo.data.firstActionUrl;
			  			
			  			Login.hrefUrl = Constant.PROJECT_NAME + firstActionUrlPath + "&IsLogin=true";
			  			
			  			CommonResource.saveCookie("firstUrl",firstActionUrlPath);
			  		} 		
					window.location.href = Login.hrefUrl;
				}else if (responseInfo.result == "1") {
					$("#password").val("");
					$("#password").attr("placeholder","密码错误");
					$("#password").focus();
				}else{
					$("#username").val("");
					$("#username").attr("placeholder",responseInfo.message);
					$("#username").focus();
				}				
			}
		});		
	}else{
		return;
	}
};


/*注销*/
Login.logout = function(){
	window.location.href = Constant.PROJECT_NAME + "/comp/user.do?logout&authid=206&parentAuthId=-14&menuid=206&random="+Math.random();
};


/*处理直接进入页面*/
Login.login = function(isnew){
	Login.tentLogon(isnew);
	window.location.href = Login.hrefUrl;
};
