<!--
/*
========================
FOR NGACN ONLY
------------
(c) 2005 Zeg All Rights Reserved
========================
论坛通用函数 v1.00
written by zeg 2006-4-27
========================
*/

commonui.UAInit()
//--------------------------
//cookieAndSerialize
cookieFuncs.init(__CKDOMAIN,'/','bbsmisccookies')
//--------------------------
//date
var date = new Date;
//--------------------------
//内嵌窗口阅读
commonui.loadNotiScript=function(f){loader.script(__SCRIPTS.notification,f)}
commonui.checkIfInIframe =function(){return commonui.checkIfInIframe.check};

//--------------------------
//if iframe read
(function (){
var r=parseInt(cookieFuncs.getMiscCookie('iframeread'),10);
if (!r)r=0;
var x= window.location.href.toLowerCase()
var z= __BBSURL.toLowerCase()
if (r && (x.indexOf(z+'/thread.php')==0 || x.indexOf(z+'/read.php')==0 || x.indexOf(z+'/index.php?user')==0)){//检查是否需要加载
	loader.script( __COMMONRES_PATH+'/js_iframe_read.js?120405' , function(){commonui.aE(window,'DOMContentLoaded',function(){sameWindowOpen.init($('m_threads'))});} )
	if (window.parent!=window.self){//检查是否是一个内嵌
		var tmp = '';
		try{tmp = window.parent.location.href.replace('http','http');}
		catch (e){}//script must run after document.body init
		commonui.checkIfInIframe.check = (tmp && tmp.toLowerCase().indexOf(__BBSURL.toLowerCase())==0) ? true : false
		}
	}
})();//fe

//--------------------------
//if small screen

(function(){
var w=window.outerWidth,m
if(window.__LITE && __LITE.embed){
	m = window.navigator.userAgent.match(/size(\d+)\*(\d+)/)
	if(m)
		w=m[1]
	else if(window.location.hash){
		m = window.location.hash.match(/size=(\d+)_(\d+)/)
		if(m)
			w=m[1]
		}
	}
if (w>0 && w<=1000){
	window.__SMALL_SCREEN=true
	if (w>=700)w=700
	else if(w>=625)w=625
	else
		window.__VERY_SMALL_SCREEN=true, w =525
	var s = _$('</style>')._.attr('type','text/css') , r = document.createTextNode('body , #minWidthSpacer {width:'+w+'px} \n #adsc1, #_178NavAll_110906_765453, #mc , #custombg {width:'+w+'px;overflow:hidden} \n .urltip, .urltip2, .default_tip {font-size:1em}')
	if(s.styleSheet)
		s.styleSheet.cssText = r.nodeValue;
	else 
		s.appendChild(r);
	var h = document.getElementsByTagName('head')[0]
	h.appendChild(_$('</meta>')._.attr({name:'viewport',content:'width='+w}))
	h.appendChild(s)
	commonui.aE(window,'DOMContentLoaded',function(){document.body.style.width='auto'})
	}
})();//fe


//--------------------------
//ip change alert

(function(){
if(!window.__GP || !window.__GP['greater'] || !__CURRENT_UID)return
var x = cookieFuncs.getCookie('CheckLog'+__CURRENT_UID)
if (x && x.length>32){
	cookieFuncs.setCookieInSecond('CheckLog'+__CURRENT_UID,x.substr(0,32),86400*7)
	commonui.loadNotiScript(function(){commonui.notification.addMsg(2,{0:9})})
	}
})();//fe


//--------------------------
//if touch

if ('ontouchstart' in document.documentElement)
	window.__TOUCH=true
else
	window.__TOUCH=false
window.__TOUCHING=false

//--------------------------
//post hint
if(window.__CURRENT_FID){
	if(!window.postfunc)window.postfunc={}
	switch (parseInt(__CURRENT_FID,10)){
		case 401:
		case 404:
			postfunc.prePostHint = function(){
				loader.script( __RES_PATH+'/js_d3_item_select.js?120647',function(){postfunc.prePostHint()},'gbk')
				}
			break;
		case 318:
		case 395:
		case 396:
		case 397:
		case 398:
		case 399:
			postfunc.prePostHint = function(){
				if(parseInt(this.getItem('tid').value,10))return
				_$(this.content)._.on('keyup',function(){
					if(!this.__d3hinted){
						alert('装备估价/比较/展示 等装备交易相关讨论请于 装备询价区 发布，否则可能被禁言')
						this.__d3hinted = true
						}
					})
				}
			break;
		}
	}
	
