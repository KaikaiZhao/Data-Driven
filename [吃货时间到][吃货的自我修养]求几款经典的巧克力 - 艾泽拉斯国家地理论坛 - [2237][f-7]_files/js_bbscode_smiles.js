//�����б�
if (!window.ubbcode)var ubbcode={}
if (window.location.href.indexOf('noBBCode')!=-1)ubbcode.noBBCode = true
ubbcode.forum_id = 0;

//bbcodeת��
ubbcode.bbscode=function(o,noimg,gp_lesser,rvrc,is_signature,tid,pid,aid,callBack)
{
if(this.noBBCode)
	return
var arg = {
	c:o,
	noImg:noimg,
	tId:tid,
	pId:pid,
	authorId:aid,
	rvrc:rvrc,
	isSig:is_signature,
	callBack:callBack,
	isLesser:gp_lesser
	}
this.bbsCode(arg)
}
//fe
ubbcode.bbscode_core=function(arg)
{

var c=arg.c.innerHTML,noimg=arg.noImg,gp_lesser=arg.isLesser,rvrc=arg,rvrc,is_signature=arg.isSig,argsId=arg.argsId

c = c.replace(/pallypower\s*\.\s*net/gi,'');
c = c.replace(/sig\.ngacn\.cc/gi,'wowsig.178.com');
c = c.replace(/\.wowui\.me/gi,'');
c = c.replace(/www\.lonlife\.net/gi,'');
c = c.replace(/\.woweyes\.net/gi,'');
if (c.match(/document\.cookie/))
	httpDataGetter.script_muti_get('/nuke.php?func=count&data='+encodeURIComponent (window.location.href),function(){},function(){});
if (c.match(/[\[=&]/)==null)
	return c

var self = this

c = c.replace(/\n/g,' ');
c = this.secure_text(c)

c = c.replace(/\[code(=[^\]]+)?\]/i,'<br/><br/>[code$1]');
c = this.codeTag.parse(c)
c = c.replace(/<br\s*\/?>\s*<br\s*\/?>/i,'<br/><span style="display:none"><br/>[::������˹���ҵ��� BBS.NGACN.CC::]<br/></span><br/>');


c = c.replace(/&amp;#(\d{2,6});/g,function($0,$1){
    if($1>127)
        return  String.fromCharCode($1)
    else
        return  $0
    })
    

var customachievecount = 0
c = c.replace(/\[customachieve\](.+?)\[\/customachieve\]/gi,
function($0,$1)
	{
	if (is_signature && customachievecount)
		return $0;
	customachievecount++;
	var i = $1.match(/\[img\](.+?)\[\/img\]/i);
	var t = $1.match(/\[title\](.{1,40}?)\[\/title\]/i);
	var x = $1.match(/\[txt\](.{1,100}?)\[\/txt\]/i);
	if (!i)
		i={0:0,1:__IMG_STYLE+'/achieve_default.jpg'};
	else
		i[1]=i[1].replace(/^http:\/\/db1?\.178\.com\//i,'http://img.db.178.com/')
	if (t && x){
		return "<div style='width:512px;height:74px'>\
<div style='width:76px;height:74px;margin:0px 0px -74px 3px;background:#000 url("+i[1]+") 50% 50%'></div>\
<div style='width:512px;height:74px;background:url("+__IMG_STYLE+"/achieve_bg.png);font-size:12px;font-family:Microsoft Yahei, Verdana, Tahoma, Arial, sans-serif;text-align:center;overflow:hidden;color:#000'><div style='width:362px;margin:auto'>\
<h2 style='display:block;font-size:14px;line-height:22px;height:22px;color:#000;margin:0px 0px -23px 0px;padding:1px 1px 0px 0px'>"+t[1]+"</h2>\
<h2 style='display:block;font-size:14px;line-height:22px;height:22px;color:#fff;margin:0px 0px 5px 0px'>"+t[1]+"</h2>"+x[1]+"\
</div></div>\
</div>";
		}
	else
		return $0;
	}
);

c = c.replace(/\[(item|spell|quest|npc|achieve)(=[^\]]{1,20})?\](.{1,100}?)\[\/(item|spell|quest|npc|achieve)\]/gi,function($0,$1,$2,$3,$4){
if ($1!=$4)return $0
if($2)$2 = $2.substr(1)
return wowdb_tooltip.linkGen($1,$3,$2)
});//[db]

