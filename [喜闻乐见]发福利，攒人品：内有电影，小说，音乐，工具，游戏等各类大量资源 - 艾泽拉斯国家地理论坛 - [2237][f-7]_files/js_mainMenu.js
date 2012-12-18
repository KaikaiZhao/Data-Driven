commonui.loadPmIconSub=function (o,r){
if (r.data.total>0){
	if(r.data.message>0 || r.data.announcement>0)
		o.style.color='coral'
	else
		o.style.color='sandybrown'
	o.title='您有新消息 消息:'+r.data.message+' 系统:'+r.data.system+' 公告:'+r.data.announcement
	}
else{
	o.style.color='gray'
	o.title='短消息'
	}
}//fe

commonui.loadPmIcon=function(o,uid){
o.onload=function(){}
var r = commonui.userCache.get('pmStatCache')
if (r)
	return this.loadPmIconSub(o,r)
httpDataGetter.script_muti_get("http://interface.i.178.com/?_app=sms&_controller=index&_action=check_new&rtype=2&uid="+uid+"&"+Math.floor(date.getTime()/100000),
	function(r){
	if (!r || !r.result)
		return false;
	else{
		commonui.userCache.set('pmStatCache',r,180)
		commonui.loadPmIconSub(o,r)
		}
	return true






	},
	function(){
	o.style.color='darkred'
	o.title=o.alt='get error'
	},
	'gbk',
	'___json___'
	)
}//fe

