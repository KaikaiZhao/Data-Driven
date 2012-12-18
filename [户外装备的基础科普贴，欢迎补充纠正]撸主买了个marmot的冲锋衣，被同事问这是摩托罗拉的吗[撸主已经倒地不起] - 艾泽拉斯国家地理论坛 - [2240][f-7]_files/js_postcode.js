if(!window.postfunc)window.postfunc={}

postfunc.init = function (title,content,form,preview,post_btn,targetFrame,formContainer,targetFrameContainer,attachList,attachForm)
{//fs
this.title = title
this.titleBak = this.title.value
this.content = content
this.contentBak = this.content.value
this._selectionStart = this._selectionEnd = this._selection = null
var self = this
this.content.onmouseup = function (){
	if(document.selection)
		self._selection = document.selection.createRange().duplicate();
	}//fe
this.content.onkeyup = function (event){
	this.focus()
	self.inputchar(event,this)
	this.focus()
	if(document.selection)
		self._selection = document.selection.createRange().duplicate();
	}//fe
this.content.onkeydown = function (event){
	self.quickpost(event)
	}//fe
this.form = form
this.form.onclick=function (event){
	var y= null
	if (self.combinSelectedForum && (y=self.combinSelectedForum())){
		self.form.style.visibility="hidden"
		var x=''
		for(var i in y)
			if(i==self.form.elements.namedItem("fid").value)
				x+="<a style='font-size:130%;font-weight:bold' href='javascript:void(0)' onclick='postfunc.form.onclick=null;postfunc.form.style.visibility=\"\";postfunc.dialog.w.style.display=\"none\"'><span class='silver'>在</span> "+y[i]+" <span class='silver'>发布主题</span></a><br/>"
			else
				x+="<a style='font-size:130%;font-weight:bold' href='/post.php?fid="+i+"'><span class='silver'>在</span> "+y[i]+" <span class='silver'>发布主题</span></a><br/>"
		self.dialog.createWindow()
		self.dialog.w._.addContent(null)
		self.dialog.w._.addContent(x)
		tTip.showdscp(event,self.dialog.w);
		return false
		}
	else
		self.form.onclick=null
	}//fe
this.preview = preview
this.post_btn = post_btn
this.post_btn.onclick = function (){
	self.post_v2()
	}//fe
this.targetFrame = targetFrame
this.formContainer = formContainer
this.targetFrameContainer = targetFrameContainer
this.attachList = attachList
this.attachForm = attachForm
this.album=null
this.albumImgCount=0
if (commonui.userCache){
	commonui.aE(this.content,'change',function(){
		if(this.value)
			commonui.userCache.set('bbsPostBackup',this.value)
		})
	commonui.aE(window,'beforeunload',function(){
		if(postfunc.content.value)
			commonui.userCache.set('bbsPostBackup',postfunc.content.value)
		})
	}
if (this.prePostHint)
	this.prePostHint();
}//fe

postfunc.addPostBackupLink=function(o){//发帖自动备份
if (domStorageFuncs && cookieFuncs && cookieFuncs.getCookie('ngaPassportUid'))
	put("<a href='javascript:void(0)' onclick='id2e(\""+o.id+"\").value+=domStorageFuncs.get(\""+domStorageFuncs.domain+'_'+cookieFuncs.getCookie('ngaPassportUid')+"_bbspostbackup\")' style='font-weight:bold'>[恢复上次输入的内容]</a>");
}//fe

postfunc.addPostBackupLink_v2=function(o){
if (commonui.userCache)
	put("<a href='javascript:void(0)' class='sep'></a><a href='javascript:void(0)' onclick='var t = commonui.userCache.get(\"bbsPostBackup\");if(t)postfunc.content.value+=t' class='rep txtbtnx silver'>恢复上次输入的内容</a>");
}//fe

postfunc.checklength = function()
{
window.alert('您的信息已经有 '+this.content.value.length+' 字节');
}