if(c.indexOf('armory')!=-1){

var armory_limit = 5
var armory_count = 0
if (is_signature)
	armory_limit = 1

c = c.replace(/\[url\]http:\/\/(tw|eu|us|cn)\.battle\.net\/d3\/[^\/]+\/profile\/([^\-]+-\d+)\/hero\/(\d+?)#armory\[\/url\]/gi,function($0,$1,$2,$3){
	++armory_count
	$2=decodeURIComponent($2).replace("'",'&#39;')
	var key = 'd3_'+Math.random()
	if (armory_count>armory_limit)
		return "<span><b>["+$2+" "+$3+"]</b></span><img src='about:blank' style='display:none' onerror='d3armory.get({key:\""+key+"\",host:\""+$1+"\",name:\""+$2+"\",id:"+$3+",o:this.previousSibling},-1)'/>"
	else
		return "<table style='height:104px;width:720px'><tbody><tr><td></td></tr></tbody></table><img src='about:blank' style='display:none' onerror='d3armory.get({key:\""+key+"\",host:\""+$1+"\",name:\""+$2+"\",id:"+$3+",o:this.previousSibling.firstChild.firstChild.firstChild},0)'/>"
	});
	//[diablo3]

c = c.replace(/\[(us|cn|tw|eu)armory (.{1,50}?) ([^ ]{1,50}?)\s*\]/gi,function($0,$1,$2,$3){
	++armory_count
	$2=$2.replace("'",'&#39;')
	$3=$3.replace("'",'&#39;')
	if (armory_count>armory_limit)
		return "<span><span><span><b>["+$2+" "+$3+"]</b></span></span></span><img src='about:blank' style='display:none' onerror='armory.get(\""+$2+"\",\""+$3+"\",this.previousSibling.childNodes[0].childNodes[0].childNodes[0],\""+$1.toLowerCase()+"\",-1)'/>"
	else
		return "<table style='height:104px;width:720px'><tbody><tr><td></td></tr></tbody></table><img src='about:blank' style='display:none' onerror='armory.get(\""+$2+"\",\""+$3+"\",this.previousSibling.childNodes[0].childNodes[0].childNodes[0],\""+$1.toLowerCase()+"\",0)'/>"
	});
	//[armory]

}//if


c = this.bbscode_common(c,noimg,argsId)

c = c.replace(/\[quest\](.+?)\[\/quest\]/gi,function($0,$1){return(commonui.getquest($1))});//[wiki]

c = c.replace(/\[reqpg=\d{1,2}\]/i,'');//[reqpg]

//c = c.replace(/\[qfw\](.+?)\[\/qfw\]/gi,function($0,$1){var id = 'qfw'+Math.floor(Math.random()*10000);window.setTimeout("quotefromwiki_double_get('"+id+"','"+$1+"')",500);if(document.createStyleSheet){document.createStyleSheet('/image/nga_classic/css_wiki.css');var css=''}else{var css="<style type='text/css'>@import '/image/nga_classic/css_wiki.css';</style>"}
//return(css+"<div id='"+id+"' class='qfw'></div>")});


c = c.replace(/\[wowdb\[([^\]]{2,20})\]\]/gi,function($0,$1){$1=$1.replace(/^ | $/,'');return "<span class='silver b'>[[</span><span class='urltip silver' style='font-size:11px;padding:2px;text-align:center;line-height:15px'></span><a class='b' href='javascript:void(0)' onclick='wowdb_tooltip.search(this,\""+$1+"\");'>"+$1+"</a><span class='silver b'>]]</span>"});//[db]

c = c.replace(/\[(item|spell|quest|npc|achieve)(=[^\[]{1,20})?\[([^\]]{2,20})\]\]/gi,function($0,$1,$2,$3){
if($2)$2 = $2.substr(1)
return wowdb_tooltip.linkGen($1,$3,$2)
});//[db]




c = c.replace(/\[url\](bbs|www|db|ngacn)(\..+?)\[\/url\]/gi,function($0,$1,$2){return(self.writelink("http://"+$1+$2,"http://"+$1+$2))});//[url]

c = c.replace(/\[wiki\](.+?)\[\/wiki\]/gi,function($0,$1){return(self.writelink("http://wiki.ngacn.cc/index.php?title="+encodeURI($1),$1,'NGA Encyclopedia'))});//[wiki]
c = c.replace(/\[qfw\](.+?)\[\/qfw\]/gi,function($0,$1){return(self.writelink("http://wiki.ngacn.cc/index.php?title="+encodeURI($1),$1,'NGA Encyclopedia'))});//[wiki]

c = c.replace(/\[MURtopic (\d{1,11}) ?(\d{0,11})\]/i,function($0,$1,$2)
	{
	if(!$2)$2=0;
	var id=Math.random()*1000;
	window.setTimeout(function(){commonui.loadtopic_js($('topiclist'+id),Array('data/bbscache/load_topic_cache/mostuserrecommend_'+$1+'_'+$2+'.js?'+date.getDate()+date.getHours(),'nuke.php?func=loadtopic&f=mostuserrecommend&js=1&fid='+$1+'&day='+$2+'&timeout='+3600*1.1),3600*1.1)});
	return "<div class='topiclist' id='topiclist"+id+"' name='topiclist'></div>"
	});//[MURtopic]




