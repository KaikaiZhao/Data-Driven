commonui.ifCustomBackground=function(){
if(commonui.userCache.get('customBackgroundFile'))
	return true
}

commonui.customBackgroundCheckHeight=function(o){

if(o.getBoundingClientRect && this.customBackgroundHeight){
	x = this.customBackgroundHeight-(o.getBoundingClientRect().top + __NUKE.getDocSize().sT - $('mc').getBoundingClientRect().top)
	if (x > 0){
		if(x > 45)
			return 2
		return 1
		}
	}
return 0

},//fe

commonui.customBackgroundHeight = 0

commonui.customBackground=function(u,s,l){
if(commonui.customBackground.loaded || !document.body)return
commonui.customBackground.loaded=true
var uu=commonui.userCache.get('customBackgroundFile')
if(uu){
	u=uu
	s=280
	l=2
	}
else{
	s=190
	uu=',318,394,393,395,396,397,398,399,400,'
	if(window.__SMALL_SCREEN)
		return
	if(window.__CURRENT_FID && uu.indexOf(','+__CURRENT_FID+',')!=-1)
		u = __IMGPATH +'/head/20120512a.jpg',l=2
	}
var x = $('custombg'),z=0,y=null

if (x)x.parentNode.removeChild(x)
//if(parseInt(cookieFuncs.getMiscCookie('notLoadPAndS'),10))s=130

var f = function(u,s){return "progid:DXImageTransform.Microsoft.AlphaImageLoader(src='"+__IMG_STYLE+"/"+u+"'"+(s?",sizingMethod='scale'":'')+")"}

if(window.__UA && __UA[0]==1 && __UA[1]<=6){
	if(s!=190)s=190
	var x = _$('<div/>')._.css({height:(s+1)+'px',filter:f('mask2_v2.png',1)})._.aC(
		_$('<div/>')._.css({height:(s+1)+'px',filter:f('mask1_v2.png',1)})
		)
	}
else{
	var x = _$('<div/>')._.css({height:(s+1)+'px',background:"url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAACCAYAAACZgbYnAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAABVJREFUeNpi/P//PwMTAwODGkCAAQAYLAMn19xlOwAAAABJRU5ErkJggg==)"})._.aC(     _$('<div/>')._.css({height:(s+1)+'px',background:"url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAABICAYAAAA3Qp8tAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAIGNIUk0AAHolAACAgwAA+f8AAIDpAAB1MAAA6mAAADqYAAAXb5JfxUYAAABESURBVHjalJBBDgAQDATHKv9/qS9wI6QlLpOZS5MtvTcJSAKWrfSQd/Ngb5SJI4uAGmX9Tu+KRWb7hGOW9410BQIYAwAwXQR6qaXWKwAAAABJRU5ErkJggg==) bottom left repeat-x"})    )
	}

commonui.customBackgroundHeight=s

y = _$('<div/>')._.css({height:s+'px',overflow:'hidden',background:"url('"+u+"') left center repeat"})

if(l==1){
	var l = _$('<div/>')._.css({margin:'auto auto auto 40px',width:'271px',height:'138px'})
	if(window.__UA && __UA[0]==1 && __UA[1]<=6)
		l._.css({filter:f('logoshadow5.png')})
	else
		l._.css({background:'url('+__IMG_STYLE+'/logoshadow7.png)'})
	y._.aC(
		_$('<div/>')._.css({'marginBottom':'-168px',paddingTop:'30px',textAlign:'left'})._.aC(
			l._.aC(  _$('<div/>')._.css({width:'271px',height:'138px',background:'url('+__IMG_STYLE+'/logo7.png)'})  )
			)
		)
	}
else if(l==2){
	var l = _$('<div/>')._.css({margin:'auto auto auto 70px',width:'451px',height:'57px'})
	if(window.__UA && __UA[0]==1 && __UA[1]<=6)
		l._.css({filter:f('logoshadow6.png')})
	else
		l._.css({background:'url('+__IMG_STYLE+'/logoshadow6.png)'})
	y._.aC(
		_$('<div/>')._.css({'marginBottom':'-157px',paddingTop:'100px',textAlign:'left'})._.aC(l)
		)
	}

y._.aC(x)
x = _$('<div/>')._.attr('id','custombg')._.css({height:s+'px',marginTop:z+'px',marginBottom:'-'+(s+z)+'px'})._.aC(y)

s=document.body
s.appendChild(x)
if(commonui.userCache.get('customBackgroundInvertTxt') && s.className.indexOf('invertColor')==-1)s.className+=' invertColor'
s.className+=' haveCustomBackground'
return x
}//fe