postfunc.addText = function (txt){
var o = this.content
if (o.setSelectionRange){
	var s = o.selectionStart;
	o.value = o.value.substring(0,s) + txt + o.value.substring(o.selectionEnd,o.value.length)
	s += txt.length;
	o.setSelectionRange(s,s)
	}
else{
	if (!this._selection){
		o.value+=txt
		return
		}
	this._selection.text=txt
	this._selection.collapse(true);
	this._selection.select();
	}
}//fe

postfunc.getSelectText = function()
{
if(document.selection && document.selection.createRange)
	{
	return(document.selection.createRange().text);
	}
else
	{
	return this.content.value.substring(this.content.selectionStart,this.content.selectionEnd)
	}
return '';
}
//fe


postfunc.setFocus = function()
{
this.content.focus();
}

postfunc.addTag = function(tag,value)
{
if(value) this.addText("["+tag+"="+value+"]"+this.getSelectText()+"[/"+tag+"]");
else this.addText("["+tag+"]"+this.getSelectText()+"[/"+tag+"]");
}

postfunc.pc_showsize = function(size) 
{//fs
this.addTag('size',size)
}//fe

postfunc.pc_showfont = function(font)
{
this.addTag('font',font)
}

postfunc.pc_showcolor = function(color)
{
this.addTag('color',color)
}

postfunc.copytext = function() 
{
this.content.focus();
this.content.select();
this.content.createTextRange().execCommand("Copy");
}


postfunc.addsmile = function(NewCode) 
{
this.addText(' '+NewCode+' ');
}

postfunc.stripsomebbscode = function(v)
{
v = v.replace(/\[\/?lessernuke\]/gim,'');
return v;
}
//fe

postfunc.quickpost = function(e)
{
if (!e)
	{
		e = window.event;
	}
if((e.ctrlKey && e.keyCode == 13))
	{
		this.post_v2();
	}
}
//fe

postfunc.getCursorPos = function (o){
var s,e
if(document.selection){
	this._selection = document.selection.createRange.duplicate();
	}
else{
	s = o.selectionStart
	e = o.selectionEnd
	}
this._selectionStart = s
this._selectionEnd = e
}//fe

postfunc.inputchar = function(e,o)
{
if (!e)
	{
		e = window.event;
	}
if (e.keyCode == 9)
	{
		this.addText('	');
		return false;
	}
if(document.selection)
	{
	var rng = document.selection.createRange();
	rng.moveStart("character",-1)
	var c= rng.text.charCodeAt(0)
	}
else
	{
	var c = o.value.charCodeAt(o.selectionStart-1)
	var rng = false;
	}
if (c==12304)
	{
	if (rng)
		{
		rng.text='['
		}
	else
		{
		rng = o.selectionStart
		o.value=o.value.substring(0,rng-1)+'['+o.value.substr(rng)
		o.selectionStart= o.selectionEnd = rng
		}
	}
else if (c==12305)
	{
	if (rng)
		{
		rng.text=']'
		}
	else
		{
		rng = o.selectionStart
		o.value=o.value.substring(0,rng-1)+']'+o.value.substr(rng)
		o.selectionStart= o.selectionEnd = rng
		}
	}
else if (c==65309)
	{
	if (rng)
		{
		rng.text='='
		}
	else
		{
		rng = o.selectionStart
		o.value=o.value.substring(0,rng-1)+'='+o.value.substr(rng)
		o.selectionStart= o.selectionEnd = rng
		}
	}
else if (c==12289)
	{
	if (rng)
		{
		rng.moveStart("character",-1)
		if (rng.text.charAt(0)=='[')
			{
			rng.text='[/'
			}
		}
	else
		{
		if (o.value.charAt(o.selectionStart-2)=='[')
			{
			rng = o.selectionStart
			o.value=o.value.substring(0,rng-1)+'/'+o.value.substr(rng)
			o.selectionStart= o.selectionEnd = rng
			}
		}
	}
}
//fe

postfunc.getItem=function (name){
return this.form.elements.namedItem(name)
}

