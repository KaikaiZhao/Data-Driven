/*
========================
FOR NGACN ONLY
------------
(c) 2005 Zeg All Rights Reserved
========================
bbs.ngacn.cc 广告列表 v1.00
written by zeg 20051010
========================

bbs_ads1 论坛全页面顶部通栏 900*60
bbs_ads1x 论坛全页面顶部通栏第二个

//bbs_ads24 半擎天柱组合A全体 优先级比分设高
//bbs_ads2 半擎天柱组合A 论坛首页右上 190*400
bbs_ads8 半擎天柱组合A 论坛阅读帖子页面（看帖）第一贴右侧190*400
bbs_ads16 半擎天柱组合A 论坛帖子列表页面（版面）底部快速发帖右侧 190*400

bbs_ads17 论坛阅读帖子页面（看帖）第三贴右侧190*400

bbs_ads25 半擎天柱组合B全体 优先级比分设高
bbs_ads13 半擎天柱组合B 论坛首页左中190*400
bbs_ads21 半擎天柱组合B 论坛阅读帖子页面（看帖）第二贴右侧190*400

bbs_ads23 可变通栏，位置同通栏组合A 优先级比分设高
bbs_ads9 通栏组合A 论坛帖子列表页面（版面）中通栏 900*60
bbs_ads10 通栏组合A 论坛阅读帖子页面（看帖）第一贴下通栏 900*60
bbs_ads11 通栏组合A 论坛首页中通栏#1 900×60

bbs_ads14 通栏组合B 论坛全页面下通栏 900×60

bbs_ads12 论坛全页面中转 600*360

bbs_ads15 论坛阅读帖子页面（看帖）文字广告

bbs_ads22 论坛阅读帖子页面（看帖）底部快速发帖右侧 190*400

bbs_ads26 论坛首页右1 140*400~900
bbs_ads27 论坛首页右2 140*400~900
*/

/* 总表 */
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
/*插件区*/
fAds.push({
	'file':__IMG_BASE+'/misc/self/f/f1.jpg',
	'url':'/thread.php?fid=200'
});
/*作家*/
fAds.push({
	'file':__IMG_BASE+'/misc/self/f/f2.jpg',
	'url':'/thread.php?fid=102'
});
/*圣光*/
fAds.push({
	'file':new Array(__IMG_BASE+'/misc/self/f/f184a.jpg',__IMG_BASE+'/misc/self/f/f3.jpg'),
	'url':'/thread.php?fid=184'
});
/*魔法*/
fAds.push({
	'file':__IMG_BASE+'/misc/self/f/f4.jpg',
	'url':'/thread.php?fid=182'
});
/*猎手*/
fAds.push({
	'file':new Array(__IMG_BASE+'/misc/self/f/f187a.jpg',__IMG_BASE+'/misc/self/f/f5.jpg'),
	'url':'/thread.php?fid=187'
});
/*牧师*/
fAds.push({
	'file':__IMG_BASE+'/misc/self/f/f6.jpg',
	'url':'/thread.php?fid=183'
});
/*术士*/
fAds.push({
	'file':__IMG_BASE+'/misc/self/f/f7.jpg',
	'url':'/thread.php?fid=188'
});
/*der*/
fAds.push({
	'file':__IMG_BASE+'/misc/self/f/f8.jpg',
	'url':'/thread.php?fid=186'
});
/*地精*/
fAds.push({
	'file':__IMG_BASE+'/misc/self/f/f9.jpg',
	'url':'/thread.php?fid=191'
});
/*竞技*/
fAds.push({
	'file':__IMG_BASE+'/misc/self/f/f10.jpg',
	'url':'/thread.php?fid=272'
});
/*战士*/
fAds.push({
	'file':new Array(__IMG_BASE+'/misc/self/f/f12.jpg',__IMG_BASE+'/misc/self/f/f181a.jpg'),
	'url':'/thread.php?fid=181'
});
/*萨满*/
fAds.push({
	'file':__IMG_BASE+'/misc/self/f/f185.jpg',
	'url':'/thread.php?fid=185'
});
/*贼*/
fAds.push({
	'file':new Array(__IMG_BASE+'/misc/self/f/f189a.jpg',__IMG_BASE+'/misc/self/f/f189.jpg'),
	'url':'/thread.php?fid=189'
});
/*任务*/
fAds.push({
	'file':__IMG_BASE+'/misc/self/f/f11.jpg',
	'url':'/thread.php?fid=190'
});
var j = Math.floor(Math.random()*(fAds.length));
if (typeof(fAds[j]['file'])=='object')
	fAds[j].file = fAds[j].file[ Math.floor(Math.random()*fAds[j]['file'].length)]

