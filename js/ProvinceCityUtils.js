/**
 * 处理省市的js
 */
/***定义一个ProvinceCityUtils json对象***/
var ProvinceCityUtils = {};

ProvinceCityUtils.cityListJson = "";
ProvinceCityUtils.countryListJson = "";
/**
 * 初始化省份的下拉列表
 */
ProvinceCityUtils.initProvinces = function(elementID){
	var params = {
			"rand":Math.random(),
			"authid":-1,
			"isInit":1,
			"iswebsite":1
	};
	$.post(
			Constant.PROJECT_NAME + "/sys/province.do?all",
			params,
			function(responseInfo){
				if(responseInfo.result == 1){
					ProvinceCityUtils.createLis(responseInfo.data, elementID, "name", "province_id",1);

				}else{
					$.jGrowl(responseInfo.message);
				}
			}
	,"json");
};

ProvinceCityUtils.createLis = function(data,containerID,nametext,valuetex,type){
	var container = $("#"+containerID);
	container.empty();
	$.each(data,function(index,value){
		var li = document.createElement("li");
		$(li).attr("value",value[valuetex]);
		if(type == 1){
			$(li).attr("id","province"+value[valuetex]);
		}else if(type == 2){
			$(li).attr("id","city"+value[valuetex]);
		}else{
			$(li).attr("id","country"+value[valuetex]);
		}
		$(li).html(value[nametext]);
		container.append(li);
	});
};

/**
 * 生成城市列表
 */
ProvinceCityUtils.initCitys = function(elementID,province_id){
	var params = {
			"rand":Math.random(),
			"authid":-1,
			"province_id":province_id,
			"iswebsite":1
	};
	$.post(
			Constant.PROJECT_NAME + "/sys/province.do?getCitys",
			params,
			function(responseInfo){
				if(responseInfo.result == 1){
					ProvinceCityUtils.cityListJson  = responseInfo.data;
					ProvinceCityUtils.createLis(responseInfo.data, elementID, "name", "id",2);
                    $("#city_text").html("<span style='color:#dedede'>请选择</span>");
                    $("#country_text").html("<span style='color:#dedede'>请选择</span>");
				}else{
					$.jGrowl(responseInfo.message);
				}
			}
	,"json");
};

/**
 * 根据城市ID获取区县信息
 */
ProvinceCityUtils.initCountrys = function(elementID,cityId){
	var params = {
			"rand":Math.random(),
			"authid":-1,
			"city_id":cityId,
			"iswebsite":1
	};
	$.post(
			Constant.PROJECT_NAME + "/sys/province.do?getCountrys",
			params,
			function(responseInfo){
				if(responseInfo.result == 1){
					ProvinceCityUtils.countryListJson  = responseInfo.data;
					ProvinceCityUtils.createLis(responseInfo.data, elementID, "name", "id",3);
                    $("#country_text").html("<span style='color:#dedede'>请选择</span>");
				}else{
					$.jGrowl(responseInfo.message);
				}
			}
	,"json");
};

/**
 * 提交成功弹出框居中于屏幕中间事件处理
 */
//Center Prompt
$(function centerPrompt() {

    var winW = $(window).width();
    var winH = $(window).height();

    var promptW = $('.prompt-div').outerWidth();
    var promptH = $('.prompt-div').outerHeight();
    
    $('.prompt-div').css({
        'left':(winW/2)-(promptW/2),
        'top':(winH/2)-(promptH/2)
    });
});