c = c.replace(/p_w_upload/gi,"attachment");//[img]

return c;
}
//fe

//�������ݴ��� ����󷵻�false
ubbcode.postContentChk = function (c){
c = c.replace(/\r?\n\[::������˹���ҵ��� BBS.NGACN.CC::\]\r?\n/g,'');
return c
}//fe

ubbcode.codeHelpSpecial = [
{
	0:'<b>[customachieve]</b><br/><nobr>�Զ���ɾ�</nobr>',
	1:"<b>����һ���Լ��������ݵĳɾ�</b>\n\
\n\
[customachieve]\n\
[title]�ɾ͵�����(����������)[/title]\n\
[txt]�ɾ͵�˵������(����������)[/txt]\n\
[/customachieve]\n\
\n\
[customachieve]\n\
[title]�ɾ͵�����(����������)[/title]\n\
[txt]�ɾ͵�˵������(����������)[/txt]\n\
[img]�ɾ͵�ͼ��(���Ե�ַ)[/img]\n\
[/customachieve]\n\
",
	2:{
		0:{'hint':'�ɾ͵�����(����������)'},
		1:{'hint':'�ɾ͵�˵������(����������)'},
		2:{'hint':'�ɾ͵�ͼ��(���Ե�ַ)'},
		3:function(v){
			v[0]='[title]'+v[0]+'[/title]'
			v[1]='[txt]'+v[1]+'[/txt]'
			v[2]='[img]'+v[2]+'[/img]'
			return '[customachieve]'+v.join('\n')+'[/customachieve]'
		}
	}
},
{
	0:'<b>[item]</b><br/><nobr>ħ������װ��</nobr>',
	1:"<b>����ħ�������е���Ʒ</b>\n\
\n\
	[item[��Ʒ����]]\n\
\n\
	[item=����[��Ʒ����]]\n\
\n\
	[item=��ƷID[��������]]\n\
\n\
	[item=��ƷID,����[��������]]\n\
\n\
	[item[��ƷID]]\n\
\n\
	[item=����[��ƷID]]\n\
\n\
\n\
	[item]��Ʒ����[/item]\n\
\n\
	[item=����]��Ʒ����[/item]\n\
\n\
	[item=��ƷID]��������[/item]\n\
\n\
	[item=��ƷID,����]��������[/item]\n\
\n\
	[item]��ƷID[/item]\n\
\n\
	[item=����]��ƷID[/item]\n\
\n\
����Ϊ cn/tw/en (����/̨��/����) ֮һ Ĭ��Ϊcn\n\
",
	2:{
		0:{'hint':'��Ʒ���ƻ�ID'},
		1:{'hint':'��������(���Բ���)'},
		2:{
			'hint':'����ѡ��',
			'opts':{
				0:{0:'����(����)',1:'cn'},
				1:{0:'����(̨��)',1:'tw'}
				}
			},
		3:function(v){
			if(v[0]=='')return false
			if (!isNaN(parseInt(v[0],10)))
				{
				if (v[1])
					return '[item='+v[0]+','+v[2]+'['+v[1]+']]'
				else
					return '[item='+v[2]+'['+v[0]+']]'
				}
			else
				return '[item='+v[2]+'['+v[0]+']]'
			}
		}
},
{
	0:'<b>[achieve]</b><br/><nobr>ħ������ɾ�</nobr>',
	1:"<b>����ħ�������еĳɾ�</b>\n\
\n\
	[achieve[�ɾ�����]]\n\
\n\
	[achieve=����[�ɾ�����]]\n\
\n\
	[achieve=�ɾ�ID[��������]]\n\
\n\
	[achieve=�ɾ�ID,����[��������]]\n\
\n\
	[achieve[�ɾ�ID]]\n\
\n\
	[achieve=����[�ɾ�ID]]\n\
\n\
\n\
	[achieve]�ɾ�����[/achieve]\n\
\n\
	[achieve=����]�ɾ�����[/achieve]\n\
\n\
	[achieve=�ɾ�ID]��������[/achieve]\n\
\n\
	[achieve=�ɾ�ID,����]��������[/achieve]\n\
\n\
	[achieve]�ɾ�ID[/achieve]\n\
\n\
	[achieve=����]�ɾ�ID[/achieve]\n\
\n\
����Ϊ cn/tw/en (����/̨��/����) ֮һ Ĭ��Ϊcn\n\
",
	2:{
		0:{'hint':'�ɾ����ƻ�ID'},
		1:{'hint':'��������(���Բ���)'},
		2:{
			'hint':'����ѡ��',
			'opts':{
				0:{0:'����(����)',1:'cn'},
				1:{0:'����(̨��)',1:'tw'}
				}
			},
		3:function(v){
			if(v[0]=='')return false
			if (!isNaN(parseInt(v[0],10)))
				{
				if (v[1])
					return '[achieve='+v[0]+','+v[2]+'['+v[1]+']]'
				else
					return '[achieve='+v[2]+'['+v[0]+']]'
				}
			else
				return '[achieve='+v[2]+'['+v[0]+']]'
			}
		}
},
{
	0:'<b>[spell]</b><br/><nobr>ħ�����編��</nobr>',
	1:"<b>����ħ�������еķ���</b>\n\
\n\
	[spell=����ID[��������]]\n\
\n\
	[spell=����ID,����[��������]]\n\
\n\
	[spell[����ID]]\n\
\n\
	[spell=����[����ID]]\n\
\n\
\n\
	[spell=����ID]��������[/spell]\n\
\n\
	[spell=����ID,����]��������[/spell]\n\
\n\
	[spell]����ID[/spell]\n\
\n\
	[spell=����]����ID[/spell]\n\
\n\
����Ϊ cn/tw/en (����/̨��/����) ֮һ Ĭ��Ϊcn\n\
",
	2:{
		0:{'hint':'����ID'},
		1:{'hint':'��������(���Բ���)'},
		2:{
			'hint':'����ѡ��',
			'opts':{
				0:{0:'����(����)',1:'cn'},
				1:{0:'����(̨��)',1:'tw'}
				}
			},
		3:function(v){
			if (!isNaN(parseInt(v[0],10)))
				{
				if (v[1])
					return '[spell='+v[0]+','+v[2]+'['+v[1]+']]'
				else
					return '[spell='+v[2]+'['+v[0]+']]'
				}
			else
				return false
			}
		}
},
{
	0:'<b>[wiki]</b><br/><nobr>����wiki����</nobr>',
	1:"<b>���뵽wiki.ngacn.cc����������</b>\n\
\n\
	[wiki]���±���[/wiki]\n\
"
},
{
	0:'<b>[armory]</b><br/><nobr>ħ������������Ϣ</nobr>',
	1:"<b>����ħ������armory��������Ϣ(����벻ͬ���ܰ����ض����ֵ�ID�޷���ȡ)</b>\n\
\n\
	[cnarmory �������� �����] ����cn.wowarmory.com��������Ϣ\n\
\n\
	[usarmory �������� �����] ����www.wowarmory.com��������Ϣ\n\
\n\
	[twarmory �������� �����] ����tw.wowarmory.com��������Ϣ\n\
\n\
	[euarmory �������� �����] ����eu.wowarmory.com��������Ϣ\n\
",
	2:{
		0:{'hint':'��������'},
		1:{'hint':'�����'},
		2:{
			'hint':'����ѡ��',
			'opts':{
				0:{0:'����',1:'cn'},
				1:{0:'̨��',1:'tw'},
				2:{0:'����',1:'us'},
				3:{0:'ŷ��',1:'eu'}
				}
			},
		3:function(v){
			return '['+v[2]+'armory '+v[0]+' '+v[1]+']'
		}
	}
},
{
	0:'<b>[url]</b><br/><nobr>Diablo3������Ϣ</nobr>',
	1:"<b>����Diablo3��������Ϣ</b>\n\
\n\
	[url]battle net��������Ϣҳ��ĵ�ַ��� `#armory` [/url]\n\
\n\
	����\n\
\n\
	[url]http://tw.battle.net/d3/zh/profile/Yuee-3131/hero/344816#armory[/url]\n\
"
}

];//ae


