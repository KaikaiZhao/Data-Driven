/*
========================
FOR NGACN ONLY
------------
(c) 2005 Zeg All Rights Reserved
========================
bbs.ngacn.cc ����б� v1.00
written by zeg 20051010
========================

bbs_ads1 ��̳ȫҳ�涥��ͨ�� 900*60
bbs_ads1x ��̳ȫҳ�涥��ͨ���ڶ���

//bbs_ads24 �����������Aȫ�� ���ȼ��ȷ����
//bbs_ads2 �����������A ��̳��ҳ���� 190*400
bbs_ads8 �����������A ��̳�Ķ�����ҳ�棨��������һ���Ҳ�190*400
bbs_ads16 �����������A ��̳�����б�ҳ�棨���棩�ײ����ٷ����Ҳ� 190*400

bbs_ads17 ��̳�Ķ�����ҳ�棨�������������Ҳ�190*400

bbs_ads25 �����������Bȫ�� ���ȼ��ȷ����
bbs_ads13 �����������B ��̳��ҳ����190*400
bbs_ads21 �����������B ��̳�Ķ�����ҳ�棨�������ڶ����Ҳ�190*400

bbs_ads23 �ɱ�ͨ����λ��ͬͨ�����A ���ȼ��ȷ����
bbs_ads9 ͨ�����A ��̳�����б�ҳ�棨���棩��ͨ�� 900*60
bbs_ads10 ͨ�����A ��̳�Ķ�����ҳ�棨��������һ����ͨ�� 900*60
bbs_ads11 ͨ�����A ��̳��ҳ��ͨ��#1 900��60

bbs_ads14 ͨ�����B ��̳ȫҳ����ͨ�� 900��60

bbs_ads12 ��̳ȫҳ����ת 600*360

bbs_ads15 ��̳�Ķ�����ҳ�棨���������ֹ��

bbs_ads22 ��̳�Ķ�����ҳ�棨�������ײ����ٷ����Ҳ� 190*400

bbs_ads26 ��̳��ҳ��1 140*400~900
bbs_ads27 ��̳��ҳ��2 140*400~900
*/

/* �ܱ� */
if(!window.ngaAds)
	ngaAds = [];

ngaAds.objClone = function(o){
	if(o == null || typeof(o) != 'object')return o;
	var oo = new o.constructor();
	for(var k in o)oo[key] = this.objClone(o[key]);
	return oo;
	}
ngaAds.ckurl = function(url){
	return location.href.indexOf(url)==-1 ? false : true
	}


/*--------------------*/
var fAds = new Array;
/*�����*/
fAds.push({
	'file':__IMG_BASE+'/misc/self/f/f1.jpg',
	'url':'/thread.php?fid=200'
});
/*����*/
fAds.push({
	'file':__IMG_BASE+'/misc/self/f/f2.jpg',
	'url':'/thread.php?fid=102'
});
/*ʥ��*/
fAds.push({
	'file':new Array(__IMG_BASE+'/misc/self/f/f184a.jpg',__IMG_BASE+'/misc/self/f/f3.jpg'),
	'url':'/thread.php?fid=184'
});
/*ħ��*/
fAds.push({
	'file':__IMG_BASE+'/misc/self/f/f4.jpg',
	'url':'/thread.php?fid=182'
});
/*����*/
fAds.push({
	'file':new Array(__IMG_BASE+'/misc/self/f/f187a.jpg',__IMG_BASE+'/misc/self/f/f5.jpg'),
	'url':'/thread.php?fid=187'
});
/*��ʦ*/
fAds.push({
	'file':__IMG_BASE+'/misc/self/f/f6.jpg',
	'url':'/thread.php?fid=183'
});
/*��ʿ*/
fAds.push({
	'file':__IMG_BASE+'/misc/self/f/f7.jpg',
	'url':'/thread.php?fid=188'
});
/*der*/
fAds.push({
	'file':__IMG_BASE+'/misc/self/f/f8.jpg',
	'url':'/thread.php?fid=186'
});
/*�ؾ�*/
fAds.push({
	'file':__IMG_BASE+'/misc/self/f/f9.jpg',
	'url':'/thread.php?fid=191'
});
/*����*/
fAds.push({
	'file':__IMG_BASE+'/misc/self/f/f10.jpg',
	'url':'/thread.php?fid=272'
});
/*սʿ*/
fAds.push({
	'file':new Array(__IMG_BASE+'/misc/self/f/f12.jpg',__IMG_BASE+'/misc/self/f/f181a.jpg'),
	'url':'/thread.php?fid=181'
});
/*����*/
fAds.push({
	'file':__IMG_BASE+'/misc/self/f/f185.jpg',
	'url':'/thread.php?fid=185'
});
/*��*/
fAds.push({
	'file':new Array(__IMG_BASE+'/misc/self/f/f189a.jpg',__IMG_BASE+'/misc/self/f/f189.jpg'),
	'url':'/thread.php?fid=189'
});
/*����*/
fAds.push({
	'file':__IMG_BASE+'/misc/self/f/f11.jpg',
	'url':'/thread.php?fid=190'
});
var j = Math.floor(Math.random()*(fAds.length));
if (typeof(fAds[j]['file'])=='object')
	fAds[j].file = fAds[j].file[ Math.floor(Math.random()*fAds[j]['file'].length)]