commonui.receiveBase64Data = function(base64){
if(base64.length>(1024*900))
	return alert('文件大小不能超过900k');
if(base64.length>1024*32){
	var x = _$('<div/>')
	try{
		x.style.backgroundImage = "url('"+base64+"')"
		}
	catch (e){
		return alert('IE8 不支持超过32KB数据(图片在20KB左右)\n请升级你的浏览器或选择较小的文件')
		}
	}
commonui.customBackground(base64)
commonui.userCache.set("customBackgroundFile",base64,86400*300)
}

commonui.mainMenu.data[95]={u:1,
check:function(){if ((window.File && window.FileReader && window.FileList) || (window.__UA && __UA[0]==1 && __UA[1]>=8))return true},//ie8+或支持window.FileReader
innerHTML:'设置背景(Beta)',
on:{
	event:'click',
	func:function(e){
		commonui.createadminwindow()
		var x = commonui.adminwindow
		x._.addContent(null)
		x._.addTitle('设置背景图(Beta)')
		var y = _$('<span/>')._.aC(
			_$('/span').$0('innerHTML','图片将保存在浏览器储存中<br/>可能会意外清除 请自行备份原图<br/>有效高度280像素<br/>文件大小不超过900k<br/>')
			,
			(
			(window.File && window.FileReader && window.FileList)?
				//支持window.FileReader
				_$('<input/>')._.attr('type','file')._.on('change',function(e) {
					var f = e.target.files[0];
					if(f.size>(1024*900))
						return alert('文件大小不能超过900k');
					var reader = new FileReader();
					reader.onload = function(e) {
						//commonui.customBackground(e.target.result)
						commonui.userCache.set("customBackgroundFile",e.target.result,86400*300)
						alert("设置完毕 刷新页面后生效")
						};
					reader.readAsDataURL(f);
					}
				)
				:
				//不支持window.FileReader 使用flash
				_$('<object type="application/x-shockwave-flash" align="middle" id="file2base64_111021" classid="clsid:d27cdb6e-ae6d-11cf-96b8-444553540000" codebase="http://download.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=6,0,0,0" style="width:200px;height:100px"><param name="movie" value="'+__COMMONRES_PATH+'/image2dataurl.swf?callback=commonui.receiveBase64Data"/><param name="wmode" value="transparent"><param name="allowScriptAccess" value="always" /><param name="callback" value="commonui.receiveBase64Data" /><embed wmode="transparent" src="'+__COMMONRES_PATH+'/image2dataurl.swf?callback=commonui.receiveBase64Data" width="200" height="100" allowScriptAccess="always" callback="receiveBase64Data"/></object>')
			)
			,_$('/br')
			,_$('<input/>')._.attr({type:'checkbox',checked:commonui.userCache.get('customBackgroundInvertTxt') ? true : false})._.on('change',
			function(e) {
				if(this.checked)
					commonui.userCache.set("customBackgroundInvertTxt",1,86400*300)
				else
					commonui.userCache.del("customBackgroundInvertTxt")
				alert("设置完毕 刷新页面后生效")
				}
			)
			,_$('/span').$0('innerHTML',"文字使用反色 <br/> <button onclick='commonui.userCache.del(\"customBackgroundFile\");commonui.userCache.del(\"customBackgroundInvertTxt\");alert(\"刷新页面后生效\")' type='button'>清除背景图</button> <button onclick='commonui.hideAdminWindow()' type='button'>关闭</button></span>"))
		x._.addContent(y)
		tTip.showdscp(e,x);
		}
	}
}//ve


commonui.mainMenu.data[18].subKeys.push(95)
commonui.mainMenu._new[95]=1319101708
commonui.mainMenu.getHintPos=function(){
var x=0,y=0
if($('mainmenu').firstChild.nodeName=='DIV')//头像
	x=96
else
	x=22
y=18
if(document.body.className.match(/notLoadImg|haveCustomBackground/)==null)
	y+=145
if(window.ngaAds && ngaAds['bbs_ads1'])
	y+=78
if (window._178NavAll_110906_765453)
	y+=23
return {x:x,y:y}
}//fe