ubbcode.getForumid=function()
{
if (!this.forum_id) this.forum_id = id2e('forum_id').value
return (this.forum_id);
}
//fe
var bbscodesmiles = ubbcode.smiles;
function bbscode(id,noimg,gp_lesser,rvrc,is_signature,tid,pid,aid){
ubbcode.bbscode(id,noimg,gp_lesser,rvrc,is_signature,tid,pid,aid)
}//fe
function getForumid(){
return ubbcode.getForumid()
}//fe
function checklink(u,nocookie,tbl){
return ubbcode.checklink(u,nocookie,tbl)
}//fe
writelink = null

//----------------------------------------
//
//
//
//
//
//----------------------------------------
/*
commonui.load_post_s = function(c,noimg,gp_lesser,rvrc,is_signature){
if (!cookieFuncs.getMiscCookie('simplemode'))
	{
	 bbscode_core(c,noimg,gp_lesser,rvrc,is_signature)
	}
}
//fe

commonui.load_post_p = function(p,o){
if (!cookieFuncs.getMiscCookie('simplemode'))
	{
	w_i(p,o)
	}
}
//fe
*/

commonui.getquest = function(id)
{
document.domain = __AJAX_DOMAIN;
return("<span id='questget"+id+"'>loading...</span>")
}
//fe

//----------------------------------------
//
//
//
//
//
//----------------------------------------