/*--------------------*/



/* bbs_ads26 论坛首页右1 140*550~1100
bbs_ads27 论坛首页右2 140*550~1100 */

function bbs_ads26_27(){
if (ngaAds['bbs_ads26'])
	put(ngaAds.genAds(ngaAds['bbs_ads26']));

if (ngaAds['bbs_ads27']){
	if(ngaAds['bbs_ads26'])put("<div style='width:auto;border:none;padding:0;margin:0;float:none;height:20px;font-size:0px;line-height:0px'></div>")
	put(ngaAds.genAds(ngaAds['bbs_ads27']));
	}

}


/* 半擎天柱组合A 论坛阅读帖子页面（看帖）第一贴右侧190*400		bbs_ads8*/

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

/*半擎天柱组合B 论坛阅读帖子页面（看帖）第二贴右侧190*400  广告位ID:bbs_ads21 */

ngaAds.push({
	'id':'bbs_ads21',				/*广告位ID*/
	'file':'http://xin.178.com/s/zt/sc2.html',		/*文件 图片 或 flash 或 嵌入页面地址*/
	'url':'',			/*链接地址 如flash自带链接则不必填写*/
	'title':'178新游推荐',			/*图片说明 flash不必填写*/
	'width':'190',				/*宽度(像素数，比如190)*/
	'height':'400',				/*高度(像素数，比如400)*/
	'date':'3/17/2009-11/1/2009',	/*日期(留空不显示此条广告) 比如 2/15/2006 7/1/2006-7/31/2006 8/1/2006-8/31/2006 意为在2月15日和7月与8月显示 如填all则为一直显示*/
	'rate':25,					/*显示的几率（百分比），同一个广告位的所有当天显示的广告显示几率相加应不超过100，如超出100，则排在前面的优先（比如第一个70第二个60第三个20，实际则为第一个70第二个30第三个不显示）*/
	'nolog':1,					/*为1时不统计点击数 0时统计点击数*/
	'type':'iframe'					/*类型 如图片或flash广告留空 嵌入页面广告填iframe*/
});


/* 论坛阅读帖子页面（看帖）第三贴右侧190*400  广告位ID:bbs_ads17 */

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
	'title':'提高防范意识，保护帐号安全',
	'width':'',
	'height':'',
	'date':'all',
	'rate':2,
	'nolog':1
});

ngaAds.push({
	'id':'bbs_ads13',
	'file':__IMG_BASE+'/misc/self/20060829.jpg',
	'title':'停止购买金币，让盗号无利可图',
	'date':'all',
	'rate':4,
	'nolog':1
});

//版面
ngaAds.push({
	'file':fAds[j]['file'],
	'url':fAds[j]['url'],
	'id':'bbs_ads13',
	'date':'all',
	'rate':5,
	'nolog':1
});
*/

/*论坛全页面上通栏 900×60		bbs_ads1*/

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

/*第二个论坛全页面上通栏 900×60		bbs_ads1x

ngaAds.push({
	'id':'bbs_ads1x',
	'file':'http://uencn.com/res/sc90060.gif',
	'url':'http://uencn.com',
	'width':'900',
	'height':'60',
	'date':'',
	'rate':70,
});

/*论坛通栏组合A 论坛帖子列表页面（版面）中通栏 900*60		bbs_ads9 */

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


/*通栏组合A 论坛阅读帖子页面（看帖）第一贴下通栏 900*60		bbs_ads10 */

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


/*通栏组合B 论坛全页面下通栏 900×60	bbs_ads14*/

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

/*论坛全页面中转			bbs_ads12*/

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

/*阅读帖子页面底部快速发帖右侧 190*400 bbs_ads22*/

ngaAds.push({
	'id':'bbs_ads22',
	'file':'http://shop.178.com/images/photo/955f896a9188999a6d669601b15cbed31326796818.jpg',
	'title':'178商城',
	'url':'http://shop.178.com/',
	'date':'all',
	'rate':50,
	'width':'190',
	'height':'400',
	'nolog':1,
	'type':''
});

/*半擎天柱组合A 论坛帖子列表页面（版面）底部快速发帖右侧 190*400 bbs_ads16*/

ngaAds.push({
	'id':'bbs_ads16',
	'file':'http://shop.178.com/images/photo/955f896a9188999a6d669601b15cbed31326796818.jpg',
	'title':'178商城',
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

/*可变通栏，位置同通栏组合A			bbs_ads23*/

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


/*半擎天柱组合A全体 优先级比分设高	bbs_ads24*/

/*25 擎天柱组合b*/



/*特殊广告加载*/
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