/*--------------------*/



/* bbs_ads26 ��̳��ҳ��1 140*550~1100
bbs_ads27 ��̳��ҳ��2 140*550~1100 */

function bbs_ads26_27(){
if (ngaAds['bbs_ads26'])
	put(ngaAds.genAds(ngaAds['bbs_ads26']));

if (ngaAds['bbs_ads27']){
	if(ngaAds['bbs_ads26'])put("<div style='width:auto;border:none;padding:0;margin:0;float:none;height:20px;font-size:0px;line-height:0px'></div>")
	put(ngaAds.genAds(ngaAds['bbs_ads27']));
	}

}


/* �����������A ��̳�Ķ�����ҳ�棨��������һ���Ҳ�190*400		bbs_ads8*/

ngaAds.push({
	'id':'bbs_ads8',
	'file':'http://wow.178.com/s/zt/sjk2.html',
	'url':'http://zhaoji.178.com',
	'title':'',
	'width':'190',
	'height':'400',
	'date':'all',
	'rate':30,
	'nolog':1,
	'type':'iframe'
});

/*�����������B ��̳�Ķ�����ҳ�棨�������ڶ����Ҳ�190*400  ���λID:bbs_ads21 */

ngaAds.push({
	'id':'bbs_ads21',				/*���λID*/
	'file':'http://xin.178.com/s/zt/sc2.html',		/*�ļ� ͼƬ �� flash �� Ƕ��ҳ���ַ*/
	'url':'',			/*���ӵ�ַ ��flash�Դ������򲻱���д*/
	'title':'178�����Ƽ�',			/*ͼƬ˵�� flash������д*/
	'width':'190',				/*���(������������190)*/
	'height':'400',				/*�߶�(������������400)*/
	'date':'3/17/2009-11/1/2009',	/*����(���ղ���ʾ�������) ���� 2/15/2006 7/1/2006-7/31/2006 8/1/2006-8/31/2006 ��Ϊ��2��15�պ�7����8����ʾ ����all��Ϊһֱ��ʾ*/
	'rate':25,					/*��ʾ�ļ��ʣ��ٷֱȣ���ͬһ�����λ�����е�����ʾ�Ĺ����ʾ�������Ӧ������100���糬��100��������ǰ������ȣ������һ��70�ڶ���60������20��ʵ����Ϊ��һ��70�ڶ���30����������ʾ��*/
	'nolog':1,					/*Ϊ1ʱ��ͳ�Ƶ���� 0ʱͳ�Ƶ����*/
	'type':'iframe'					/*���� ��ͼƬ��flash������� Ƕ��ҳ������iframe*/
});


/* ��̳�Ķ�����ҳ�棨�������������Ҳ�190*400  ���λID:bbs_ads17 */