//--------------------------
//do sth from hash
commonui.aE(window,'DOMContentLoaded',
function(){
if(!location.hash)
	return
var m = location.hash.match(/^#do:(.+?)$/)
if(!m)return
m = m[1].split('.')
switch(m[0]){
	case 'item':
		var tmp = function(){
			if(m[1]=='codeui')
				commonui.userItem.codeUi()
			else if(m[1]=='codeanduseui')
				commonui.userItem.codeUi(true)
			else if(m[1]=='list'){
				if(m[2])
					commonui.userItem.list(1,0,0,m[2])
				else
					commonui.userItem.list()
				}
			}
		if(commonui.userItem)
			tmp()
		else
			loader.script('/nuke/temp.js',function(){tmp()} )
		break;
	}
}//fe
);

//--------------------------
//全屏中专广告
//--------------------------

(function(){

if(!ngaAds || !ngaAds['bbs_ads12'])
	return

if(location.pathname!='/' && location.pathname!='/thread.php' && location.pathname!='/read.php')
	return

if (ngaAds['bbs_ads12']['refreshid'] && cookieFuncs.getMiscCookie('insad_refreshid')!=ngaAds['bbs_ads12']['refreshid'])
	cookieFuncs.setMiscCookieInSecond('insad_refreshid',ngaAds['bbs_ads12']['refreshid'],3600*24*7)

var v = __NUKE.toInt(cookieFuncs.getMiscCookie('insad_views')), c = cookieFuncs.getMiscCookie('pv_count_for_insad')
if(c===null){
	var d = new Date
	d = (24-d.getHours())*3600 + (60-d.getMinutes())*60 + d.getSeconds()
	cookieFuncs.setMiscCookieInSecond('pv_count_for_insad',0,d)
	cookieFuncs.setMiscCookieInSecond('insad_views',0,d)
	return
	}

if(__NUKE.toInt(c)>0){
	v++
	cookieFuncs.setMiscCookieInSecond('insad_views',v)
	cookieFuncs.setMiscCookieInSecond("pv_count_for_insad",0-v*v*48)
	window.location.href = __BBSURL+'/misc/adpage_insert_2.html?'+window.location.href;
	}
})()
//fe	
	
	
	
/*
if(!window.postfunc)window.postfunc={}
postfunc.prePostHint = function (){
var x=',181,182,183,184,185,186,187,188,189,320,190,218,258,272,191,200,240,274,327,'
if (x.indexOf(','+this.form.elements.namedItem('fid').value+',')!=-1){
	if ($('postform_hint')){
		$('postform_hint').innerHTML+="<div class='page_nav'><a href='javascript:void(0)' class='start'></a><a href='http://zhidao.178.com/qlist/562' target='_blank' class='rep blue' style='text-align:center;font-weight:bold;font-size:16px'>有问题 试试 178知道</a><a href='javascript:void(0)' class='end'></a></div>"
		}
	}
}//fe
*/


function time2date(t){
return commonui.time2date(t)
}

function checkurl(url){
if (location.href.indexOf(url) > -1)
	return true;
else
	return false;
}

function checkindex(){
if (location.href.indexOf('index.php') > -1 || location.href.indexOf('.php') == -1)
	return true;
else
	return false;
}
function getScrollPos(){
var pos = Array();
if (window.innerHeight)
	{
		pos['y'] = window.pageYOffset
		pos['x'] = window.pageXOffset;
	}
else if (document.documentElement && document.documentElement.scrollTop)
	{
		pos['y'] = document.documentElement.scrollTop;
		pos['x'] = document.documentElement.scrollLeft;
	}
else if (document.body)
	{
		pos['y'] = document.body.scrollTop
		pos['x'] = document.body.scrollLeft;
	}
return pos;
}
//fe
function getClientWidth(){
if (document.documentElement && document.documentElement.clientWidth)
	return (document.documentElement.clientWidth);
else if (document.body)
	return (document.body.clientWidth);
else
	return (document.innerWidth);
}
//fe
function add_pv_count()
{
cookieFuncs.setMiscCookieInSecond('pv_count_for_insad',__NUKE.toInt(cookieFuncs.getMiscCookie('pv_count_for_insad'))+1);

if (window.location.href.indexOf('allblank')!=-1){
	var x = document.body.getElementsByTagName('A');
	for (var i=0; i<x.length; i++)
		{
		if (x[i].href.indexOf('read.php') != -1 && x[i].href.indexOf('thread.php') == -1)
			{
			x[i].target='_blank'
			}
		}
	}

if (window.location.href.indexOf('autoreload')!=-1){
	window._reloader=function(){
		var date=new Date;
		if(date.getTime()-window.userlastmove<10000) {window.setTimeout(window._reloader,60*1000);document.title='xxxx'}
		else window.location.reload()
	}
	window.setTimeout(window._reloader,60*5000);
	var tmp = function(){var date=new Date;window.userlastmove=date.getTime();document.title=window.userlastmove}
	addEvent(window,'scroll',tmp);
	addEvent(document.body,'click',tmp);
	}
}
//fe

function nextElement(obj){
var next = obj.nextSibling;
while (next && next.nodeType != 1)
	next = next.nextSibling;
return next;
}
//fe

function prevElement(obj){
var prev = obj.previousSibling;
while (prev && prev.nodeType != 1)
	prev = prev.previousSibling;
return prev;
}
//fe

function findNameInNeighbor(o,n){
o = o.parentNode;
return findNameInChild(o,n);
}
//fe

function findNameInChild(o,n){
for (var i=0; i<o.childNodes.length;i++){
	if (o.childNodes[i].getAttribute && o.childNodes[i].getAttribute('name') == n){
			return o.childNodes[i];
		}
	}
}//fe

function elmIncL3(e1,e2)
{
if (e2 == e1)
	{
		return true;
	}
if (e2.parentNode == e1)
	{
		return true;
	}
if (e2.parentNode.parentNode == e1)
	{
		return true;
	}
return false;
}
//fe

function cutstrbylen(s,l)
{
var j = 0.0;
var c= '';
for (var i=0;i<s.length;i++)
	{
		c = s.charCodeAt(i);
		if (c > 127)
			{
				j = j+1;
			}
		else if ( (c<=122 && c>=97)||(c<=90 && c>=65) )
			{
				j = j+0.65;
			}
		else
			{
				j = j+0.35;
			}
		if (j>=l)
			{
				return (s.substr(0,i+1));
			}
	}
return (s);
}
//fe
function getStyle(o,css)
{
if( document.defaultView && document.defaultView.getComputedStyle )
	{
		return document.defaultView.getComputedStyle( o, '' ).getPropertyValue(
		css.replace( /([A-Z])/g, '-$1'));
	}
else if ( o.currentStyle )
	{
		return o.currentStyle[ css ];
	}
else
	{
		false;
	}
}
//fe
function jsdebug()
{
if (typeof(cookieFuncs.cookieCache[cookieFuncs.misccookiename]) != 'object')
	cookieFuncs.extractMiscCookie();

	function d(f,c)
		{
			for (var k in c)
				{
					if (typeof(c[k])=='object')
						{
							d(f+k+'.',c[k]);
						}
					else
						{
							put(f+k+' = '+c[k]+'\n');
						}
				}
		}
if(commonui  && commonui._debug){
	put('---js debug---\n');
	d('',commonui._debug)
	}
put('---cookies---\n');
var cc = document.cookie.split(';');
for (var k in cc)
	{
		put(cc[k]+'\n');
	}
put('---misccookies---\n');
d('',cookieFuncs.cookieCache[cookieFuncs.misccookiename]);

}
//fe

function addEvent(obj,evt,fn) {
commonui.aE(obj,evt,fn)
}

function addEventDOMContentLoadedAct(){
commonui.triggerEventDOMContentLoadedAct ()
}//fe

function loadtab(o,t,f)
{
if (typeof(o)=='string'){o = document.getElementById(o);}
if (typeof(t)=='string'){t = document.getElementById(t);}
var p = o.parentNode.childNodes;
var j = k = 0;
for (var i=0; i<p.length; i++)
	{
	if (p[i].nodeType==1)
		{
		j++;
		if (p[i]==o)
			{
			k=j;
			p[i].className='active';
			}
		else
			{
			p[i].className='inactive';
			}
		}
	}
p = t.childNodes;
j = 0;
for (var i=0; i<p.length; i++)
	{
	if (p[i].nodeType==1)
		{
		j++;
		if (j==k)
			{
			p[i].style.display='';
			if (f)
				{
				f(o,p[i]);
				}
			}
		else
			{
			p[i].style.display='none';
			}
		}
	}
}

//--------------------------
//bbs code parser 预加载
var ubbcode={},bbscode
bbscode = ubbcode.bbscode=function(o,noimg,tid,pid,uid){
window.setTimeout(function(){ubbcode.bbscode(o,noimg,tid,pid,uid)},50);
}

//--------------------------
//user info & partrait load
//--------------------------
function getPortraitUrl(p)
{
return commonui.loadCurUserPortrait(p)
}
//fe
function loadCurUserInfo(name,nick,icon,honor,id)
{
$('portrait').style.backgroundColor = '#FFE';
if (nick)
	{
	if (name)
		{
		name = nick+'('+name+')'
		}
	else 
		{
		name = nick
		}
	}
if (name)
	{
		$('portraitcover').title = name;
		if (honor.substr(0,1)==' '){
			honor = honor.split(' ');
			honor[1] = parseInt(honor[1]);
			if(honor[1] && honor[1]>__NOW)
				honor = honor[2]
			else if(honor[3])
				honor=honor[3]
			else
				honor=''
			}
		$('usernamebg').innerHTML =  (honor ? ("<span class='sub"+(honor.match(/[\u4e00-\u9fa5]/)?' chn_bold':'')+"'>"+honor+" · </span>") : '')
			+(name.match(/[\u4e00-\u9fa5]/)? '<span class="chn_bold">'+name+'</span>' : name)
			+(id ? ' · '+id : '')
		window.setTimeout(function(){$('portrait').style.backgroundImage = 'url('+commonui.loadCurUserPortrait(icon)+')'},5)
	}
else 
	{
		$('usernamebg').innerHTML = '<span class="chn_bold">访客</span>';
		$('portraitcover').title = '访客';
		window.setTimeout(function(){$('portrait').style.backgroundImage = 'url('+__IMG_STYLE+'/nobody2.gif)'},5)
	}
if (ngaAds && ngaAds.loadCustomAds)ngaAds.loadCustomAds({'uid':id})
}
//fe


//--------------------------

if (!window.commonui)
	commonui = {}


commonui.put_post_rule = function()
{

}//fe

commonui.topic_key = function(fid)
{
put("\
<span name='tk'>\
	<select onclick='commonui.onloadtopic_key(this,"+fid+")'>\
		<option value='' selected='selected'>主题分类</option>\
	</select>\
</span>\
");
}//fe

commonui.forumjump = function(){
put("\
<span name='fj'>\
	<select onclick='commonui.onloadforumlist(this)'>\
		<option value='' selected='selected'>选择版面</option>\
	</select>\
</span>\
");
}

commonui.unisearchAddSelectedForum = function (){}//fe

commonui.uniSearchWindow = function (e){
this.createadminwindow()
this.adminwindow._.addContent(null)
this.adminwindow._.addTitle('搜索')
this.adminwindow._.css('width','350px')
var x=' style="display:none"'
if (window.__SELECTED_FORUM)x = ''
this.adminwindow._.addContent( "\
<span style='line-height:22px'>\
<input type='text' name='key' size='20' maxlength='50' value='' onkeydown='if(!event)event=window.event;if(event.keyCode==13)commonui.uniSearch(this.parentNode);'/><button onclick='commonui.uniSearch(this.parentNode)' type='button'>搜索</button> <button onclick='commonui.hideAdminWindow()' type='button'>关闭</button> <a href='search.php' title='搜索' class='b'>高级搜索</a><br/>\
<input type='radio' name='type' value='f' checked>以标题内容搜索主题 <span "+x+"><input type='checkbox' checked/>只搜索当前版面</span><br/>\
<input type='radio' name='type' value='forum'>以版面名或版主名搜索版面<br/>\
<input type='radio' name='type' value='username'>以用户名搜索用户<br/>\
<input type='radio' name='type' value='uid'>以用户ID搜索用户<br/>\
<input type='radio' name='type' value='db'>搜索魔兽世界数据库<br/>\
<form method='get'></form></span>\
")
tTip.showdscp(e,this.adminwindow);
}//fe

commonui.uniSearch = function (oo){
var x=oo.getElementsByTagName('input'),o=oo.getElementsByTagName('form')[0]
if (!x[0].value)
	return alert('请输入关键词')
o.innerHTML=''
y=_$('<input/>')._.attr({value:x[0].value,type:'hidden'})
if (x[6].checked){
	o.method = 'post'
	o.target = '_blank';
	o.action = 'http://db.178.com/wow/cn/search.html?name='+encodeURIComponent(y.value);
	o.target='_blank'
	}
else if (x[1].checked){
	if(window.__SELECTED_FORUM){
		if(x[2].checked)
			o.appendChild(_$('<input/>')._.attr({value:__SELECTED_FORUM.match(/-?\d+/g).join(','),name:'fid',type:'hidden'}))
		else if(__SELECTED_FORUM.indexOf('-')!=-1)//if current forum is user search all user forum
			o.appendChild(_$('<input/>')._.attr({value:'user',name:'fidgroup',type:'hidden'}))
		}

	o.target = ''
	o.action = 'thread.php?'
	y._.attr('name','key')
	}
else if (x[3].checked){
	o.target = ''
	o.action = 'forum.php?'
	y._.attr('name','key')
	}
else if (x[4].checked){
	o.target = ''
	o.method = 'post'
	o.action = 'nuke.php?func=ucp'
	y._.attr('name','username')
	o.target='_blank'
	}
else if (x[5].checked){
	o.method = 'post'
	o.action = 'nuke.php?func=ucp'
	y._.attr('name','uid')
	o.target='_blank'
	}
o.appendChild(y)
o.submit()
}//fe

commonui.added_child_forum = function (fid){
if (fid==272 || fid==258 || fid==300)
	put("<scr"+"ipt type='text/javascript' src='"+__RES_PATH+"/js_forum_272.js'></scr"+"ipt>");
}

commonui.blackscreen = function (d){
if (!id2e('blackscreendiv'))
	{
	var w = document.createElement('div');
	document.body.appendChild(w);
	w.id = 'blackscreendiv';
	w.className='blackscreendiv';
	}
if (d)
	{
	id2e('blackscreendiv').style.display='block';
	}
else
	{
	id2e('blackscreendiv').style.display='none';
	}
}


commonui.loadboardnews = function (o,t,nocache){
var self=this;
var x = findNameInChild(t,'boardnews');
if (x.innerHTML=='')
	{
	var onsucc = function(d){
		if (!d || !d.data)
			return false
		if ((__NOW-d.time)>3600*1000*2.1 && !nocache)
			return commonui.loadboardnews(o,t,1)
		d = d.data
		var y = ''
		var bg = 'b1'
		for (var k in d)
			{
			if (bg=='b1')
				bg = 'b2'
			else
				bg = 'b1'
			y+="<li class='"+bg+"'><SPAN title='"+commonui.time2date(d[k].postdate)+"'>"+commonui.time2date(d[k].lastpost)+"</SPAN><A href='http://bbs.ngacn.cc/read.php?tid="+d[k].tid+"'>"+d[k].subject+"</A></li>"
			}
		x.innerHTML='<ul>'+y+'</ul>';
		}
	var onfail = function(){x.innerHTML=='Load error ...'}
	var q = []
	if (!nocache)
		q.push('data/bbscache/load_topic_cache/mostuserrecommend_7,181,182,183,184,185,186,187,188,189,320_3.js');
	q.push('nuke.php?func=loadtopic&f=mostuserrecommend&fid=7,181,182,183,184,185,186,187,188,189,320&day=3&js=1');
	httpDataGetter.script_muti_get(q,onsucc,onfail,'gbk');
	}
}

commonui.setbg = function(o)
{
if(typeof(o)=='string')o = id2e(o);
var c = 'b1';
for (var k in o.childNodes)
	{
		if(c=='b1')c='b2';else c='b1';
		o.childNodes[k].className+=' '+c;
	}
}

commonui.posthot = function(pnum,rum){
var w = 16
if(pnum>999)w=13
else if(pnum>9999)w=10
var c = '4682B4';
if(pnum>500)c='B22222'
else if(pnum>450)c='FF8C00'
else if(pnum>400)c='ef9b00'
else if(pnum>350)c='e6c200'
else if(pnum>300)c='c7ba47'
else if(pnum>250)c='9ACD32'
else if(pnum>200)c='63a252'
else if(pnum>150)c='3CB371'
else if(pnum>100)c='20B2AA'
else if(pnum>50)c='008B8B'
put("<span style='font-weight:bold;font-size:"+w+"px;color:"+c+"' title='"+pnum+"回复 点击在新窗口打开'>"+pnum+"</span>")
}

commonui.load_user_remark = function(o,uid)
{
if (isNaN(parseInt(uid,10)))return;
httpDataGetter.script_muti_get("/nuke.php?func=getremark&uid="+uid,
	function(r){
	if (!r)
		{
		return false;
		}
	else
		{
		r = r.data;
		var y = document.createElement('span')
		for (var k in r)
			{
			y.innerHTML+='<span class="numeric">'+commonui.time2date(r[k].time,'y-m-d')+'</span> '+r[k].content+'<br/>';
			}
		//commonui.load_user_remark_cache = y;
		o.parentNode.insertBefore(y,o);
		o.parentNode.removeChild(o);
		return true
		}
	},
	function(){
	var y = document.createElement('span')
	y.innerHTML = 'get error';
	o.parentNode.insertBefore(y,o);
	o.parentNode.removeChild(o);
	},
	'gbk'
	)
}

commonui.loadScriptInOrder_loadedScript = {}
commonui.loadScriptInOrder = function(s,onready)
{
if (typeof(s)=='string') s=new Array(s);
var cur = s.shift();
if (this.loadScriptInOrder_loadedScript[cur])
	{
	if(s.length)this.loadScriptInOrder(s,onready);
	else onready();
	return;
	}
var h = document.createElement('script');
h.src = cur;
h.onload=h.onreadystatechange = function(){
	if (this.readyState && this.readyState != 'loaded' && this.readyState != 'complete')
		return;
	commonui.loadScriptInOrder_loadedScript[this.src]=1;
	if (s.length==0) onready();
	else commonui.loadScriptInOrder(s,onready);
	}
document.getElementsByTagName('head')[0].appendChild(h)
}

commonui.loadAlertInfo=function(info)
{
if(!info)return;
info = info.split(/\t|\n/);
var e = '';
var p = '';
for (var k in info){
	if(typeof(info[k])!='string')continue
	info[k] = info[k].replace(/^[\t\n ]+/,'');
	if (info[k])
		{
		if (info[k].substr(0,4).toLowerCase()=='edit')e+=info[k]+' ';
		else p+=info[k].replace(/\[([\d\.]+) ([\d\.]+) ([\d\.]+)\]/,'[$1声望 $2威望 $3G]')+' ';
		}
	}
if(e)put('<div class="silver">'+e+'</div>');
if(p)put("<table class='quote'><tr><td>评分记录 "+p+'</td></tr></table>');
}

commonui.switchDisp = function(o,d,close)
{
if (o.style.display && o.style.display=='none')
	{
	if(d)o.style.display=d
	else o.style.display=''
	if(close)
		{
		o.onmouseout=function(e){
			if (!e) var e = window.event;
			var to = (e.relatedTarget) ? e.relatedTarget : e.toElement;
			if (to && to!=this && to.parentNode!=this && to.parentNode.parentNode!=this)
				{
				this.style.display='none'
				}
			}
		}
	}
else
	o.style.display='none'
}

commonui.userLink = function(uid,txt)
{
return "<a href='nuke.php?func=ucp&uid="+uid+"' title='用户中心'>"+txt+"</a>"
//return "<span class='urltip2' style='padding:3px;margin:7px 0 0 0;display:none'><a href='http://i.178.com/?uid="+uid+"'>用户中心</a><br/><a href='nuke.php?func=ucp&uid="+uid+"'>论坛控制面板</a></span><a href='javascript:void(0)' title='用户中心' onclick='commonui.switchDisp(this.previousSibling,\"inline\",1)'>"+txt+"</a>"
}

commonui.calc_money = function (c){
c = parseInt(c,10);
if (!c || c <= 0)
	return ('');
g = Math.floor(c / 10000);
s = Math.floor(c / 100) - g * 100;
c = c - g * 10000 - s * 100;
var h = t = '';
if (g){
	t+=g+'金币 '
	h += g+"<img alt='金币' style='margin:2px 1px -2px 0px' src='"+__IMG_STYLE+"/g.gif'/>";
	}
if (s){
	t+=s+'银币 '
	if(g<100)
		h += s+"<img alt='银币' style='margin:2px 1px -2px 0px' src='"+__IMG_STYLE+"/s.gif'>";
	}
if (c){
	t+=c+'铜币 '
	if(!g)
		h += c+"<img alt='铜币' style='margin:2px 1px -2px 0px' src='"+__IMG_STYLE+"/c.gif'/>";
	}
return "<span title='"+t+"'>"+h+"</span>"
}//fe

commonui.copyTopicToSns = function(o){
o.href='http://i.178.com/?_app=cite&_controller=index&_action=newcite&type=inner_cite&url='+encodeURIComponent(window.location.href)
return true
}//fe

commonui.thread_recommend_level=function(r,v,c,topofthepage,tid)
{
if (topofthepage)return;
if(!v)v=0;
v= Math.floor(v/10)
if(v>999)w=80
else if(v>9999)w=100
else if(v>99999)w=120
else w=60
v="<div style='padding:0 0 3px 0'>热度<br/><b style='font-size:24px;font-family:Impact, Arial'>"+v+"</b></div>"
if (r) r="<div style='padding:0 0 3px 0'>推荐<br/><b style='font-size:24px;font-family:Impact, Arial'>"+r+"</b></div>";
else r='';
if (__GP['recommend_post']) r+="<div><a href='nuke.php?func=topicrecommend&tid="+tid+"' target='_blank'><img src='"+__IMG_STYLE+"/good.gif' title='推荐这个主题，版主推荐、加分、精华、标题加亮等有额外加成' alt='RE'/></a></div>";
return "<div class='rbox right' style='width:"+w+"px'>\
<b class='rtop'><b class='r1 "+c+"' style='width:auto'></b><b class='r2 "+c+"' style='width:auto'></b><b class='r3 "+c+"' style='width:auto'></b><b class='r4 "+c+"' style='width:auto'></b></b>\
<div class='content "+c+"' style='text-align:center;padding:0px 5px;width:auto'>"+v+r+"</div>\
<b class='rbottom'><b class='r4 "+c+"' style='width:auto'></b><b class='r3 "+c+"' style='width:auto'></b><b class='r2 "+c+"' style='width:auto'></b><b class='r1 "+c+"' style='width:auto'></b></b>\
</div>"
}//fe

commonui.postdisp=function(c,s,p,rmd,x)
{
//c : postcontent
//s : postsign
//p : postportrait
//x :content length
if(!x){
	x = c.innerHTML.replace(/<div.+?<\/div>/gim,'').replace(/<a.+?<\/a>/gi,'').replace(/<object.+?<\/object>/gim,'').replace(/<[^>]+>/gi,'');
	x = x.length;
	}
if (rmd && rmd<-3){
	var t=p.parentNode;
	while (t.nodeName!='TABLE')t=t.parentNode;
	rmd=Math.floor(100+rmd*10/1.5);
	t.style.opacity = '0.'+rmd;
	t.style.MozOpacity = '0.'+rmd;
	t.style.filter = 'progid:DXImageTransform.Microsoft.Alpha(opacity='+rmd+')';
	s.style.display = 'none';
	p.style.display = 'none';
	}
if (c.innerHTML && c.innerHTML.substr(0,24).indexOf('lessernuke')>-1){
	x=0;
	}
if (x<15){
	//c.className = c.className + ' minorcolor';
	if(p)
		p.style.display = 'none';
	}
if (x<30){
	if (s)
		s.style.display = 'none';
	}
if (x<100){

	}
}
//fe

commonui.bgCssSelector = {
'key':{0:2,1:1},
'p':0,
'set':function(o,pf){
	if(!pf)
		pf = ''
	pf = pf+this.key[this.p];
	if(o)
		o.className+=' '+pf
	return pf
	},
'update':function(o,pf){
	pf = this.set(o,pf)
	if(this.p==0)this.p=1
	else this.p=0
	return pf
	},
'init':function(){
	this.key = arguments
	}
}

commonui.forumFight_v2=function(f){
return
var x=',181,182,183,184,185,186,187,188,189,7,'
if(x.indexOf(','+f+',')==-1)
	return
put("<iframe style='float:right;width:400px;height:28px;border:none;overflow:hidden;margin-bottom:-28px' frameborder=0 src='http://interface.i.178.com/pages/f_"+f+".html'></iframe>")
}

commonui.forumHisOnIndex = function(){
var h = cookieFuncs.getMiscCookie('ForumViewHis')
if(!h || typeof(h[0])!='object')return
var x = '';
for (var k in h){
	x+="<div class='c' style='width:33%;background-image:url("+__IMG_STYLE+"/f/37.png)'><span class='d'></span><div class='a'><div class='b'><a href='thread.php?fid="+h[k][0]+"'>"+h[k][1]+"</a><br/><p></p></div></div></div>"
	}
put("<h2 class='catetitle'>..::最近访问过的版面::..</h2>\
<div class='module_wrap'>\
<div class='w100'>\
<div class='catenew'>\
	"+x+"\
	<div class='clear'></div>\
</div>\
<div class='clear'></div>\
</div>\
</div>")
}//fe

if(commonui.mainMenu){
commonui.mainMenu.data={
	0:{subKeys:[92,25,105,18,107,91,1,2,3,104,93,26,27,4,23]},//0为根菜单
	1:{href:'/thread.php?recommend=1',innerHTML:'精华主题',color:'#80C0C0'},
	2:{u:1,href:'/thread.php?favor=1',innerHTML:'收藏的主题',color:'#80C0C0'},
	3:{u:1,href:'/thread.php?authorid='+__CURRENT_UID,innerHTML:'我的主题',color:'#80C0C0'},

	4:{ innerHTML:'魔兽世界',subKeys:[5,7,28,39,54,61,72,83,86,87],color:'#808FBC' },
	5:{innerHTML:'魔兽世界专题站',href:"http://wow.178.com"},

	7:{ innerHTML:'工具',subKeys:[8,9,10,11,12,13,14,15,16,17,100] },
	8:{ innerHTML:'数据库（简体）',href:"http://db.178.com/wow/cn/index.html" },
	9:{ innerHTML:'数据库（繁体）',href:"http://db.178.com/wow/tw/index.html" },
	10:{ innerHTML:'大脚插件',href:"http://bigfoot.178.com/" },
	11:{ innerHTML:'天赋模拟器',href:"http://wow.178.com/talent/" },
	12:{ innerHTML:'签名生成器',href:"http://wowsig.178.com/" },
	13:{ innerHTML:'成就查询',href:"http://wow.178.com/chengjiu/" },
	14:{ innerHTML:'3D幻化试衣间',href:"http://db.178.com/wow/transmogrification/index.html" },
	15:{ innerHTML:'竞技场点数计算器',href:"http://wow.178.com/jjc/" },
	16:{ innerHTML:'WMO战斗数据分析',href:"http://wmo.178.com/" },
	17:{ innerHTML:'魔兽网络加速',href:"http://www.ofcard.com/showinfo.do?cardid=3809&amp;username=173178" },

	18:{ innerHTML:'论坛设置',subKeys:[19,20,21,22,97,101,102,103,109,110,111,112,113] },
	19:{ html:function(){return commonui.picswitch()},title:'选择显示较少的图片',disableDefault:1 },
	20:{ html:function(){return commonui.setfont()},title:'选择论坛显示字体',disableDefault:1},
	21:{ html:function(){return commonui.iframeread()},title:'是否在内嵌窗口内阅读主题',disableDefault:1},
	22:{ html:function(){return commonui.ifuserscript()},title:'是否使用用户脚本',disableDefault:1},

	23:{ innerHTML:'暗黑破坏神',subKeys:[24,98,99,106],color:'firebrick' },
	24:{innerHTML:'暗黑破坏神专题站',href:"http://d3.178.com"},

	25:{u:1,href:'/nuke.php?func=ucp&uid='+__CURRENT_UID,innerHTML:'论坛用户中心',disableDefault:1,color:'#551200'},
	26:{u:1,href:'/message.php',innerHTML:'短消息',disableDefault:1,color:'sandybrown'},
	27:{u:1,
		check:function(){
			if(commonui.userCache.get('notificationCache') || commonui.userCache.get('notificationDisabled'))
				return true
			},
		innerHTML:'提醒信息',
		on:{
			event:'click',
			func:function(){
				if(commonui.notification)commonui.notification.openIndex()
				else commonui.loadNotiScript(function(){commonui.notification.openIndex()})
				}
			},
		color:'sandybrown'
		},

	28:{ innerHTML:'职业',subKeys:[29,30,31,32,33,34,35,36,37,38] },
	29:{ innerHTML:'死亡骑士',href:"http://wow.178.com/list/dk/" },
	30:{ innerHTML:'战士',href:"http://wow.178.com/list/zs/" },
	31:{ innerHTML:'圣骑士',href:"http://wow.178.com/list/sq/" },
	32:{ innerHTML:'猎人',href:"http://wow.178.com/list/lr/" },
	33:{ innerHTML:'萨满祭司',href:"http://wow.178.com/list/sm/" },
	34:{ innerHTML:'潜行者',href:"http://wow.178.com/list/dz/" },
	35:{ innerHTML:'德鲁伊',href:"http://wow.178.com/list/dly/" },
	36:{ innerHTML:'法师',href:"http://wow.178.com/list/fs/" },
	37:{ innerHTML:'牧师',href:"http://wow.178.com/list/ms/" },
	38:{ innerHTML:'术士',href:"http://wow.178.com/list/ss/" },

	39:{ innerHTML:'技能',subKeys:[89,40,41,42,43,44,45,46,47,48,49,50,51,52,53,94] },
	40:{ innerHTML:'附魔',href:"http://wow.178.com/fumo/" },
	41:{ innerHTML:'珠宝',href:"http://wow.178.com/zhubao/" },
	42:{ innerHTML:'铭文',href:"http://wow.178.com/mingwen/" },
	43:{ innerHTML:'工程学',href:"http://wow.178.com/gongcheng/" },
	44:{ innerHTML:'锻造',href:"http://wow.178.com/duanzao/" },
	45:{ innerHTML:'制皮',href:"http://wow.178.com/zhipi/" },
	46:{ innerHTML:'裁缝',href:"http://wow.178.com/caifeng/" },
	47:{ innerHTML:'炼金',href:"http://wow.178.com/lianjin/" },
	48:{ innerHTML:'钓鱼',href:"http://wow.178.com/diaoyu/" },
	49:{ innerHTML:'烹饪',href:"http://wow.178.com/pengren/" },
	50:{ innerHTML:'采矿',href:"http://wow.178.com/caikuang/" },
	51:{ innerHTML:'草药',href:"http://wow.178.com/caoyao/" },
	52:{ innerHTML:'剥皮',href:"http://wow.178.com/bopi/" },
	53:{ innerHTML:'急救',href:"http://wow.178.com/jijiu/" },

	54:{ innerHTML:'攻略',subKeys:[55,56,57,58,59,60] },
	55:{ innerHTML:'副本',href:"http://wow.178.com/list/fuben/index.html" },
	56:{ innerHTML:'成就',href:"http://wow.178.com/list/chengjiu/index.html" },
	57:{ innerHTML:'声望',href:"http://wow.178.com/list/shengwang/index.html" },
	58:{ innerHTML:'PVP',href:"http://wow.178.com/list/pvp/index.html" },
	59:{ innerHTML:'任务',href:"http://wow.178.com/list/renwu/index.html" },
	60:{ innerHTML:'物品',href:"http://wow.178.com/list/wupin/index.html" },

	61:{ innerHTML:'图片',subKeys:[62,63,64,65,66,67,68,69,70,71] },
	62:{ innerHTML:'画匠专栏',href:"http://wow.178.com/pic/" },
	63:{ innerHTML:'NGA画窟活动',href:"http://wow.178.com/list/39465524376.html" },
	64:{ innerHTML:'NGA画窟作品集',href:"http://wow.178.com/list/18492273712.html" },
	65:{ innerHTML:'搞笑图片',href:"http://wow.178.com/list/33270107982.html" },
	66:{ innerHTML:'漫画',href:"http://wow.178.com/list/manhua/index.html" },
	67:{ innerHTML:'热门连载',href:"http://wow.178.com/list/39465028323.html" },
	68:{ innerHTML:'游戏周边',href:"http://wow.178.com/200907/t_42237847459.html" },
	69:{ innerHTML:'暴雪画廊',href:"http://wow.178.com/list/39465575675.html" },
	70:{ innerHTML:'精美壁纸',href:"http://wow.178.com/list/bizhi/index.html" },
	71:{ innerHTML:'魔兽翻唱',href:"http://wow.178.com/list/30568303503.html" },

	72:{ innerHTML:'UI插件',subKeys:[88,73,74,75,76,77,78,79,80,81,82] },
	73:{ innerHTML:'商业物品',href:"http://wowui.178.com/sort/36" },
	74:{ innerHTML:'战斗增强',href:"http://wowui.178.com/sort/29" },
	75:{ innerHTML:'聊天交流',href:"http://wowui.178.com/sort/45" },
	76:{ innerHTML:'地图',href:"http://wowui.178.com/sort/22" },
	77:{ innerHTML:'团队和副本',href:"http://wowui.178.com/sort/12" },
	78:{ innerHTML:'界面增强',href:"http://wowui.178.com/sort/18" },
	79:{ innerHTML:'任务',href:"http://wowui.178.com/sort/26" },
	80:{ innerHTML:'PvP',href:"http://wowui.178.com/sort/30" },
	81:{ innerHTML:'职业',href:"http://wowui.178.com/sort/1" },
	82:{ innerHTML:'管理与周边',href:"http://wowui.178.com/sort/35" },

	83:{ innerHTML:'公会',subKeys:[84,85] },
	84:{ innerHTML:'公会系统',href:"http://gh.178.com/" },
	85:{ innerHTML:'DKP系统',href:"http://dkp.178.com/" },


	86:{ innerHTML:'魔兽数据库',href:"http://db.178.com/wow/" },
	87:{ innerHTML:'人口普查',href:"http://db.178.com/wow/summary/" },


	88:{ innerHTML:'插件中心',href:"http://wowui.178.com" },
	89:{ innerHTML:'技能首页',href:"http://http://wow.178.com/list/syjn/" },


	90:{ innerHTML:'点击开始找到你需要的功能',tagName:'span' ,color:'silver',disableDefault:1},
	91:{href:'/search.php',innerHTML:'高级搜索',color:'gray'},
	92:{tagName:'select','options':[ {k:'版面跳转',v:0} ],on:{
			event:'click',
			func:function(){
				if(this._loaded)return
				this._loaded=true
				commonui.onloadforumlist(this);
				this.onchange=function(){window.location="/thread.php?fid="+this.options[this.selectedIndex].value}
				}
			}
		},
	93:{u:1,href:'/thread.php?fid=357',innerHTML:'收藏的版面',check:function(){if(window.__GP && __GP['rvrc'] && __GP['rvrc']>=20)return true}},
	94:{ innerHTML:'考古学',href:"http://wow.178.com/kaogu/" },
	//95:custombg
	//96:autodomain
	97:{ innerHTML:'控制台',on:{event:'click',func:function(e){commonui.console.open()} } },
	98:{innerHTML:'游戏数据库',href:"http://db.178.com/d3/"},
	99:{innerHTML:'技能模拟器',href:"http://db.178.com/d3/calculator/bar.htm"},
	100:{ innerHTML:'魔兽点卡充值',href:"http://wow.178.com/200909/47347481167.html" },
	101:{ innerHTML:'设置头像',href:"/nuke.php?func=avatar" },
	102:{ innerHTML:'设置签名',href:"/nuke.php?func=sign" },
	103:{ innerHTML:'用户脚本',href:"/nuke.php?func=user_script" },
	104:{u:1,href:'/thread.php?searchpost=1&authorid='+__CURRENT_UID,innerHTML:'我的回复',color:'#80C0C0'},
	105:{u:1,href:'http://i.178.com/?_app=index&_controller=index&_action=index&uid='+__CURRENT_UID,innerHTML:'178用户中心',color:'#551200'},
	106:{href:'http://db.178.com/d3/calculator/dps.htm',innerHTML:'DPS计算器'},
	107:{ innerHTML:'物品/道具',color:'gray',check:function(){
			if(window.__CURRENT_UID)
				return true
			},on:{event:'click',func:function(e){
		if(commonui.userItem)
			commonui.userItem.open()
		else
			loader.script('/nuke/temp.js',function(){commonui.userItem.open()} )
		} } },
	//108:{u:1,check:function(){if(window.__GP['admin'])return true},innerHTML:'管理密码输入',on:{event:'click',func:function(e){commonui.adminPassInput()}}},
	109:{u:1,check:function(){if(window.__GP['admin'])return true},href:'/nuke.php?func=modifymedal',innerHTML:'论坛徽章设置'},
	110:{u:1,check:function(){if(window.__GP['admin'])return true},href:'/nuke.php?func=modifygroup',innerHTML:'用户组设置'},
	111:{u:1,check:function(){if(window.__GP['admin'])return true},href:'/nuke.php?func=modifyforum',innerHTML:'版面设置'},
	112:{u:1,check:function(){if(window.__GP['admin'])return true},href:'/nuke.php?func=modifyreputation',innerHTML:'论坛声望设置'},
	113:{u:1,check:function(){if(window.__GP['admin'])return true},href:'/nuke.php?func=listuser',innerHTML:'统计'}
	}

commonui.mainMenu.hisAddon=[100]
}//ife



//版面icon==============
commonui.forumIcon={

get : function (fid){
if(fid<0)fid=fid.toString()
if (typeof(this.icon[fid])!='undefined'){
	if(this.icon[fid])
		fid=this.icon[fid]
	}
else
	fid=this.icon[0]
return __IMG_STYLE+'/f/'+fid+'.png'
},//fe
icon:{
0:37, 320:0, 181:0, 182:0, 183:0, 184:0, 185:0, 186:0, 187:0, 188:0, 189:0, 255:10, 306:10, 336:10, 190:0, 213:0, 218:0, 258:0, 272:0, 191:0, 200:0, 240:0, 274:0, 315:0, 333:0, 327:0, 318:0, 332:0, 321:0, 7:0, '-7':354, 354:0, 310:0, 323:0, 264:0, 10:0, 335:0, 18:0, 13:0, 16:0, 12:0, 8:0, 102:0, 254:0, 355:0, 116:0, 193:0, 201:0, 230:0, 334:0, 335:0, 29:0, 387:0, 388:0, 390:0, 391:0, '-46468':0,393:0,394:0,395:0,396:0,397:0,398:0,399:0,'-152678':0,403:0,'-447601':0,'-2371813':0,411:0,412:0,414:0,311:414}

}//ce

//
commonui.menuRight = function(){

return '<a href="http://www.xunyou.com/ep/dj/" target="_blank" style="display:block;float:right;margin-bottom:-48px;width:50px;height:48px;overflow:hidden"><img src="'+__IMG_BASE+'/misc/self/proxy2.png" style="margin:0px -7px"></a>'

}



-->