(function (doc, win) {
	var docEl = doc.documentElement,
		resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize',
		recalc = function () {

			var clientWidth = docEl.clientWidth;

			if (!clientWidth) return;
			if (clientWidth >= 640) {
				docEl.style.fontSize = '100px';
			} else {
				docEl.style.fontSize = 100 * (clientWidth / 750) + 'px';
			}
		};
	if (!doc.addEventListener) return;
	recalc();
	win.addEventListener(resizeEvt, recalc, false);
	doc.addEventListener('DOMContentLoaded', recalc, false);
	/*DOMContentLoaded�ĵ�������ɲ�����ͼƬ��Դ onload����ͼƬ��Դ*/
})(document, window);

/*
var iWidth=document.documentElement.clientWidth  //getBoundingClientRect().width;
 iWidth=iWidth>640?640:iWidth;
 document.getElementsByTagName("html")[0].style.fontSize=iWidth/6.4+"px";*/