ngaAds.push({
	'id':'bbs_ads17',
	'file':{'default':'http://wow.178.com/s/zt/sjk3.html','f320':'http://wow.178.com/200903/t_30674595532.html'},
	'url':'',
	'date':'all',
	'rate':15,
	'width':'190',
	'height':'400',
	'nolog':1,
	'type':'iframe'
});
ngaAds.push({
	'id':'bbs_ads17',
	'file':'http://wow.178.com/s/zt/sjk4.html',
	'url':'',
	'date':'all',
	'rate':15,
	'width':'190',
	'height':'400',
	'nolog':1,
	'type':'iframe'
});

var ads8notshow = true;
function bbs_ads8_load_new(o,index,fid)
{
if(window.__VERY_SMALL_SCREEN)return
var key = '';
if (ngaAds['bbs_ads8'] && index==0)
	key = 'bbs_ads8'
if (ngaAds['bbs_ads24'] && index==0)
	key = 'bbs_ads24'
if (ngaAds['bbs_ads21'] && index==1)
	key = 'bbs_ads21'
if (ngaAds['bbs_ads25'] && index==1)
	key = 'bbs_ads25'
if (ngaAds['bbs_ads17'] && index==2)
	key = 'bbs_ads17'
if (key)
	{
	if (typeof(ngaAds[key]['file'])=='object')
		{
		if (ngaAds[key]['file']['f'+fid])
			ngaAds[key]['file'] = ngaAds[key]['file']['f'+fid];
		else
			ngaAds[key]['file'] = ngaAds[key]['file']['default'];
		}
	o.innerHTML=ngaAds.genAds(ngaAds[key]);
	o.className = 'adsc5';
	}
}

/*
ngaAds.push({
	'id':'bbs_ads13',
	'file':__IMG_BASE+'/misc/self/20060830.jpg',
	'url':'',
	'title':'��߷�����ʶ�������ʺŰ�ȫ',
	'width':'',
	'height':'',
	'date':'all',
	'rate':2,
	'nolog':1
});

ngaAds.push({
	'id':'bbs_ads13',
	'file':__IMG_BASE+'/misc/self/20060829.jpg',
	'title':'ֹͣ�����ң��õ���������ͼ',
	'date':'all',
	'rate':4,
	'nolog':1
});

//����
ngaAds.push({
	'file':fAds[j]['file'],
	'url':fAds[j]['url'],
	'id':'bbs_ads13',
	'date':'all',
	'rate':5,
	'nolog':1
});
*/

/*��̳ȫҳ����ͨ�� 900��60		bbs_ads1*/

ngaAds.push({
	'id':'bbs_ads1',
	'file':__IMG_BASE+'/misc/king/900_60_5.jpg',
	'url':'http://freeadp.tensynad.com/servlet/clk/clk,01190-0013?http://a751.oadz.com/link/C/751/114455/i03BudlXtrsnFJJhz9som1F1Us0_/a/2087/http://jx3.xoyo.com/',
	'title':'',
	'width':'900',
	'height':'60',
	'date':'',
	'rate':100,
	'nolog':1,
	'type':''
});

ngaAds.bbs_ads1_gen=function(){
if (this.bbs_ads1)
	return "<div id='adsc1' class='adsc' style='display:block'>ADVERTISEMENT<br/>"+this.genAds(this.bbs_ads1)+(this.bbs_ads1x? "<br style='height:10px;line-height:10px'/>"+this.genAds(this.bbs_ads1x):'')+'</div>'
return ''
}

/*�ڶ�����̳ȫҳ����ͨ�� 900��60		bbs_ads1x

ngaAds.push({
	'id':'bbs_ads1x',
	'file':'http://uencn.com/res/sc90060.gif',
	'url':'http://uencn.com',
	'width':'900',
	'height':'60',
	'date':'',
	'rate':70,
});

/*��̳ͨ�����A ��̳�����б�ҳ�棨���棩��ͨ�� 900*60		bbs_ads9 */

ngaAds.push({
	'id':'bbs_ads9',
	'file':__IMG_BASE+'/misc/163/900_60_6.gif',
	'url':'http://allyes.nie.163.com/main/adfclick?db=afanie&bid=3835,1877,121&cid=461,38,1&sid=3970&show=ignore&url=http://tx2.163.com/2009/work/',
	'title':'',
	'width':'900',
	'height':'60',
	'date':'',
	'rate':100,
	'nolog':1,
	'type':''
});