wowdb_tooltip = new Object
wowdb_tooltip.tip = new Array;
wowdb_tooltip.icon_path = 'http://img.db.178.com/wow/icons/m/';
wowdb_tooltip.no_icon = wowdb_tooltip.icon_path+'inv_misc_questionmark.jpg';
wowdb_tooltip.init_tip = function()
{
if (this.tip['tip']) return;
//var style = document.createElement('link');
//style.href = 'http://db.178.com/wow/atlas/widget/4.css';
//style.rel = 'stylesheet'
//style.type = 'text/css';
//document.getElementsByTagName('HEAD')[0].appendChild(style);
this.tip = new Array;
this.tip['tip'] = document.createElement('div');
this.tip['tip'].id = 'wowdb_tooltip'
this.tip['tip'].style.position = 'absolute'
this.tip['tip'].style.display = 'none'
document.body.appendChild(this.tip['tip']);
this.tip['tip'].innerHTML = "\
<table border='0' cellpadding='0' cellspacing='0' class='wowdbtooltip'>\
<tr><td class='b3_tl b3s'></td><td class='b3_t'></td><td class='b3_tr b3s'></td><td rowspan=3 class='img'><div class='bg'><img src='"+this.no_icon+"' onerror='this.src=\""+this.no_icon+"\"'/></div></td></tr>\
<tr><td class='b3_l'></td><td class='b3_c ttipcontent s7'></td><td class='b3_r'></td></tr>\
<tr><td class='b3_bl b3s'></td><td class='b3_b'></td><td class='b3_br b3s'></td></tr>\
</table>"

this.tip['content'] = this.tip['tip'].getElementsByTagName('td')[5];
this.tip['icon'] = this.tip['tip'].getElementsByTagName('img')[0];
//this.tip['edit'] =  this.tip['tip'].getElementsByTagName('div')[2];
//this.tip['editlink'] =  this.tip['tip'].getElementsByTagName('a')[0];
}
//fe
wowdb_tooltip.clear = function()
{
this.init_tip()
tTip.hidedscp(null,this.tip['tip'])
window.clearTimeout(this.delay_getting);
this.delay_getting = null;
}
//fe

