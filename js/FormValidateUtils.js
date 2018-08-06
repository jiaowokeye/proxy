/**
 * 新增一些Jquery验证规则
 * 
 * @author yan weiming
 * @version 7.0
 */

//手机号码提示信息
var MOBILE_PHONE_MESSAGE = "手机号格式不正确";
//手机号码正则表达式
var MOBILE_PHONE_REGEX = /^((1[3-9]{1})+\d{9})$/;

//电话号码提示信息
var TEL_PHONE_MESSAGE = "电话号格式不正确";
//电话号码正则表达式
var TEL_PHONE_REGEX = /^(0[0-9]{2,3}\-)?([2-9][0-9]{6,7})+(\-[0-9]{1,4})?$/;

//QQ提示信息
var QQ_MESSAGE = "QQ号格式不正确";
//QQ正则表达式
var QQ_REGEX = /^[1-9]\d{4,9}$/;

//邮政编码提示信息
var POST_CODE_MESSAGE = "邮政编码格式不正确";
//邮政编码正则表达式
var POST_CODE_REGEX = /^[0-9]{6}$/;

//用户名提示信息
var USERNAME_MESSAGE = "请输入字母、数字、下划线、邮箱";
//用户名正则表达式
var USERNAME_REGEX = /^[a-zA-Z0-9_]*$/;
var USERNAME_EMAIL_REGEX = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+((.[a-zA-Z0-9_-]{2,3}){1,2})$/;

//用户名提示信息
var DIGITS_MESSAGE = "不是正确的整数格式";
//验证整数正则表达式
var DIGITS_REGEX = /^-?\d+$/;

//身份证提示信息
var IDENTIFY_MESSAGE = "身份证号格式不正确";
//验证身份证号正则表达式
var IDENTIFY_REGEX =/^(\d{15}$|^\d{18}$|^\d{17}(\d|X|x))$/;

//手机号验证
$.validator.addMethod("mobilePhone",function(value,element){
	var length = value.length;
	return this.optional(element) || (length == 11 && MOBILE_PHONE_REGEX.test(value));
},MOBILE_PHONE_MESSAGE);

//电话号码验证
$.validator.addMethod("telPhone",function(value,element){
	return this.optional(element) || (TEL_PHONE_REGEX.test(value));
},TEL_PHONE_MESSAGE);

//QQ验证
$.validator.addMethod("qqNumber",function(value,element){
	return this.optional(element) || (QQ_REGEX.test(value));
},QQ_MESSAGE);

//邮编验证
$.validator.addMethod("postCode",function(value,element){
	return this.optional(element) || (POST_CODE_REGEX.test(value));
},POST_CODE_MESSAGE);

//用户名验证
$.validator.addMethod("loginName",function(value,element){
	return this.optional(element) || USERNAME_REGEX.test(value) || USERNAME_EMAIL_REGEX.test(value);
	//return true;
},USERNAME_MESSAGE);

//整数验证
$.validator.addMethod("digitsAll",function(value,element){
	return this.optional(element) || (DIGITS_REGEX.test(value));
},DIGITS_MESSAGE);

//身份证号验证
$.validator.addMethod("identity",function(value,element){
	return this.optional(element) || (IDENTIFY_REGEX.test(value));
},IDENTIFY_MESSAGE);