function bbs_ads9()
{
if (checkurl('/thread.php'))
	{
	if (ngaAds['bbs_ads9'])
		{
		document.write ("<thead><tr><th colspan='5' style='height:3px'></th></tr></thead><tbody><tr><td id='adsc9' colspan='5' class='adsc'>");
		document.write (ngaAds.genAds(ngaAds['bbs_ads9']));
		document.write ("</td></tr></tbody>");
		}
	if (ngaAds['bbs_ads23'])
		{
		bbs_ads23_chk();
		document.write ("<thead><tr><th colspan='5' style='height:3px'></th></tr></thead><tbody><tr><td id='adsc9' colspan='5' class='adsc'>");
		document.write (ngaAds.genAds(ngaAds['bbs_ads23']));
		document.write ("</td></tr></tbody>");
		}
	}
}


/*ͨ�����A ��̳�Ķ�����ҳ�棨��������һ����ͨ�� 900*60		bbs_ads10 */

ngaAds.push({
	'id':'bbs_ads10',
	'file':__IMG_BASE+'/misc/163/900_60_5.swf',
	'url':'',
	'title':'',
	'width':'900',
	'height':'60',
	'date':'',
	'rate':100,
	'nolog':1,
	'type':''
});

function bbs_ads10(pos)
{
if(pos)return
if (checkurl('/read.php'))
	{
	if (ngaAds['bbs_ads10'])
		{
		document.write ("<div id='adsc10' class='adsc'>");
		document.write (ngaAds.genAds(ngaAds['bbs_ads10']));
		document.write ("</div>");
		}
	if (ngaAds['bbs_ads23'])
		{
		bbs_ads23_chk();
		document.write ("<div id='adsc10' class='adsc'>");
		document.write (ngaAds.genAds(ngaAds['bbs_ads23']));
		document.write ("</div>");
		}
	}
}
function bbs_ads10_new(o,index)
{
if(index==0)
	{
	if (ngaAds['bbs_ads10'])
		o.innerHTML = "<div id='adsc10' class='adsc'>"+ngaAds.genAds(ngaAds['bbs_ads10'])+"</div>";
	if (ngaAds['bbs_ads23'])
		{
		bbs_ads23_chk();
		o.innerHTML = "<div id='adsc10' class='adsc'>"+ngaAds.genAds(ngaAds['bbs_ads23'])+"</div>";
		}
	}
}


/*ͨ�����B ��̳ȫҳ����ͨ�� 900��60	bbs_ads14*/

// baidu
ngaAds.push({
	'id':'bbs_ads14',
	'file':'http://cpro.baidu.com/cpro/ui/cp.js',//cpro_client
	'ads_container_id':'bbs_ads14',
	'type':'baidu',
	'date':'',
	'width':468,
	'height':15,
	'rate':100,
	'args':{
		'cpro_client':'haozi8011_43942_cpr',
		'cpro_flush':4,
		'cpro_w':468,
		'cpro_h':15,
		'cpro_template':'wlink_default_468_15',
		'cpro_cbd':'#e7d5aa',
		'cpro_cbg':'#e7d5aa', 
		'cpro_ctitle':'#1d2a63',
		'cpro_cflush':'#e10900', 
		'cpro_uap':1,
		'cpro_cad':1
		}
});

function bbs_ads14()
{
if (ngaAds['bbs_ads14']){
	var tmp = document.write
	tmp("<div class='adsc_cate' id='bbs_ads14' style='display:block'>");
	tmp("<span class='xxtxt'>ADVERTISEMENT<br/></span><div>");
	tmp(ngaAds.genAds(ngaAds['bbs_ads14']));
	if (ngaAds['bbs_ads14_2'])
		tmp(ngaAds.genAds(ngaAds['bbs_ads14_2']));
	tmp("</div><div class='clear'></div>");
	tmp('</div>')
	}
}

/*��̳ȫҳ����ת			bbs_ads12*/