/*
wowdb_tooltip.delay_get_item = function(i,t,host)
{
var self = this
this.init_tip()
if (this.delay_getting) this.clear();
if (this.tip['content'])
	{
	this.tip['content'].innerHTML="<div class='spacer'>loading ...</div>";
	this.tip['content'].style.width='auto';
	this.tip['content'].style.display=''
	//this.tip['edit'].style.display='none'
	//this.tip['editlink'].style.display='none'
	}
this.delay_getting = window.setTimeout(function(){self.get_item(i,t,host)},1000);
}
//fe
wowdb_tooltip.get_item = function(i,t,host)
{
this.init_tip()
this.tip['content'].innerHTML="<div class='spacer'>loading ...</div>";
this.tip['content'].style.width='auto';
this.tip['icon'].style.display='none';
var self = this
//var d = new Date
if (!isNaN(parseInt(i,10)))
	i={'id':i}
if (!t)
	t = 'item'
if (!host)
	host='cn'

var tooltipstyle='class="tooltip"';

switch (host)
	{
	case 'cn':
		host = 'http://db1.178.com/wow/cn'
		break
	case 'tw':
	case 'us':
	case 'eu':
		host = 'http://db1.178.com/wow/tw'
	}

var u = new Array(host+"/a/"+t+"/"+i.id+".js");

if (t == 'item')
	if (parseInt(i.gem0Id,10) || parseInt(i.gem1Id,10) || parseInt(i.gem2Id,10))
		{
		tooltipstyle = 'id="atlasoline_iTTc"'
		var u = new Array("http://www.atlas-o-line.com/tooltip/?item="+i.id+"&enchant=0&gem="+i.gem0Id+","+i.gem1Id+","+i.gem2Id);
		}

httpDataGetter.script_muti_get(u,
	function(x){
		if (!x)
			{
			return false;
			}
		else if (x=='not exists')
			{
			//self.tip['edit'].getElementsByTagName('input')[0].value=i;
			//self.tip['editlink'].style.display='';
			self.tip['content'].innerHTML='�޴���Ŀ'
			return true
			}
		else
			{
			if (x.icon)
				{
				self.tip['icon'].src=wowdb_tooltip.icon_path+x.icon.toLowerCase()+".jpg"
				self.tip['icon'].style.display='';
				}
			//self.tip['edit'].getElementsByTagName('input')[0].value=x['0']['name'];
			self.tip['content'].innerHTML='<span '+tooltipstyle+'>'+x.tip+'<span>';
			if (self.tip['content'].offsetWidth<300)
				self.tip['content'].style.width='auto';
			else
				self.tip['content'].style.width='300px';
			window.setTimeout(function(){if (self.tip['content'].offsetWidth<300)self.tip['content'].style.width='auto';else self.tip['content'].style.width='300px';},50);
			return true
			}
		},
	function(){
		self.tip['content'].innerHTML='�޴���Ŀ'},
	'utf-8'
	)

}//fe
*/
wowdb_tooltip.search = function (o,key,type)
{
o = o.previousSibling;

if (o.innerHTML){
	o.style.display='inline';
	return;
	}

if (!hex_md5){
	var s = document.createElement( "script");
	s.src = __COMMONRES_PATH+'/js_md5.js';
	document.getElementsByTagName("head")[0].appendChild(s);
	}

if (!type)
	type='';

var c=hex_md5(encodeURIComponent(key)+type);
var u = new Array(
	"http://db.ngacn.cc/tips/cache/"+c.substr(0,2)+"/"+c.substr(2,2)+"/"+c+".js",
	"http://db.ngacn.cc/tips/index.php?key="+encodeURIComponent(key)+"&type="+type
	);
httpDataGetter.script_muti_get(u,
		function(x){
			if (!x)
				{
				return false;
				}
			var time = String(x[0]);
			time = time.split(',');
			var d = new Date;
			if (d.getTime/1000-time[0]>3600*24*10)
				{
				return false;
				}
			var i = 0;
			for (var k in x)
				{
				if (k!=0 && x[k])
					{
					if (x[k]=='+')
						{
						o.innerHTML+="<a href='http://db.ngacn.cc/s.php?lang=cn&sitems=on&squests=on&snpcs=on&sobjects=on&sachievements=on&na="+encodeURIComponent(key)+"' target='_blank'>����...</a><br/>";
						}
					else
						{
						i++;
						var t = '';
						var h = '';
						var lang = 'en'
						var name = x[k].name_en;
						var host = 'http://db.178.com/wow/cn'
						if (x[k].name_cn)
							{
							name = x[k].name_cn;
							host = 'http://db.178.com/wow/cn'
							lang = 'cn'
							}
						else if (x[k].name_tw)
							{
							name = x[k].name_tw;
							host = 'http://db.178.com/wow/tw'
							lang = 'tw'
							}
						switch (x[k].type)
							{
							case 'item':
								t = 'item';
								h = host+"/"+t+"/"+x[k].id+".html";
								break;
							case 'quest':
								t = 'quest';
								h = host+"/"+t+"/"+x[k].id+".html";
								break;
							case 'npc':
								t = 'npc';
								h = host+"/"+t+"/"+x[k].id+".html";
								break;
							case 'spell':
								t = 'spell';
								h = host+"/"+t+"/"+x[k].id+".html";
								break;
							case 'achieve':
								t = 'achievement';
								h = host+"/"+t+"/"+x[k].id+".html";
								break;
							}
						wowdb_tooltip.linkGen(x[k].type,name,x[k].id+','+lang)
						o.innerHTML+=wowdb_tooltip.linkGen(x[k].type,name,x[k].id+','+lang)+"<span style='font-size:70%' class='gray'>("+x[k].type.toUpperCase()+")</span><br/>";
						}
					}
				}
			if (!i)
				{
				o.innerHTML+="�Ҳ������ϵ���Ŀ<br/>";
				}
			d.setTime(time[0]*1000);
			o.innerHTML+="<span style='font-size:70%' class='gray'>"+d.getFullYear()+'/'+(d.getMonth()+1)+'/'+d.getDate()+' '+d.getHours()+':'+d.getMinutes ()+'</span><br/>';
			if (time[1])
				{
				o.innerHTML+="<span style='font-size:70%' class='gray'>"+time[1]+' SEC</span><br/>';
				}
			o.style.display='inline';
			o.onmouseout = function(e){
				if (!e) var e = window.event;
				var to = (e.relatedTarget) ? e.relatedTarget : e.toElement;
				if (to!=this && to.parentNode!=this && to.parentNode.parentNode!=this)
					{
					this.style.display='none'
					}
			}
			return true;
			},
		function(){
			window.alert='�Ҳ������ϵ���Ŀ';
			},
		'utf-8'
	);
}//fe

wowdb_tooltip.linkGen = function(type,name,arg)
{
var id = ''
var lang = 'cn'
var key='';
if (parseInt(name,10))
	id = name
else
	key = encodeURIComponent(name)
if(arg){
	arg = arg.split(',')
	for (var i=0;i<arg.length;i++)
		{
		if(parseInt(arg[i]))
			id = arg[i]
		else if(arg[i]=='cn'||arg[i]=='tw'||arg[i]=='us')
			lang = arg[i]
		}
	}
if (type=='achieve')
	type='achievement'
if (id)
	var href= 'http://db.178.com/wow/'+lang+'/'+type+'/'+id+'.html'
else
	var href= 'http://db.178.com/wow/s.php?search=search&lang='+lang+'&s'+type+'s=no&na='+key
return "<span class='silver b'>[</span><span class='urltip silver' style='font-size:11px;padding:2px;text-align:center;line-height:15px'></span><a class='b' href='"+href+"' onmouseover='wowdb_tooltip.delayGet_v2(this,\""+type+"\",\""+id+"\",\""+key+"\",\""+lang+"\");delay_showdscp(event,wowdb_tooltip.tip[\"tip\"],700);' onmousemove='movedscp(event,wowdb_tooltip.tip[\"tip\"])' onmouseout='wowdb_tooltip.clear()' target='_blank'>"+name+"</a><span class='silver b'>]</span>";
}