postfunc.checkCnt = function()
{

if (this.title && this.title.value)
	this.title.value = this.title.value.replace(/\u3010/g,'[').replace(/\u3011/,']')
var fid=parseInt(this.getItem('fid').value,10)
var tmp = parseInt(this.getItem('force_topic_key').value,10)
if (fid && !parseInt(this.getItem('tid').value,10) && tmp && ((tmp+86400*10)>__NOW || tmp==1))
	{
	if (this.topic_key)
		{
		var x,y,z
		for (var k in this.topic_key){
			x = this.topic_key[k]
			if(x.top){
				y=1
				if(x.key.indexOf('[')==0) x=x.key
				else x='['+x.key+']'
				if (this.title.value.indexOf(x)!=-1)
					z=1
				}
			}
		if (y==1 && z!=1){
			alert('你必须从版主指定的主题分类(灰色)中选择一个或多个');
			return false;
			}
		}
	else{
		this.topic_key={}
		httpDataGetter.script_muti_get(Array('/data/bbscache/bbs_topic_key/'+fid+'.js?'+Math.floor(__NOW/3600),'/nuke.php?func=loadtopickey&fid='+fid+'&time='+Math.floor(__NOW/3600)),
			function(r){
				if (!r) return false;
				else
					{
					if ((__NOW-r.time)>3600){return false;}
					postfunc.topic_key = r.data;
					window.setTimeout(function(){postfunc.post_v2()},100)
					return true
					}
				},
			function(){},
			'gbk'
			);
		return false;
		}
	}
var tmp = parseInt(this.getItem('filter_key').value,10)
if (fid && tmp){
	if (this.filter_key){
		for(var k in this.filter_key){
			if (this.title.value.indexOf(this.filter_key[k])!=-1 || this.content.value.indexOf(this.filter_key[k])!=-1 ){
				this.getItem('filter_key').value=2
				break;
				}
			}
		}
	else{
		this.filter_key={}
		httpDataGetter.script_muti_get(Array('/data/bbscache/filter/'+fid+'.js?'+Math.floor(__NOW/3600),'/nuke.php?func=logpost&getkey&fid='+fid+'&time='+Math.floor(__NOW/3600)),
			function(r){
				if (!r) return false;
				else{
					if ((__NOW-r.time)>86500){return false;}
					postfunc.filter_key = r.data;
					window.setTimeout(function(){postfunc.post_v2()},100)
					return true
					}
				},
			function(){},
			'gbk'
			);
		return false;
		}
	}

var tmp = _$('</span>')
tmp.innerHTML = this.title.value
this.title.value = tmp.innerHTML.replace('&lt;','<').replace('&gt;','>').replace('&amp;','&')

var m = this.content.value.match(/\[@.{2,30}?\]/g)
if (m){
	var mm=[]
	for (var i=0;i<m.length;i++ )
		mm[m[i].substr(2,m[i].length-3).replace(/^\s+|\s+$/,'')]=1
	m='',i=0
	for (var k in mm){
		m+='\t'+k;
		i++;
		if(i>4)break;
		}
	if(m){
		if(!this.getItem('mention'))
			this.form.appendChild( _$('<input/>')._.attr({type:'hidden',name:'mention'}))
		this.getItem('mention').value=m.substr(1)
		}
	}


if (this.uploadedAttach){
	var all = true
	for (var i=0;i<this.uploadedAttach.length;i++){
		if (this.content.value.indexOf(this.uploadedAttach[i][0])==-1){
			all=false
			break;
			}
		}
	if (all){
		all = document.createElement('input')
		all.type='hidden'
		all.name='hide_upload'
		all.value=1
		this.form.appendChild(all)
		}
	}

var c = this.content;

if (this.getItem('action').value.match(/quote|reply/)){
	if(parseInt(this.getItem('pid').value,10)){
		if (c.value.substr(0,50).indexOf('[pid='+this.getItem('pid').value+'][b]Post by')==-1){
			this.getItem('action').value='reply'
			//this.getItem('pid').value=''
			}
		}
	}


if (this.getItem('action').value=='modify'){
	if(this.contentBak == c.value)
		this.form.appendChild( _$('<input/>')._.attr({type:'hidden',name:'content_not_modify',value:1}))
	if(this.titleBak == this.title.value)
		this.form.appendChild( _$('<input/>')._.attr({type:'hidden',name:'subject_not_modify',value:1}))
	}
	
	

var tmp = document.getElementById('attachform')
if (tmp)
	if(tmp.elements.namedItem('attachment_file1').value || (tmp.elements.namedItem('attachment_file1').files && tmp.elements.namedItem('attachment_file1').files[0]))
		if (!window.confirm('确认附件已经全部上传完毕?'))
			return false;

if(this.additional_check && !this.additional_check(this))
	return false;

if (c.value){
		if(ubbcode.postContentChk){
			c.value = ubbcode.postContentChk(c.value)
			if(c.value===false)
				return false
			}
		return true;
	}
else{
		alert('无内容');
		return false;
	}
}
//fe

