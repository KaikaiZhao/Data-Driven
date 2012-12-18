if (!__IMG_BASE)
{
var __AJAX_DOMAIN = window.location.href.toLowerCase().replace(/^http:\/\//,'').replace(/(\/|:).*/,'').replace(/^[^\.]+\.([^\.]+\.)/,'$1');
var __IMG_BASE = 'http://img.'+__AJAX_DOMAIN;
var __CKDOMAIN = '.'+__AJAX_DOMAIN;
}

/*
========================
FOR NGACN ONLY
------------
(c) 2005 Zeg All Rights Reserved
========================
db.ngacn tootip v2.10
written by zeg 20050526
========================
*/
tTip = {

showingdscp:0,
canmovedscp:1,
commtip:null,
usingcommtip:false,
isIE6:false,
body:null,
getOffset:null,

init:function(){},//fe

createcommtip:function(){
this.commtip = document.createElement('div');
this.delay_show = null;
this.ttipid = 'tootip'+Math.ceil(Math.random()*10000);
this.commtip.id = this.ttipid
this.commtip.className = 'ttip';
this.commtip.style.display = 'none';
this.commtip.innerHTML = "<table border='0' cellpadding='0' cellspacing='0' class='s7'><tr><td class='b3_tl b3s'></td><td class='b3_t'></td><td class='b3_tr b3s'></td></tr><tr><td class='b3_l'></td><td class='b3_c'><div class='s11' id='"+this.commtip.id+"content'></div></td><td class='b3_r'></td></tr><tr><td class='b3_bl b3s'></td><td class='b3_b'></td><td class='b3_br b3s'></td></tr></table>";
document.body.appendChild(this.commtip);
this.commtip.content = document.getElementById(this.commtip.id+'content');
},//fe

showdscp:function (event,dscpobj,usecommtip)
{
	if (!dscpobj)
		return
	else if (typeof(dscpobj)=='string')
		dscpobj = document.getElementById(dscpobj);

	if (usecommtip){
		if (!this.commtip)
			this.createcommtip();
			
		this.commtip.content.innerHTML = dscpobj.innerHTML;
		dscpobj = this.commtip;
		this.usingcommtip = true;
		}

	this.cruent_dscpobj = dscpobj;
	dscpobj.style.visibility='hidden';
	dscpobj.style.display = 'block';
	this.setpos(dscpobj, event);
	dscpobj.style.visibility='visible';
	this.showingdscp = 1;
	this.canmovedscp = 1;
},//fe

setpos:function (o,e)
{
if (!e)
	e = window.event;

if (e.targetTouches)
	e = e.targetTouches[0];

var e={x:e.clientX,y:e.clientY,px:e.pageX,py:e.pageY}

if (!this.body)
	this.body=(!document.compatMode || document.compatMode == 'CSS1Compat') ? document.documentElement : document.body;

if (!this.getOffset){
	if (typeof window.pageYOffset != 'undefined')
		this.getOffset = function(){ return {xf:window.pageXOffset, yf:window.pageYOffset, pw:this.body.scrollWidth, ph:this.body.scrollHeight, cw:this.body.clientWidth, ch:this.body.clientHeight} }
	else
		this.getOffset = function(){ return {xf:this.body.scrollLeft,yf:this.body.scrollTop, pw:this.body.scrollWidth, ph:this.body.scrollHeight, cw:this.body.clientWidth, ch:this.body.clientHeight} }

	//if (navigator.userAgent.indexOf('MSIE 6.0')!=-1)
	//	this.isIE6 = true;
	}
	
var p = this.getOffset()

if(p.yf && e.py==e.y){//mobile safari
	e.y-=p.yf
	e.x-=p.xf
	}

if (e.x<p.cw/2)
	e.xf = 5
else
	e.xf = -((o.offsetWidth?o.offsetWidth:0)+5)

if (e.y<p.ch/2){
	e.yf=5
	if(e.xf==5)
		e.xf=15
	}
else
	e.yf = -((o.offsetHeight?o.offsetHeight:0)+5)
	

o.style.left = (e.x + p.xf + e.xf)+'px';
o.style.top = (e.y + p.yf + e.yf)+'px';

},//fe


movedscp:function (event,dscpobj){

	if (this.showingdscp == 0  || this.canmovedscp == 0 || !dscpobj)
		return;

	if (!this.usingcommtip){
		if (typeof(dscpobj)=='string')
			dscpobj = document.getElementById(dscpobj);
		}
	else
		dscpobj = this.commtip;
		
	if (!dscpobj)
		return;
		
	this.setpos(dscpobj, event);
},//fe

hinddscp:function(event,dscpobj){this.hidedscp(event,dscpobj)},
hidedscp:function(event,dscpobj){
if (this.canmovedscp == 0 || !dscpobj)
	return;

this.showingdscp = 0;

if (!this.usingcommtip){
	if (typeof(dscpobj)=='string')
		dscpobj = document.getElementById(dscpobj);
	}
else
	dscpobj = this.commtip;
	
if (!dscpobj)
	return;

if (this.delay_show){
	window.clearTimeout(this.delay_show);
	this.delay_show = null;
	}

dscpobj.style.display = 'none';
dscpobj.style.top = 0 +'px';
dscpobj.style.left = 0 +'px';
this.usingcommtip = false;
},//fe


delay_showdscp:function(event,dscpobj,delay,usecommtip)
{
if (!dscpobj) return
else if (typeof(dscpobj)=='string') var dscpobj = document.getElementById(dscpobj);
if (usecommtip){
	if (!this.commtip)
		this.createcommtip();

	this.commtip.content.innerHTML = dscpobj.innerHTML;
	dscpobj = this.commtip;
	this.usingcommtip = true;
	}
this.setpos(dscpobj, event);
this.showingdscp = 1;
this.delay_show = window.setTimeout("tTip.delay_showdscp_act('"+dscpobj.id+"')",delay);
},//fe

delay_showdscp_act:function(dscpobj){
if (typeof(dscpobj)=='string')
	dscpobj = document.getElementById(dscpobj);
dscpobj.style.display = 'block';
},//fe

reg_key_event:function(){
var self = this;
var aE=function(obj,evt,fn) {
	if (obj.addEventListener)
		obj.addEventListener(evt,function(event){fn.call(obj,event)},false)
	else if (obj.attachEvent)
		obj.attachEvent('on'+evt,function(event){fn.call(obj,event)})
	}//fe

aE(document,'contextmenu',function(e){
	if (self.showingdscp){
		if (self.canmovedscp){
				self.canmovedscp = 0;
				return false;
			}
		else
			self.canmovedscp = 1;
		}
	else
		self.canmovedscp = 1;
	})

aE(document,'keydown',function(e){
	if (!e)e = window.event;
	if (e.keyCode == 16)
		self.canmovedscp = 0;
	})

aE(document,'keydown',function(e){
	if (!e)e = window.event;
	if (e.keyCode == 16)
		self.canmovedscp = 1;
	})

}//fe

}//ce




function showdscp(event,dscpid)
{
tTip.showdscp(event,dscpid)
}
//fe
function movedscp(event,dscpid)
{
tTip.movedscp(event,dscpid)
}
//fe
function hinddscp(event,dscpid)
{
tTip.hinddscp(event,dscpid)
}
//fe
function hidedscp(event,dscpid)
{
tTip.hinddscp(event,dscpid)
}
//fe
function delay_showdscp(event,dscpid,delay)
{
tTip.delay_showdscp(event,dscpid,delay)
}
//fe
function delay_showdscp_act(t,l,dscpid)
{
tTip.delay_showdscp_act(t,l,dscpid)
}
//fe
function dont_move_ttip(event)
{
tTip.dont_move_ttip(event)
}
//fe
function can_move_ttip(event)
{
tTip.can_move_ttip(event)
}
//fe
function reg_key_event()
{
tTip.reg_key_event()
}
//fe