commonui.mainMenu = {
data:{
	0:{ subKeys:[1]},
	1:{ innerHTML:'未设置菜单项目',tagName:'span' ,color:'silver'}
},
_new:{},
o:null,
c:null,
c_:null,
dataReady:null,
oo:{},
getHintPos:null,

init:function(name,nick,icon,honor,id,start){
if(commonui.checkIfInIframe())return
if(name){
	//$('portraitcover').title = name;
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
	var x = _$("<div class='avatar' onclick='commonui.mainMenu.menuOpen(event)'><div class='bg'></div><div class='img' id='mainmenuavatar'></div><div class='cover'></div></div>")

	$('mainmenu').insertBefore(x,$('mainmenu').childNodes[0])
	_$('mainmenuavatar')._.css ('backgroundImage','url('+commonui.loadCurUserPortrait(icon)+')')

	this.loadHis()//注意顺序 显示头像后宽度有变

	this.menuExtra = _$('<div id="usernamebg">'+(honor ? ("<span class='title "+(honor.match(/[\u4e00-\u9fa5]/)?' chn_bold':'')+"'>"+(honor.length<2 ? '&quot;'+honor+'&quot;' : honor)+"</span>") : '')
		+ '<span class="name '+( name.match(/[\u4e00-\u9fa5]/)?'chn_bold':'' )+'">'+name+'</span>'
		+(id ? '<span class="id">'+(id.toString().length<2 ? '0'+id.toString() : id)+'</span>' : '')+'</div>')
	}
else
	this.loadHis()

this.checkHint()
},

genTree:function(ks,pk,pc){
if(!ks){
	if(this.dataReady)return
	ks=this.data[0].subKeys
	this.dataReady=true
	}
var x,y,i
for (i=0;i<ks.length;i++){
	x = this.data[ks[i]]
	if(pk)
		x.parent=pk
	if(pc&&!x.color)
		x.color=pc
	if (x.subKeys)
		this.genTree(x.subKeys, ks[i], x.color?x.color:null)
	}
},

next:function(id,n){//要打开的菜单项目id 点击的菜单项目所在级node

if(n.firstChild){
	var t = n.firstChild.childNodes
	for (var i=0; i<t.length; i++){
		if (t[i].className.indexOf(' select'))
			t[i].className=t[i].className.replace(' select','')
		if (t[i]._.gV('id')==id)
			t[i].className+=' select'
		}
	}

n = n._.gV('next')
if(!n)return alert('超过菜单层级限制')

var z= _$('<div/>'), keys = this.data[id].subKeys
for (var i=0;i<keys.length; i++){
	var y =  this.gen1(keys[i],n)
	if (y){
		this.oo[keys[i]]=_$('<div class="item"></div>')._.aC(y)._.sV('id',keys[i])
		z._.aC( this.oo[keys[i]] )
		}
	}

n.innerHTML=''
n._.aC( z )
n.style.display=''
for (var i=0; i<this.c.length; i++)
	this.c[i].className =''
n.className='last'
var b = n

while (b = b._.gV('next'))
	b.style.display='none'

if(this.o.style.display=='none'){
	this.o.style.display='block'
	if (window.addEventListener)
		document.body.addEventListener('click',commonui.mainMenu.bodyOnClick)
	else if(window.attachEvent)
		document.body.attachEvent('onclick',commonui.mainMenu.bodyOnClick)
	}


var x = 0
for (var i=0; i<this.c.length; i++){
	var y = this.c[i].firstChild
	if(y && y.offsetHeight>x)x=y.offsetHeight
	}
for (var i=0; i<this.c.length; i++){
	var y = this.c[i].firstChild
	if (y && y.offsetHeight<x)
		y.lastChild.style.height=(y.lastChild.offsetHeight+(x-y.offsetHeight)-1)+'px'
	}

if(this.menuExtra && this.menuExtra.style.visibility=='hidden')
	this.setNameSize()

return n
},

menuOnClick:function(e){
if (!e) var e = window.event;
e.cancelBubble = true;
if (e.stopPropagation) e.stopPropagation();
},

bodyOnClick:function(e){
commonui.mainMenu.menuClose()
},

menuClose:function(){
this.o.style.display='none'
if (window.removeEventListener)
	document.body.removeEventListener('click',this.bodyOnClick)
else if(window.detachEvent)
	document.body.detachEvent('onclick',this.bodyOnClick)
},

menuOpen:function(e,id,n){
if (!e) var e = window.event;
e.cancelBubble = true;
if (e.stopPropagation) e.stopPropagation();
if(!this.o){
	this.genTree()
	this.genMenu()
	}
if(!id){//打开根菜单时
	if(this.o.style.display=='block')
		return this.menuClose()
	id=0
	n=this.c[-1]
	}
if(!n){//指定id未指定菜单级则重建
	var t=[],p=this.data[id].parent
	while (p){
		t.unshift(p)
		p = this.data[p].parent
		}
	var n = this.next(0,this.c[-1])
	for (var i=0; i<t.length; i++)
		n = this.next(t[i],n)
	}
if(this.o.style.display=='none'){
	this.o.style.display='block'
	if (window.addEventListener)
		document.body.addEventListener('click',commonui.mainMenu.bodyOnClick)
	else if(window.attachEvent)
		document.body.attachEvent('onclick',commonui.mainMenu.bodyOnClick)
	}
return this.next(id,n)
},

genMenu:function(){

this.o=commonui.createCommmonWindow()

var s = commonui.userCache.get('startMenuHis');
if (s){
	var x = _$('<span/>')._.aC( _$('<div class="silver item">最近访问 <a href="javascript:void(0)" onclick="commonui.userCache.del(\'startMenuHis\');alert(\'记录清除 请刷新页面\')">清除</a></div>'))
	for (var i=0;i<s.length; i++){
		var y =  this.gen1(s[i])
		if (y)
			x._.aC( _$('<div class="item"></div>')._.aC(y) )
		}
	this.c_ = _$('<td/>')._.cls('recent')._.aC(x)
	}

this.c = []
this.c[-1] = _$('<span/>')
this.c[0] = _$('<td/>')
this.c[1] = _$('<td/>')._.css('display','none')
this.c[2] = _$('<td/>')._.css('display','none')
this.c[3] = _$('<td/>')._.css('display','none')

this.c[-1]._.sV('next',this.c[0])
this.c[0]._.sV('next',this.c[1])
this.c[1]._.sV('next',this.c[2])
this.c[2]._.sV('next',this.c[3])
this.c[3]._.sV('next',false)


var s = _$('<tr/>')
if(this.c_)s._.aC(this.c_)
s._.aC(this.c[0])._.aC(this.c[1])._.aC(this.c[2])._.aC(this.c[3])

this.o._.addContent(_$('<table/>')._.attr('id','startmenu')._.aC(
	_$('<tbody/>')._.aC(
		s
		)
	))
if(this.menuExtra && this.o._.addAfterContent){
	this.o._.addAfterContent( this.menuExtra )
	this.menuExtra.style.visibility = 'hidden'
	}

this.o._.css({left:'74px',top:($('mainmenu').offsetTop+38)+'px',right:'auto',position:'absolute',display:'none',width:'auto'})

if (window.addEventListener)
	this.o.addEventListener('click',this.menuOnClick)
else if(window.attachEvent)
	this.o.attachEvent('onclick',this.menuOnClick)

document.body.appendChild(this.o)

},

setNameSize:function(){

this.menuExtra.style.visibility=''
var x = this.menuExtra.childNodes
if(x[1]){
	var y = Math.max(x[0].offsetWidth,x[1].offsetWidth,x[2]?x[2].offsetWidth:0)
	for (var i=0; i<x.length; i++){
		if (x[i].offsetWidth<y){
			var z = x[i].innerHTML
			x[i].innerHTML = "<span style='letter-spacing:"+Math.floor((y-x[i].offsetWidth)/(z.length-1))+"px'>"+z.substr(0,z.length-1)+"</span>"+z.substr(z.length-1)
			}
		}
	}

},//fe

highLight:function(k){
if(this.oo[k])
	this.oo[k].insertBefore(_$('<span style="color:red;font-weight:bold">&gt;</span>'),this.oo[k].firstChild)
},//fe

checkHint:function(){
if(!this.getHintPos || !window.__NOW || !window.loader || Math.random()>0.2)return
var y=commonui.userCache.get('startMenuHintView')
if(y){
	var i=0,j=0
	for (var k in y){
		i++
		if(__NOW-y[k]>86400*30)
			delete y[k],	j++
		}
	if(j>0){
		if(i==j)
			commonui.userCache.del('startMenuHintView'),	y=null
		else
			commonui.userCache.set('startMenuHintView',y,86400*30)
		}
	}
i=[]
for (var k in this._new){
	if(this.data[k] && (__NOW-this._new[k])<86400*30 && (!y || !y[k])) i.push(k)
	}
if(i.length){
	var self=this
	window.setTimeout(function(){self.hint( i[Math.floor(Math.random()*i.length)] )},1000)
	}
},//fe

hint:function(k){
this.genTree()
var x = this.data[k]
if(!x || !x.parent || !x.innerHTML)return
var a = _$('<a href="javascript:void(0)" style="font-weight:bold">'+x.innerHTML+'</a>')._.on('click',
	function(e){
		commonui.mainMenu.menuOpen(e,this._.gV('p'))
		commonui.mainMenu.highLight(this._.gV('k'))
		var y=commonui.userCache.get('startMenuHintView')
		if(!y)y={}
		y[this._.gV('k')]=window.__NOW
		commonui.userCache.set('startMenuHintView',y,86400*30)
		}
	)._.sV('p',x.parent)._.sV('k',k)
var y=this.data[x.parent],z=''
while (y && y.innerHTML){
	z=y.innerHTML+' &raquo; '+z
	y = y.parent?this.data[y.parent]:null
	}
a.innerHTML = z+a.innerHTML
a = _$('<span>菜单更新功能 ('+(commonui.time2date(this._new[k],'y-m-d'))+')<br/></span>')._.aC(a)
x=this.getHintPos()
if(commonui.hintBubble)
	commonui.hintBubble.newArg().pos(x.x, x.y).type(x.y>100?'bl':'tl').open(a)
else
	loader.script(window.__COMMONRES_PATH+'/js_hintBubbleMin.js',function(){commonui.hintBubble.newArg().pos(x.x, x.y).type(x.y>100?'bl':'tl').open(a)})
},//fe

loadHis:function(){
var his = commonui.userCache.get('startMenuHis'),s = [];

if (this.hisAddon && his){
	var r = new RegExp(this.hisAddon.join('|'),'g') , x = his.join(',') , y=x.replace(new RegExp(this.hisAddon.join('|'),'g'),'').replace(/,+/g,',').replace(/^,|,$/g,'')
	if (x!=y){
		his = y.split(',')
		commonui.userCache.set('startMenuHis',his,86400*365);
		}
	}

if(his)
	s=__NUKE.simpleClone(his)


if (this.hisAddon){

	for(var i=0;i<this.hisAddon.length; i++)
		s.push(this.hisAddon[i])
	}

if (s.length){
	this.genTree()
	var x = _$('mainmenu'), a = _$("<a href='javascript:void(0)' class='sep'></a>")
	x._.css('paddingRight','30px');
	for (var i=0;i<s.length; i++){
		if(this.data[s[i]] && this.data[s[i]].disableDefault)continue
		var y =  this.gen1(s[i])
		if (y){
			if(y.nodeName=='A')
				y.className='rep gray txtbtnx b'
			else
				y = _$('<span/>')._.cls('rep gray txtbtnx b cell')._.aC(y)
			a = a.cloneNode(false)
			x.insertBefore( a,x.lastChild )
			x.insertBefore( y,x.lastChild )
			if(a.offsetLeft<100 || y.offsetLeft<100 || x.lastChild.offsetLeft<100){
				x.removeChild(a)
				x.removeChild(y)
				break
				}
			}
		}
	x._.css('paddingRight','0');
	}
},

gen1:function(id,p){
if(!id)return
var x = this.data[id]
if(!x)return
if (x.u && !__CURRENT_UID)
	return
if (x.check && !x.check())
	return
var y,self = this
if(x.tagName){
	y = _$('<'+x.tagName+'/>')
	if(x.options){
		for (var j=0; j<x.options.length; j++)
			y._.aC( _$('<option/>')._.attr('value',x.options[j].v,1)._.attr('innerHTML',x.options[j].k,1) )
		}
	}
else if (x.html){
	y = _$('<span/>')
	if (typeof(x.html)=='function')
		var a =  x.html()
	else
		var a = x.html
	switch (typeof(a)){
		case 'string':
			y.innerHTML = a
			break;
		case 'object':
			y._.aC(a)
		}
	}
else
	{
	y = _$('<a/>')
	if(x.href){
		y.href = x.href
		if(x.href.match(/^http:\/\//i))
			y.target='_blank'
		}
	else
		y.href='javascript:void(0)'
	}
if(x.innerHTML){
	y.innerHTML=x.innerHTML
	//if(y.target=='_blank')y.innerHTML+='<span class=arrow>&Prime;</span>'
	}
if (x.color)
	y.style.color=x.color
if(x.on)
	y._.on(x.on.event,x.on.func)
y._.sV('id',id)

if (x.subKeys){
	y._.sV('parent',p)
	if(!x.disableDefault)
		y._.on('click',function(e){commonui.mainMenu.menuOpen(e,this._.gV('id'),this._.gV('parent'))})
	if(!x.color)y._.css('color','gray')
	y.innerHTML+='<span class=arrow>&rsaquo;</span>'
	}
else{
	if(!x.disableDefault)
		y._.on('click',function(){commonui.mainMenu.click(this._.gV('id'))})
	if(x.color)y._.css('color',x.color)
	}

y.title=this.genTitle(x)
return y
},//fe

genTitle: function(o){
var t=[]
while (o){
	t.unshift(o.title ? o.title : (o.innerHTML ? o.innerHTML :''))
	if(o.parent)o=this.data[o.parent]
	else break
	}
return t.join(' - ')
},

click:function(id){
if(this.hisAddon){
	for (var i=0; i<this.hisAddon.length; i++){
		if(this.hisAddon[i]==id)
			return;
		}
	}
var s = commonui.userCache.get('startMenuHis'),ss=[]
if(!s) s=[]
for (var i=0; i<s.length; i++){
	if(typeof(s[i])=='number' && s[i]!=id)
		ss.push(s[i])
	}
ss.unshift(id)
if(ss.length>14)ss.pop()
commonui.userCache.set('startMenuHis',ss,86400*365);
}//fe
}//ce