postfunc.attachOnPost=function(o){
if (!o)o=document.getElementById('attachform')
var f = o.elements.namedItem('attachment_file1').value
f=encodeURIComponent(f.replace(/.+?([^\/\\]+)$/,'$1'))
o.elements.namedItem('attachment_file1_url_utf8_name').value=f
return true
}//fe

postfunc.geturl=function(t)
{
var u = '';
t = t.match(/http:[a-zA-Z0-9\?&_\-+=%;:"\'@\$\^\*\/\\~`\|\.]+/ig);
for (k in t)
	{
		if (k!='input' && k!='index' && k!='lastIndex')
			{
				u = u+t[k];
			}
	}
return (u);
}
//fe

postfunc.cancelLock=function(){
if (this.post_btn.tagName=='A')
	this.post_btn.style.className=this.post_btn.style.className.replace(' silver','')
this.post_btn.disabled=false;
}//fe

postfunc.lockPost=function(){
if (this.post_btn.tagName=='A')
	this.post_btn.style.className+=' silver'
this.post_btn.disabled=true;
}//fe

postfunc.topic_key=null

postfunc.post_v2=function()
{
if(this.post_btn.disabled)
	return false;
this.lockPost();
if (!this.checkCnt()){
	this.cancelLock();
	return false;
	}
if (this.hiddenInfo){
	var x = document.createElement('span')
	x.innerHTML = '<textarea name="hidden_content" style="display:none"></textarea>'
	this.form.appendChild(x)
	this.form.elements.namedItem('hidden_content').value = this.hiddenInfo.join('\n\n')
	}
if (this.postHint)
	this.postHint();
this.form.appendChild( _$('<input/>')._.attr({type:'hidden',name:'checkkey',value:window.__NOW+''+window.__CURRENT_UID}))
if(window.commonui.loadTopicUpdate && window.commonui.loadTopicUpdate.inited){
	this.form.target = this.targetFrame.id
	this.form.elements.namedItem('nojump').value=1
	this.formContainer.style.display='none'
	this.targetFrameContainer.style.display='block'
	}
this.form.submit();
}
//fe

postfunc.addHiddenInfo=function(txt){
if (!this.hiddenInfo)this.hiddenInfo=[]
this.hiddenInfo.push(txt)
}//fe

postfunc.switchFrameDisplay=function()
{
this.post_btn.disabled=false;
this.formContainer.style.display='block'
this.targetFrameContainer.style.display='none'
}
//fe

postfunc.post_preview=function()
{
if (this.preview.style.display=='none'){
	this.preview.style.display='block';
	this.preview.style.width='auto';
	this.preview.innerHTML = this.content.value.replace(/\n/g,'<br>')
	ubbcode.bbsCode({c:this.preview,tId:Math.floor(Math.random()*10000),pId:Math.floor(Math.random()*10000),authorId:__CURRENT_UID,rvrc:__GP['rvrc'],isLesser:__GP['lesser']})
	this.preview.innerHTML += '<div class="clear"></div>'
	}
else{
	this.preview.style.display='none';
	}
}
//fe

postfunc.listAlbum = function(o){
o.innerHTML = ''
window.tmp=undefined
httpDataGetter.script_muti_get("http://i.178.com/?&_app=album&_controller=category&_action=getAlbumInfo&random="+Math.random(),
	function(r){
		if(window.tmp)r=window.tmp
		else return false;
		if (r.error)
			{
			if(r.error=='not login')r.error = '未登录'
			o.innerHTML = r.error;
			return true
			}
		var list=''
		for (var i=0;i<r.length;i++)
			{
			if(r[i].preview)r[i].preview='<img src="'+r[i].preview+'"/>'
			list+='<a href="javascript:void(0)" onclick="postfunc.openAlbum(this.parentNode,'+r[i].id+')" style="display:block;width:136px;height:130px;overflow:hidden;text-align:center;float:left;border:1px solid #aaa;margin:3px"><div style="width:130px;height:98px;border:1px solid #000;background:#444;margin:2px auto">'+r[i].preview+'</div>'+r[i].title+' ('+r[i].count+')</a>'
			}
		if (list)
			o.innerHTML = list
		else
			o.innerHTML = '没有相册'
		return true

	},
	function(){
		o.innerHTML = '读取错误'
	},
	'gbk'
	);
}//fe

postfunc.openAlbum = function (o,id,page){
o.innerHTML = ''
if(!page)page=''
window.tmp=undefined
httpDataGetter.script_muti_get("http://i.178.com/?id="+id+"&pagesize=20&page="+page+"&_app=album&_controller=category&_action=getPicByCategory",
	function(r){
		if(window.tmp)r=window.tmp
		else return false;
		if (r.error)
			{
			if(r.error=='not login')r.error = '未登录'
			o.innerHTML = r.error;
			return true
			}
		var info = '';
		if (r.info)
			{
			if (r.info.PAGECOUNT>1)
				{
				for (var i=1;i<r.info.PAGECOUNT;i++)
					info+'<a href="javascript:void(0)" onclick="postfunc.openAlbum(this.parentNode,'+id+','+i+')">['+i+']</a>';
				}
			}
		if(info)info='<div style="clear:both">'+info+'</div>'
		var list=''
		for (var i=0;i<r.ROWS.length;i++)
			{
			if(r.ROWS[i].url)r.ROWS[i].urls='<img src="'+r.ROWS[i].thumb+'"/>'
			list+='<a title="点击插入图片代码" href="javascript:void(0)" onclick="postfunc.addText(\'[img]'+r.ROWS[i].url+'[/img]\');" style="display:block;width:136px;height:130px;overflow:hidden;text-align:center;float:left;border:1px solid #aaa;margin:3px"><div style="width:130px;height:98px;border:1px solid #000;background:#444;margin:2px auto">'+r.ROWS[i].urls+'</div>'+r.ROWS[i].title+'</a>'
			}
		if (list)
			o.innerHTML = info+list+info
		else
			o.innerHTML = '没有图片'
		return true

	},
	function(){
		o.innerHTML = '读取错误'
	},
	'gbk'
	);
}//fe


postfunc.dialogAddTag = function(hid){
if (!this.hintTable[hid])
	return
var c = window.showModalDialog("/nuke/PromptWindow.htm?domain="+__AJAX_DOMAIN,this.hintTable[hid],"dialogWidth:400px;status:no;dialogHeight:300px;resizable:0;help:0");
if (c)
	this.addText(c);
}//fe

postfunc.dialog = 
{
'createWindow' : function (id){
if (this.w)return
this.w = commonui.createCommmonWindow()
document.body.appendChild(this.w);
this.w.id = id;
this.w.style.width = 'auto';
},

'returnVal':function(o)
{
var rr = []
var r = o.getElementsByTagName('input')
for (var i=0;i<r.length;i++)
	rr[r[i].name] = r[i].value

r = o.getElementsByTagName('select')
for (var i=0;i<r.length;i++)
	rr[r[i].name] = r[i].options[r[i].selectedIndex].value

r = o.getElementsByTagName('textarea')
for (var i=0;i<r.length;i++)
	rr[r[i].name] = r[i].value

if (this.func){
	rr = this.func(rr)
	if (rr===false)
		return;
	}
return rr
},

'genDialog':function(a){
//var a = window.dialogArguments
if (typeof(a) == 'string'){
	a = {0:a}
	this.func = function (v){
		return v[0]
		}//fe
	}

var c = _$('<div/>')
for (var k in a)
	{
	if(isNaN(parseInt(k)))continue;
	if (typeof(a[k]) == 'string'){
		c._.aC( _$('<span/>')._.attr('innerHTML',a[k].replace(/(<select|<input|<textarea)/i,function($0,$1){return $1+' name="'+k+'"'}) ,1) )._.aC(_$('<br/>'))._.aC(_$('<br/>'))
		}
	else if (typeof(a[k]) == 'object')
		{
		c._.aC( _$('<b>'+a[k].hint+'</b>') )._.aC( _$('<br/>') )
		if(a[k].opts){
			var y = _$('<select/>')._.attr('name',k)
			for (var kk in a[k].opts){
				if(typeof(a[k].opts[kk])!='object')continue
				y._.aC( _$('<option/>')._.attr('innerHTML',a[k].opts[kk][0],1)._.attr('value',a[k].opts[kk][1]) )
				}
			}
		else if(a[k].cols)
			var y = _$('<textarea/>')._.attr('name',k)._.attr('cols',a[k].cols)._.attr('rows',a[k].rows)
		else
			var y = _$('<input/>')._.attr('name',k)._.attr('type','text')
		c._.aC( y )._.aC( _$('<br/>') )._.aC( _$('<br/>') )
		}
	else if (typeof(a[k]) == 'function')
		this.func = a[k]
	}
this.arg = a
return c
}//fe
}//ce

postfunc.uiAddTag = function(e,hid){
if (!this.hintTable[hid])
	return
var a,c,f
var self = this
this.dialog.createWindow('uiAddTag')
this.dialog.w.style.display='none'
this.dialog.w._.addContent(null)
c = _$('<button>  关闭  </button>')._.attr('type','button')._.on('focus',function(){this.blur()})._.on('click',function(){self.dialog.w.style.display='none'})

if(this.hintTable[hid][0]){
	f = this.dialog.genDialog(this.hintTable[hid])
	a = _$('<button>  添加  </button>')._.attr('type','button')._.on('focus',function(){this.blur()})._.on('click',function(){self.addText(self.dialog.returnVal(this.parentNode));self.dialog.w.style.display='none'})
	f = _$('<table/>')._.aC(
		_$('<tbody/>')._.aC(
			_$('<tr/>')._.aC(
				_$('<td/>')._.cls('ubbcode')._.css('verticalAlign','top')._.attr('innerHTML','<div class=quote>'+this.hintTable[hid].txt+'</div>',true)
				)._.aC(
				_$('<td/>')._.aC(f)._.css('verticalAlign','top')._.aC(a)._.aC(c)
				)
			)
		)
	}
else if(this.hintTable[hid].txt){
	f = _$('<div/>')._.cls('ubbcode')._.attr('innerHTML','<div class=quote>'+this.hintTable[hid].txt+'</div>',true)._.aC(c)
	}

this.dialog.w._.addContent(f)
tTip.showdscp(e,this.dialog.w)
}//fe

postfunc.hintTable = []//bbscode向导 参看postfunc.dialogAddTag postfunc.code_help 以及/nuke/PromptWindow.htm

postfunc.code_help=function()
{
var x,y,txt
if (ubbcode.codeHelpSpecial){
	x = []
	x=x.concat(ubbcode.codeHelpSpecial,ubbcode.codeHelpCommon);
	}
else
	x = ubbcode.codeHelpCommon

txt=''
for (var i=0;i<x.length;i++){
	if(!x[i][2])
		x[i][2]={}
	x[i][2].txt = x[i][1].replace(/\n|\r/g,'<br/>')
	txt +="<a href='javascript:void(0)' style='display:block;color:gray;float:left;border:1px solid #fff;padding:0 2px;margin:2px;align:center' onfocus='this.blur()' onclick='postfunc.uiAddTag(event,"+this.hintTable.length+")'>"+x[i][0]+"</a>";
	this.hintTable.push(x[i][2])
	}


put('<div>'+txt+'<div class="clear"></div></div><div></div>');
}

postfunc.add1Attach=function (attach,checkSum,url,isimg){

if(!this.attachList.innerHTML || this.attachList.innerHTML.length<10){
	this.attachList.innerHTML+='已有附件<br/>'
	this.uploadedAttach=[]
	}
if(isimg){
	this.attachList.innerHTML+='<span class=gray>缩略图&链接</span> <span class=orange>[img]./'+url+'.thumb.jpg[/img]</span> &nbsp; <span class=gray>全图</span> <span class=orange>[img]./'+url+'[/img]</span><br/>'
	if(!this.album)this.album=_$('<div>在有大量图片的时候可以使用相册<span class="silver">([album])</span><br/><span class="orange">[album=查看全部附件][/album]</span><br/><br/></div>')
	this.album.innerHTML=this.album.innerHTML.replace('[/album]','<br/>./'+url+'[/album]')
	this.albumImgCount++
	if(this.albumImgCount==5)
		this.attachList.parentNode.insertBefore(this.album,this.attachList)
	}
else
	this.attachList.innerHTML+='<span class=gray>文件</span> <span class=orange>[attach]./'+url+'[/attach]</span><br/>'

this.uploadedAttach.push({0:url,1:isimg})

if (!attach || !checkSum)return

this.form.elements.namedItem('attachments').value+=attach+'\t';
this.form.elements.namedItem('attachments_check').value+=checkSum+'\t';
this.attachForm.elements.namedItem('attachment_file1_dscp').value='';
var tmp = this.attachForm.elements.namedItem('attachment_file1');
var tmp2= tmp.cloneNode(false);
if(tmp2.files)delete(tmp2.files[0]);
tmp2.value='';
tmp.parentNode.replaceChild(tmp2,tmp);
	
}//fe

postfunc.addForumSelect=function (e){
var y= this.combinSelectedForum()
if (!y)return true
var x=''
for(var i in y)
	x+="<a style='font-size:130%;font-weight:bold' href='/post.php?fid="+i+"'><span class='silver'>在</span> "+y[i]+" <span class='silver'>发布主题</span></a><br/>"
this.dialog.createWindow()
this.dialog.w._.addContent(null)
this.dialog.w._.addContent(x)
tTip.showdscp(e,this.dialog.w);
return false
}//fe

postfunc.combinSelectedForum = function (){//多版面合并显示时取版面列表
if (!window.__CURRENT_FID)return false

if (window.__ALL_FORUM_INFO)
	{
	var x = __ALL_FORUM_INFO.split(',')
	var y={},z={}
	for (var i=0;i<x.length;i+=2){
		if(x[i] && x[i+1])
			y[x[i]]=x[i+1]
		}
	x=''
	if (window.__SELECTED_FORUM)//用户选择的版面
		x+= __SELECTED_FORUM+','
	if (window.__UNION_FORUM_DEFAULT)//默认选择的版面
		x+= __UNION_FORUM_DEFAULT
	if (!x)return false
	x=x.split(',')
	for (var i=0;i<x.length;i++){
		if(y[x[i]])
			z[x[i]]=y[x[i]]
		}
	for (var i in z){
		if (i!=__CURRENT_FID)
			return z
		}
	return false
	}

var x = ''
if (window.__SELECTED_FORUM)//用户选择的版面
	x+= __SELECTED_FORUM+','
if (window.__DEFAULT_SELECTED_FORUM)//默认选择的版面
	x+= __DEFAULT_SELECTED_FORUM
if (!x)return false
x=x.split(',')
var y={}
for (var i=0;i<x.length;i+=2){
	if(x[i] && x[i+1])
		y[x[i]]=x[i+1]
	}
for (var i in y){
	if (i!=__CURRENT_FID)
		return y
	}
return false
}//fe