ngaAds.push({
	'id':'bbs_ads12',
	'refreshid':'92',
	'file':__IMG_BASE+'/misc/163/600_360_7.gif',
	'url': 'http://allyes.nie.163.com/main/adfclick?db=afanie&bid=3909,1914,121&cid=461,38,1&sid=4048&show=ignore&url=http://tx2.163.com/2009/up',
	'title':'',
	'width':'600',
	'height':'360',
	'date':'',
	'rate':100,
	'nolog':1,
	'type':''
});

/*�Ķ�����ҳ��ײ����ٷ����Ҳ� 190*400 bbs_ads22*/

ngaAds.push({
	'id':'bbs_ads22',
	'file':'http://shop.178.com/images/photo/955f896a9188999a6d669601b15cbed31326796818.jpg',
	'title':'178�̳�',
	'url':'http://shop.178.com/',
	'date':'all',
	'rate':50,
	'width':'190',
	'height':'400',
	'nolog':1,
	'type':''
});

/*�����������A ��̳�����б�ҳ�棨���棩�ײ����ٷ����Ҳ� 190*400 bbs_ads16*/

ngaAds.push({
	'id':'bbs_ads16',
	'file':'http://shop.178.com/images/photo/955f896a9188999a6d669601b15cbed31326796818.jpg',
	'title':'178�̳�',
	'url':'http://shop.178.com/',
	'date':'all',
	'rate':50,
	'width':'190',
	'height':'400',
	'nolog':1,
	'type':''
});

ngaAds.bbs_ads16_gen=function(){
if (this.ckurl('/thread.php')){
	if (this.bbs_ads24)
		this.bbs_ads16=this.bbs_ads24
	if (this.bbs_ads16)
		var ad = ngaAds.genAds(this.bbs_ads16)
	}
if (this.bbs_ads22 && this.ckurl('/read.php'))
	var ad = ngaAds.genAds(this.bbs_ads22)
if (ad){
	document.write ("<td class='adsc5'>"+ad+'</td>')
	}
}

/*�ɱ�ͨ����λ��ͬͨ�����A			bbs_ads23*/

// self
ngaAds.push({
	'id':'bbs_ads23',
	'file':__IMG_BASE+'/misc/self/20090620.jpg',
	'filebig':__IMG_BASE+'/misc/self/20090422sc2a.jpg',
	'url':'http://zhaoji.178.com',
	'date':'',
	'rate':100,
	'nolog':1,
	'type':''
});

function bbs_ads23_chk()
{
if (cookieFuncs.ifMiscCookie() && ngaAds['bbs_ads23']['filebig'])
	{
	var y =parseInt(cookieFuncs.getMiscCookie('pv_count_for_bbs_ads23'));
	if ((!y && y!=0) || y>3)
		{
		if (!y) y=0;
		ngaAds['bbs_ads23']['file'] = ngaAds['bbs_ads23']['filebig'];
		var x=cookieFuncs.getMiscCookie("bbs_ads23_views");
		if (x && x<3) x = parseInt(x)+1;
		else x=1;
		cookieFuncs.setMiscCookieInSecond("bbs_ads23_views",x,3600*24*1);
		y = 0-parseInt(x)*45;
		}
	cookieFuncs.setMiscCookieInSecond('pv_count_for_bbs_ads23',y+1,3600*24*1);
	}
}


/*�����������Aȫ�� ���ȼ��ȷ����	bbs_ads24*/

/*25 ���������b*/



/*���������*/
ngaAds.loadCustomAds=function(arg)
{/*
if (arg.uid && parseInt(arg.uid,10)==3213167){
ngaAds['bbs_ads23'] = {
	'id':'bbs_ads23',
	'file': __IMG_BASE+'/misc/self/tmp090903.jpg',
	'url':'',
	'title':'',
	'width':'900',
	'height':'60',
	'date':'8/4/2009-8/30/2009',
	'rate':100,
	'nolog':1,
	'type':''
	}
}*/
}//fe

ngaAds.clear = function (){
var s = this
for (var k in s){
	if(k.match(/^bbs_ads\d+$/))
		delete s[k]
	}
}