wowdb_tooltip.delayGet_v2 = function (o,type,id,key,lang,arg){
var self = this
this.init_tip()
if (this.delay_getting) this.clear();
if (this.tip['content'])
	{
	this.tip['content'].innerHTML=this.genMsg("loading ...");
	this.tip['content'].style.width='auto';
	this.tip['content'].style.display=''
	}
this.delay_getting = window.setTimeout(function(){self.get_v2(o,type,id,key,lang,arg)},1000);
}//fe

wowdb_tooltip.genMsg = function(msg){
return "<div class='spacer'>"+msg+'</div>'
}//fe

wowdb_tooltip.get_v2 = function(o,type,id,key,lang,arg)
{

var self = this
//var d = new Date
if (id)
	var href = ['http://db.178.com/wow/'+lang+'/a/'+type+'/'+id+'.js','http://db.178.com/wow/atlas/tooltip/index.php?'+type+'='+id+'&lang='+lang]
else{
	var sKey = key.replace(/%/g,'')
	var href = 'http://db.178.com/wow/atlas/tooltip/'+type+'_name/'+lang+'/'+sKey.substr(0,2)+'/'+sKey+'.js'
	}

var tooltipstyle = 'id="atlasoline_iTTc"'
if (type == 'item')
	if (id && arg && (parseInt(arg.gem0Id,10) || parseInt(arg.gem1Id,10) || parseInt(arg.gem2Id,10)))
		{
		tooltipstyle = 'id="atlasoline_iTTc"'
		var href = "http://www.atlas-o-line.com/tooltip/?item="+id+"&enchant=0&gem="+arg.gem0Id+","+arg.gem1Id+","+arg.gem2Id;
		}

this.init_tip()
this.tip['content'].innerHTML=this.genMsg("loading ...");
this.tip['content'].style.width='auto';
this.tip['icon'].style.display='none';
httpDataGetter.script_muti_get(href,
	function(x){
		if (!x)
			return false
		else if (x=='not exists' || (typeof(x.icon)=='number' && x.icon==0))
			{
			self.tip['content'].innerHTML=self.genMsg('�޴���Ŀ')
			return false
			}
		else
			{
			if (x.icon)
				{
				self.tip['icon'].src=wowdb_tooltip.icon_path+x.icon.toLowerCase()+".jpg"
				self.tip['icon'].style.display='';
				}
			self.tip['content'].innerHTML='<span '+tooltipstyle+'>'+x.tip+'<span>';
			if (self.tip['content'].offsetWidth<300)
				self.tip['content'].style.width='auto';
			else
				self.tip['content'].style.width='300px';
			window.setTimeout(function(){if (self.tip['content'].offsetWidth<300)self.tip['content'].style.width='auto';else self.tip['content'].style.width='300px';},50);
			return true
			}
		},
	function(){
		if (!parseInt(key,10)){
			self.tip['content'].innerHTML=self.genMsg('�޴���Ŀ<br/>�ɵ�����ӽ���ģ������')
			o.onmouseover = null
			o._dbsearchkey = key
			o.onclick = function(){wowdb_tooltip.search(this,decodeURIComponent(this._dbsearchkey))}
			if(o.previousSibling.previousSibling.innerHTML=='[')o.previousSibling.previousSibling.innerHTML='[[';
			if(o.nextSibling.innerHTML==']')o.nextSibling.innerHTML=']]';
			o.href='javascript:void(0)'
			o.target=''
			//wowdb_tooltip.search(o,decodeURIComponent(key))
			}
		else
			self.tip['content'].innerHTML=self.genMsg('�޴���Ŀ')
		},
	'utf-8'
	)

}//fe










//------------------------
if (! window.$atlasolinePower) $atlasolinePower={};
$atlasolinePower.regItem=function(id,name,q,icon,tip){httpDataGetter.script_muti_get_set_costom_value({'id':id,'name':name,'quality':q,'icon':icon,'tip':tip})};
$atlasolinePower.regAchievement=function(id,name,icon,tip){httpDataGetter.script_muti_get_set_costom_value({'id':id,'name':name,'icon':icon,'tip':tip})};
$atlasolinePower.regSpell=function(id,name,icon,nouse,tip){httpDataGetter.script_muti_get_set_costom_value({'id':id,'name':name,'icon':icon,'tip':tip})};
if (! window.$178DB) $178DB = {};
$178DB.regstItem=$178DB.regstQuest=$178DB.regstSpell=$178DB.regstAchievement=$178DB.regstNpc=function(v){httpDataGetter.script_muti_get_set_costom_value(v)};

