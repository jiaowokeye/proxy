/**
 * ����һЩJquery��֤����
 * 
 * @author yan weiming
 * @version 7.0
 */

//�ֻ�������ʾ��Ϣ
var MOBILE_PHONE_MESSAGE = "�ֻ��Ÿ�ʽ����ȷ";
//�ֻ�����������ʽ
var MOBILE_PHONE_REGEX = /^((1[3-9]{1})+\d{9})$/;

//�绰������ʾ��Ϣ
var TEL_PHONE_MESSAGE = "�绰�Ÿ�ʽ����ȷ";
//�绰����������ʽ
var TEL_PHONE_REGEX = /^(0[0-9]{2,3}\-)?([2-9][0-9]{6,7})+(\-[0-9]{1,4})?$/;

//QQ��ʾ��Ϣ
var QQ_MESSAGE = "QQ�Ÿ�ʽ����ȷ";
//QQ������ʽ
var QQ_REGEX = /^[1-9]\d{4,9}$/;

//����������ʾ��Ϣ
var POST_CODE_MESSAGE = "���������ʽ����ȷ";
//��������������ʽ
var POST_CODE_REGEX = /^[0-9]{6}$/;

//�û�����ʾ��Ϣ
var USERNAME_MESSAGE = "��������ĸ�����֡��»��ߡ�����";
//�û���������ʽ
var USERNAME_REGEX = /^[a-zA-Z0-9_]*$/;
var USERNAME_EMAIL_REGEX = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+((.[a-zA-Z0-9_-]{2,3}){1,2})$/;

//�û�����ʾ��Ϣ
var DIGITS_MESSAGE = "������ȷ��������ʽ";
//��֤����������ʽ
var DIGITS_REGEX = /^-?\d+$/;

//���֤��ʾ��Ϣ
var IDENTIFY_MESSAGE = "���֤�Ÿ�ʽ����ȷ";
//��֤���֤��������ʽ
var IDENTIFY_REGEX =/^(\d{15}$|^\d{18}$|^\d{17}(\d|X|x))$/;

//�ֻ�����֤
$.validator.addMethod("mobilePhone",function(value,element){
	var length = value.length;
	return this.optional(element) || (length == 11 && MOBILE_PHONE_REGEX.test(value));
},MOBILE_PHONE_MESSAGE);

//�绰������֤
$.validator.addMethod("telPhone",function(value,element){
	return this.optional(element) || (TEL_PHONE_REGEX.test(value));
},TEL_PHONE_MESSAGE);

//QQ��֤
$.validator.addMethod("qqNumber",function(value,element){
	return this.optional(element) || (QQ_REGEX.test(value));
},QQ_MESSAGE);

//�ʱ���֤
$.validator.addMethod("postCode",function(value,element){
	return this.optional(element) || (POST_CODE_REGEX.test(value));
},POST_CODE_MESSAGE);

//�û�����֤
$.validator.addMethod("loginName",function(value,element){
	return this.optional(element) || USERNAME_REGEX.test(value) || USERNAME_EMAIL_REGEX.test(value);
	//return true;
},USERNAME_MESSAGE);

//������֤
$.validator.addMethod("digitsAll",function(value,element){
	return this.optional(element) || (DIGITS_REGEX.test(value));
},DIGITS_MESSAGE);

//���֤����֤
$.validator.addMethod("identity",function(value,element){
	return this.optional(element) || (IDENTIFY_REGEX.test(value));
},IDENTIFY_MESSAGE);