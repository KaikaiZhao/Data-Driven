function _178NavAll_110906_765453(user,noCheckSMS){
var _n=[
	['首页','http://www.178.com/','',''],
	['新闻','http://news.178.com/','新闻中心',''],
	['产业','http://chanye.178.com/','产业',''],
	['美眉','http://mm.178.com/','',''],
	['新游戏','http://xin.178.com/','最新网游',''],
	['发号','http://ka.178.com/','发放游戏帐号',''],
	['小游戏','http://flash.178.com/','',''],
	['动漫','http://acg.178.com/','',''],
	['苹果','http://apple.178.com/','',''],
	['安卓','http://gfan.178.com/','',''],
	['暴雪商城','http://shop.178.com/','',''],
	['独家游戏','http://game.178.com/','','color:#ff0000;'],
	['论坛','http://bbs.178.com/','178论坛',''],
	['NGA','http://nga.178.com/','NGA论坛',''],
	['公会','http://gh.178.com/','',''],
	['尾巴','http://t.178.com/','记录游戏动漫人生','',1]
]

var getC=function(n){
	var x=document.cookie,a=x.indexOf(n+"=")
	if(a!=-1)
		return x.substring((a+n.length+1),x.length).split(";")[0]
	else
		return ''
	}//fe

var sS=function(s,l){
	var j = 0.0,c= '';
	for (var i=0;i<s.length;i++){
		c = s.charCodeAt(i);
		if (c > 127)
				j = j+1;
		else if ( (c<=122 && c>=97)||(c<=90 && c>=65) )
				j = j+0.65;
		else
				j = j+0.35;
		if (j>=l)
				return (s.substr(0,i+1)+'...');
		}
	return (s);
	}//fe

var aA=function(u,t,s,h,b){
	return '<a href="'+u+'" '+(t?' title="'+t+'" ':'')+(s?' style="'+s+'" ':'')+(b?' target="_blank" ':'')+'onmouseover="this.style.backgroundColor=\'#f6f6f6\'" onmouseout="this.style.backgroundColor=\'\'">'+h+'</a>'
	}
var n='',u='',c,s='text-decoration:none;font-size:13px;padding:5px 8px;line-height:22px;color:#888;',l='border-left:1px solid #fff;',r='border-right:1px solid #bbb;',p='padding:5px 4px;',aC='http://account.178.com/',m
for(var i=0;i<_n.length;i++){
	if(_n[i]){m=_n[i]
		n+=aA(m[1], m[2], s+(i==0?'':l)+r+m[3],m[0],m[4])
		}
	}
if(!user){
	c=getC("_178c")
	if(c){
		c =unescape(decodeURI(c)).split("#")
		if(c.length>0)user=c[2]
		}
	}

if(!user)
	u=aA(aC+'?to='+location.href,'',s+p,'登录')+((location.href.indexOf(aC+'?p=register')==0)? '' : aA(aC+'?p=register&to='+location.href,'',s+p,'注册'))
else
	u=aA(aC,user,s+p,sS(user,4))+'<a id="_178NavAllSMSHint" href="http://i.178.com/~sms.index.index?' + (new Date()).getTime() + '" style="font:11px sans-serif;color:#888;display:none;text-decoration:none;"></a>'+aA(aC+'q_account.php?_act=logout','',s+p,'退出')

//检查SMS 异步
if(user && !noCheckSMS){
	var x = document.createElement('script')
	x.src='http://interface.i.178.com/?_app=sms&_controller=index&_action=check_new&rtype=2'
	x.onreadystatechange = x.onload = function() {
		if (this.readyState && this.readyState != 'loaded' && this.readyState != 'complete')return;
		var x = document.getElementById("_178NavAllSMSHint"),y=window.___json___
		if(!x || !y || !y.data || !y.result || typeof(y.data.total)=='undefined')return
		var z=parseInt(y.data.total,10)
		x.innerHTML='('+(z?'<b style="color:sandybrown">'+(z<100?z:'99+')+'</b>':0)+')'
		x.title=z?'有'+z+'条未读短消息':''
		x.style.display=''
		}
	var h = document.getElementsByTagName('head')[0]
	h.insertBefore(x,h.firstChild)
	}

return '<div id="_178NavAll_110906_765453" style="background:#eee;line-height:22px;height:22px;border-bottom:1px solid #bbb;text-align:center;overflow:hidden"><nobr>'+n+'<span style="'+l+'background:url(http://cimg.178.com/www/images/global-header2.gif) no-repeat;font-family:serif;'+s+';padding-left:17px;padding-right:0px">&nbsp;</span>'+u+'</nobr></div>'
}//fe
if(!window._NotLoad178NavAll)document.write(_178NavAll_110906_765453())