//----------------------------------------
//
//
//
//
//
//----------------------------------------

commonui.loadmostuserrecommendbyfid = function (x,fid,day,nocache){
commonui.loadtopic_js(x,Array('data/bbscache/load_topic_cache/mostuserrecommend_'+fid+'_'+day+'.js?'+date.getDate()+date.getHours(),'nuke.php?func=loadtopic&js=1&f=mostuserrecommend&fid='+fid+'&day='+day+'&timeout='+3600*2.1),3600*2.1);
}

commonui.loadhotbyfid = function (x,fid,nocache){
commonui.loadtopic_js(x,Array('data/bbscache/load_topic_cache/hot_'+fid+'_.js?'+date.getDate()+date.getHours(),'nuke.php?func=loadtopic&js=1&f=hot&fid='+fid+'&timeout='+3600*2.1),3600*2.1);
}

commonui.loadtodaydelbyfid = function (x,fid,nocache){
commonui.loadtopic_js(x,Array('data/bbscache/load_topic_cache/todaydel_'+fid+'_.js?'+date.getDate()+date.getHours(),'nuke.php?func=loadtopic&js=1&f=todaydel&fid='+fid+'&timeout='+3600*1.1),3600*1.1,false);
}

commonui.loadtopic = function (x,cacheurl,url,nocache,timeout)
{
var self=this;
if(typeof(x)=='string')x=$(x)
if (x.innerHTML=='')
	{
	var onstart = function(){x.innerHTML=='Loading ...'}
	var onsucc = function(y,h){
		if (h)
			{
			h = h.match(/Last-Modified: (.+)/i)
			if (h && h[1])
				{
				if ((date.getTime()-Date.parse(h[1]))>timeout*1000 && !nocache)
					{
					commonui.loadtopicbyfid(x,cacheurl,url,1,timeout)
					return
					}
				}
			}
		y=y.replace(/^<\?php\s*\$write='(.+?)';\s*\?>$/i,'$1').replace(/\\'/g,"'");
		y = y.match(/(<li.+?<\/li>)/g);
		y = y.sort(function(){return Math.random()-0.5});
		var liclass = "class='b1'";
		for (var i=0; i<y.length; i++)
			{
				if (liclass=="class='b1'") liclass = "class='b2'";
				else liclass = "class='b1'";
				y[i] = y[i].replace(/class='b\d'/,liclass)
			}
		y = '<ul>'+y.join('')+'</ul>';
		x.innerHTML=y;
		}
	var onfail = function(){x.innerHTML=='Load error ...'}
	var q = new Array;
	if (!nocache)
		{
		q.push(cacheurl);
		}
	q.push(url);
	httpDataGetter.muti_get(q,onstart,onsucc,onfail);
	}
}

commonui.loadtopic_js = function (x,url,timeout,randomorder,subjectlimit)
{
if (typeof(randomorder)=='undefined') randomorder=true;
if (!subjectlimit) subjectlimit=21;
var self=this;
if(typeof(x)=='string')x=$(x)
if (x.innerHTML=='')
	{
	var date = new Date;
	if(typeof(url)=='string')url = Array(url)
	if(!url[1])timeout=0;
	httpDataGetter.script_muti_get(
		url,
		function(data)
			{
			if (!data)
				{
				return false;
				}
			if (timeout && (__NOW-data.time)>timeout)
				{
				return false;
				}
			var html=new Array;
			var liclass = "class='b1'";
			var hot='';
			var tid=0;
			var title='';
			var d=new Array;
			for (var k in data.data) d.push(data.data[k])
			if (randomorder) d = d.sort(function(){return Math.random()-0.5});
			for (var k=0;k<d.length;k++)
				{
				if (!d[k]) continue;
				if (liclass=="class='b1'") liclass = "class='b2'";
				else liclass = "class='b1'";
				if(d[k].hot)hot=d[k].hot;
				if(d[k].quote_from)tid=d[k].quote_from; else tid=d[k].tid;
				if(d[k].subject.length>21)
					{
					title=d[k].subject;
					d[k].subject=d[k].subject.substr(0,subjectlimit)+'...';
					}
				else title='';
				html.push("<li "+liclass+"><span class='subinfo'>"+hot+" "+commonui.time2shortdate(d[k].postdate)+"</span><a href='/read.php?tid="+tid+"' title='"+title+"'>"+d[k].subject+"</a></li>");
				}
			x.innerHTML='<ul>'+html.join('')+'</ul>';
			return true;
			},
		function()
			{
			x.innerHTML='��ȡ����';
			},
		'gbk'
		);
	}
}