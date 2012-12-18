//表情列表
if (!window.ubbcode)var ubbcode={}
if (window.location.href.indexOf('noBBCode')!=-1)ubbcode.noBBCode = true
ubbcode.forum_id = 0;

//bbcode转换
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
c = c.replace(/<br\s*\/?>\s*<br\s*\/?>/i,'<br/><span style="display:none"><br/>[::艾泽拉斯国家地理 BBS.NGACN.CC::]<br/></span><br/>');


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

c = c.replace(/\[reqpg=\d{1,2}\]/i,'');//[reqpg]

//c = c.replace(/\[qfw\](.+?)\[\/qfw\]/gi,function($0,$1){var id = 'qfw'+Math.floor(Math.random()*10000);window.setTimeout("quotefromwiki_double_get('"+id+"','"+$1+"')",500);if(document.createStyleSheet){document.createStyleSheet('/image/nga_classic/css_wiki.css');var css=''}else{var css="<style type='text/css'>@import '/image/nga_classic/css_wiki.css';</style>"}
//return(css+"<div id='"+id+"' class='qfw'></div>")});


c = c.replace(/\[wowdb\[([^\]]{2,20})\]\]/gi,function($0,$1){$1=$1.replace(/^ | $/,'');return "<span class='silver b'>[[</span><span class='urltip silver' style='font-size:11px;padding:2px;text-align:center;line-height:15px'></span><a class='b' href='javascript:void(0)' onclick='wowdb_tooltip.search(this,\""+$1+"\");'>"+$1+"</a><span class='silver b'>]]</span>"});//[db]

c = c.replace(/\[(item|spell|quest|npc|achieve)(=[^\[]{1,20})?\[([^\]]{2,20})\]\]/gi,function($0,$1,$2,$3){
if($2)$2 = $2.substr(1)
return wowdb_tooltip.linkGen($1,$3,$2)
});//[db]

c = c.replace(/\[(?:wow|lol)(?:,[a-z0-9,]+)?\[[^\]]{2,20}\]\]/gi,function($0){
return commonui.dbLinkGen.linkGen($0)
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

//发帖内容处理 如错误返回false
ubbcode.postContentChk = function (c){
c = c.replace(/\r?\n\[::艾泽拉斯国家地理 BBS.NGACN.CC::\]\r?\n/g,'');
return c
}//fe

ubbcode.codeHelpSpecial = [
{
	0:'<b>[customachieve]</b><br/><nobr>自定义成就</nobr>',
	1:"<b>插入一个自己定义内容的成就</b>\n\
\n\
[customachieve]\n\
[title]成就的名字(有字数限制)[/title]\n\
[txt]成就的说明文字(有字数限制)[/txt]\n\
[/customachieve]\n\
\n\
[customachieve]\n\
[title]成就的名字(有字数限制)[/title]\n\
[txt]成就的说明文字(有字数限制)[/txt]\n\
[img]成就的图标(绝对地址)[/img]\n\
[/customachieve]\n\
",
	2:{
		0:{'hint':'成就的名字(有字数限制)'},
		1:{'hint':'成就的说明文字(有字数限制)'},
		2:{'hint':'成就的图标(绝对地址)'},
		3:function(v){
			v[0]='[title]'+v[0]+'[/title]'
			v[1]='[txt]'+v[1]+'[/txt]'
			v[2]='[img]'+v[2]+'[/img]'
			return '[customachieve]'+v.join('\n')+'[/customachieve]'
		}
	}
},
{
	0:'<b>[[]]</b><br/><nobr>游戏数据库</nobr>',
	1:"<b>插入游戏数据库中的项目</b>\n\
\n\
	[wow,(item/npc/quest/achieve/spell),id,(cn/tw/en)[文字]] 魔兽世界(物品/人物/任务/成就/法术)\n\
\n\
	[lol,(item/spell/rune/skin/hero),id[文字]] 英雄联盟(物品/法术/符文/皮肤/英雄)\n\
\n\
	如果数据库搜索结果有多个 点击后会显示选择框\n\
\n\
	[wow[关键字]] 魔兽世界数据库中 关键字 的搜索结果\n\
\n\
	[lol[关键字]] 英雄联盟数据库中 关键字 的搜索结果\n\
\n\
	[wow,item[关键字]] 魔兽世界数据库中 关键字 的搜索结果中的物品\n\
\n\
	[wow,item,1234,tw[任意文字]] 繁体魔兽世界数据库中id是1234的物品\n\
\n\
	[wow,quest,1234[任意文字]] 魔兽世界数据库中id是1234的任务\n\
\n\
	[lol,item,1234[任意文字]] 英雄联盟数据库中id是1234的物品\n\
\n\
	[lol,spell,1234[任意文字]] 英雄联盟数据库中id是1234的法术\n\
",
	2:{
		0:{
			'hint':'游戏',
			'opts':{
				0:{0:'魔兽世界',1:'wow'},
				1:{0:'英雄联盟',1:'lol'}
				}
			},
		1:{
			'hint':'类别(可以不填)',
			'opts':{
				0:{0:'',1:''},
				1:{0:'魔兽世界物品',1:'item'},
				2:{0:'魔兽世界人物',1:'npc'},
				3:{0:'魔兽世界任务',1:'quest'},
				4:{0:'魔兽世界成就',1:'achieve'},
				5:{0:'魔兽世界法术',1:'spell'},
				6:{0:'英雄联盟物品',1:'item'},
				7:{0:'英雄联盟法术',1:'spell'},
				8:{0:'英雄联盟符文',1:'rune'},
				9:{0:'英雄联盟皮肤',1:'skin'},
				10:{0:'英雄联盟英雄',1:'hero'}
				}
			},
		2:{'hint':'数字ID(可以不填)'},
		3:{'hint':'链接文字(没有ID和类别时为搜索关键字)'},
		4:{
			'hint':'语言选择(默认简体 英雄联盟忽略)',
			'opts':{
				0:{0:'简体(国服)',1:'cn'},
				1:{0:'繁体(台服)',1:'tw'}
				}
			},
		5:function(v){
			if(!v[0] || !v[3])return ''
			var tmp = '['+v[0]+','+v[1]+','+v[2]+','+v[4]+'['+v[3]+']]'
			return tmp.replace(/,+/g,',').replace(/,\[/,'[')
			}
		}
},
/*
{
	0:'<b>[item]</b><br/><nobr>魔兽世界装备</nobr>',
	1:"<b>插入魔兽世界中的物品</b>\n\
\n\
	[item[物品名称]]\n\
\n\
	[item=语言[物品名称]]\n\
\n\
	[item=物品ID[任意文字]]\n\
\n\
	[item=物品ID,语言[任意文字]]\n\
\n\
	[item[物品ID]]\n\
\n\
	[item=语言[物品ID]]\n\
\n\
\n\
	[item]物品名称[/item]\n\
\n\
	[item=语言]物品名称[/item]\n\
\n\
	[item=物品ID]任意文字[/item]\n\
\n\
	[item=物品ID,语言]任意文字[/item]\n\
\n\
	[item]物品ID[/item]\n\
\n\
	[item=语言]物品ID[/item]\n\
\n\
语言为 cn/tw/en (国服/台服/美服) 之一 默认为cn\n\
",
	2:{
		0:{'hint':'物品名称或ID'},
		1:{'hint':'链接文字(可以不填)'},
		2:{
			'hint':'语言选择',
			'opts':{
				0:{0:'简体(国服)',1:'cn'},
				1:{0:'繁体(台服)',1:'tw'}
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
	0:'<b>[achieve]</b><br/><nobr>魔兽世界成就</nobr>',
	1:"<b>插入魔兽世界中的成就</b>\n\
\n\
	[achieve[成就名称]]\n\
\n\
	[achieve=语言[成就名称]]\n\
\n\
	[achieve=成就ID[任意文字]]\n\
\n\
	[achieve=成就ID,语言[任意文字]]\n\
\n\
	[achieve[成就ID]]\n\
\n\
	[achieve=语言[成就ID]]\n\
\n\
\n\
	[achieve]成就名称[/achieve]\n\
\n\
	[achieve=语言]成就名称[/achieve]\n\
\n\
	[achieve=成就ID]任意文字[/achieve]\n\
\n\
	[achieve=成就ID,语言]任意文字[/achieve]\n\
\n\
	[achieve]成就ID[/achieve]\n\
\n\
	[achieve=语言]成就ID[/achieve]\n\
\n\
语言为 cn/tw/en (国服/台服/美服) 之一 默认为cn\n\
",
	2:{
		0:{'hint':'成就名称或ID'},
		1:{'hint':'链接文字(可以不填)'},
		2:{
			'hint':'语言选择',
			'opts':{
				0:{0:'简体(国服)',1:'cn'},
				1:{0:'繁体(台服)',1:'tw'}
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
	0:'<b>[spell]</b><br/><nobr>魔兽世界法术</nobr>',
	1:"<b>插入魔兽世界中的法术</b>\n\
\n\
	[spell=法术ID[任意文字]]\n\
\n\
	[spell=法术ID,语言[任意文字]]\n\
\n\
	[spell[法术ID]]\n\
\n\
	[spell=语言[法术ID]]\n\
\n\
\n\
	[spell=法术ID]任意文字[/spell]\n\
\n\
	[spell=法术ID,语言]任意文字[/spell]\n\
\n\
	[spell]法术ID[/spell]\n\
\n\
	[spell=语言]法术ID[/spell]\n\
\n\
语言为 cn/tw/en (国服/台服/美服) 之一 默认为cn\n\
",
	2:{
		0:{'hint':'法术ID'},
		1:{'hint':'链接文字(可以不填)'},
		2:{
			'hint':'语言选择',
			'opts':{
				0:{0:'简体(国服)',1:'cn'},
				1:{0:'繁体(台服)',1:'tw'}
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
	0:'<b>[wiki]</b><br/><nobr>插入wiki链接</nobr>',
	1:"<b>插入到wiki.ngacn.cc的文章链接</b>\n\
\n\
	[wiki]文章标题[/wiki]\n\
"
},
*/
{
	0:'<b>[armory]</b><br/><nobr>魔兽世界人物信息</nobr>',
	1:"<b>插入魔兽世界armory的人物信息(因编码不同可能包含特定文字的ID无法获取)</b>\n\
\n\
	[cnarmory 服务器名 玩家名] 插入cn.wowarmory.com的人物信息\n\
\n\
	[usarmory 服务器名 玩家名] 插入www.wowarmory.com的人物信息\n\
\n\
	[twarmory 服务器名 玩家名] 插入tw.wowarmory.com的人物信息\n\
\n\
	[euarmory 服务器名 玩家名] 插入eu.wowarmory.com的人物信息\n\
",
	2:{
		0:{'hint':'服务器名'},
		1:{'hint':'玩家名'},
		2:{
			'hint':'区域选择',
			'opts':{
				0:{0:'国服',1:'cn'},
				1:{0:'台服',1:'tw'},
				2:{0:'美服',1:'us'},
				3:{0:'欧服',1:'eu'}
				}
			},
		3:function(v){
			return '['+v[2]+'armory '+v[0]+' '+v[1]+']'
		}
	}
},
{
	0:'<b>[url]</b><br/><nobr>Diablo3人物信息</nobr>',
	1:"<b>插入Diablo3的人物信息</b>\n\
\n\
	[url]battle net中人物信息页面的地址后加 `#armory` [/url]\n\
\n\
	例如\n\
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
wowdb_tooltip={linkGen:function(t1,name,arg){return commonui.dbLinkGen.linkGen('[wow,'+t1+','+arg+'['+name+']')}}


commonui.dbLinkGen = {
data:{},

tip:null,

/** 生成数据库链接
 * @param string str 关键字 
 * [wow,item,1234,cn[某物品]] 显示wow/cn数据库id为1234的物品
 * [wow,cn[影锋]] 显示wow/cn数据库中影锋的搜索结果
 * [wow,spell,tw,1234[某技能]] 显示wow/tw数据库id为1234的技能
 * [lol,item,1234[某物品]] 显示lol数据库id为1234的物品
 * [lol[影锋]] 显示lol数据库中影锋的搜索结果
 * 
 * 大类可选项 wow lol
 * 子类可选项 item spell npc quest achieve(wow)  item spell rune skin hero(lol)
 * 大类必须在第一个 关键字必须在最后一个
 * 
 * 或可依次作为函数参数运行 如 linkgen(lol,item,1234,'某物品')
 */
linkGen : function(arg)
{
if(arguments.length>1)
	var str = arguments
else
	var str = arg.replace(/^[,\[\]]*|[,\[\]]*$/g,'').split(/,|\[|\]/g)

var t0 = str[0], name=str[str.length-1] , t1='', id=0, lang='cn', x='', u='', h='', key='', std=''
str[0] = str[str.length-1] = null
for(var i=0; i<str.length; i++){
	switch(str[i]){
		case 'achieve':
			str[i] = 'achievement';
		case 'achievement':
		case 'item':
		case 'spell':
		case 'quest':
		case 'npc':
		case 'rune':
		case 'skin':
		case 'hero':
			t1 = str[i];
			std +=','+t1;
			break;
		case 'cn':
		case 'tw':
		case 'en':
		case 'us':
			lang = str[i];
			std +=','+lang;
			break;
		default:
			if(str[i] && str[i].toString().match(/^\d+$/)){
				id = str[i];
				std +=','+id;
				}
		}
	}
	
std = '&#91;'+t0+std+'&#91;'+name.replace(/'/g,'&#39;')+'&#93;&#93;'

if(!t0)
	t0='wow'

if (name && name.toString().match(/^\d+$/))
	id = name
else
	key = encodeURIComponent(name)

if(t0=='wow'){
	if (t1=='achieve')
		t1='achievement'
	if (id && t1){
		h = 'http://db.178.com/'+t0+'/'+lang+'/'+t1+'/'+id+'.html'
		x = 'http://db.178.com/'+t0+'/'+lang+'/a/'+t1+'/'+id+'.js'
		}
	else if (key){
		h = 'http://db.178.com/'+t0+'/'+lang+'/search.html?name='+key
		u = t0+'/'+lang+'/search.html?name='+key
		x = hex_md5(u)
		x = ['http://img4.ngacn.cc/proxy/cache_db178com/'+hex_md5(t0+'/'+lang)+'/'+x.substr(0,2)+'/'+x.substr(2,2)+'/'+x+'.js','http://img4.ngacn.cc/proxy/proxy.php?host=db.178.com&url='+encodeURIComponent(u)]
		}
	}
else if(t0=='lol'){
	if(id && t1){
		h = 'http://db.178.com/lol/'+t1+'-'+id
		if(t1=='item' || t1=='spell' || t1=='rune')
			x = 'http://db.178.com/lol/'+t1+'-ajax/'+id
		}
	else if(key){

		h = 'http://db.178.com/lol/search/s/na:'+key+'&item:on&rune:on&hero:on&skin:on'
		u = t0+'/search/s/na:'+key+'%26item:on%26rune:on%26hero:on%26skin:on'
		x = hex_md5(u)
		x = ['http://img4.ngacn.cc/proxy/cache_db178com/'+hex_md5(t0+'/search/s')+'/'+x.substr(0,2)+'/'+x.substr(2,2)+'/'+x+'.js','http://img4.ngacn.cc/proxy/proxy.php?host=db.178.com&url='+encodeURIComponent(u)]
			
		}
	}

if(!h)
	return

var did = 'search_data_cache_id_'+Math.random()

this.data[did] = {h:h,x:x,t0:t0,t1:t1,lang:lang,id:id}

return "<span class='silver b'>[</span><a class='b' href='"+h+"' onclick='commonui.dbLinkGen.open(event,\""+did+"\");' title='点击显示详细信息 "+std+"'>"+name+"</a><span class='silver b'>]</span>";
},


open:function(e,did){
if(!this.data[did].x)
	return true

var d = this.data[did], self = this, varName = null;


if(d.t0=='wow' && d.id){
	if (!window.$178DB){
		window.$178DB = {};
		$178DB.regstItem=$178DB.regstQuest=$178DB.regstSpell=$178DB.regstAchievement=$178DB.regstNpc=function(v){httpDataGetter.script_muti_get_set_costom_value(v)};
		}
	varName = null
	}

if(d.t0=='lol' && d.id){
	varName = d.t1+'_'+d.id
	}

commonui.createadminwindow()
commonui.adminwindow._.addContent(null)

httpDataGetter.script_muti_get(this.data[did].x,
	function(x){
		var html = ''
		if (!x)
			return false
		if(d.t0=='wow'){
			if (!d.id){//search
				if(window.__NOW - x.time>86400*7)
					return false
				html += self.parseWowSearch(x.data,d.lang,d.t1)
				}
			else if (x=='not exists' || (typeof(x.icon)=='number' && x.icon==0))
				html = '无此条目'
			else if(x.tip){//wow tip
				html+='<div id="atlasoline_iTTc" style="background:#000;border:4px solid #000;border-radius: 5px">'+
					(x.icon ? '<img src="http://img.db.178.com/wow/icons/m/'+x.icon.toLowerCase()+'.jpg"/>' : '') +
					x.tip+'</div>';
				}
			else
				html = '无此条目'
			}
		else if(d.t0=='lol'){
			if (!d.id){//search
				if(window.__NOW - x.time>86400*7)
					return false
				html += self.parseLolSearch(x.data,d.lang,d.t1)
				}
			else if(x){//lol tip
				html+='<div id="loldb_tooltip_c" style="background:#000;border:4px solid #000;border-radius: 5px">'+x+'<div class="clear"></div></div>'
				commonui.adminwindow.$0('style','width:auto;minWidth:270px')
				}
			else
				html = '无此条目'
			}

		var m = html.match(/search_data_cache_id_[\d\.]+/g)
		if(m && !m[1]){
			self.open(e,m[0])
			return true
			}
		commonui.adminwindow._.addContent(html)
		tTip.showdscp(e,commonui.adminwindow);
		return true
		},
	function(){
		commonui.adminwindow._.addContent('无此条目')
		tTip.showdscp(e,commonui.adminwindow);
		},
	'utf-8',
	varName
	)
if(!e)e = window.event
try{e.stopPropagation();e.preventDefault()}catch(er){}
e.cancelBubble =true,e.returnValue = false
return
},//fe

parseLolSearch:function(x,lang,t1){
var html = {}
for(var i = 0;i<x.length;i++){
	var d = x[i]
	if(d[0].substr(0,7)!='http://')
		d[0] = 'http://db.178.com'+d[0]
	var m = d[0].match(/\/([^\/\-]+)-(\d+)$/)
	if(!m)m=[]
	if(m[1]=='item' && (!t1 || t1=='item'))
		html['物品'] += this.linkGen('lol',m[1],m[2],d[1]);
	else if(m[1]=='rune' && (!t1 || t1=='rune'))
		html['符文'] += this.linkGen('lol',m[1],m[2],d[1]);
	else if(m[1]=='spell' && (!t1 || t1=='spell'))
		html['技能'] += this.linkGen('lol',m[1],m[2],d[1]);
	else if(m[1]=='skin' && (!t1 || t1=='skin'))
		html['皮肤'] +="<span class='silver b'>[</span><a href='"+d[0]+"'/>"+d[1]+"</a><span class='silver b'>]</span>"
	else if((m[1]=='hero' || d[0].indexOf('champion')!=-1) && (!t1 || t1=='hero'))
		html['英雄'] +="<span class='silver b'>[</span><a href='"+d[0]+"'/>"+d[1]+"</a><span class='silver b'>]</span>"
	}
var tmp = ''
for(var k in html)
	tmp+="<h4 class='silver'>"+k+"</h4>"+html[k].replace(/^undefined/,'')
return tmp
},//fe

parseWowSearch:function(str,lang,t1){
var $ = function(){return {append:function(){},attr:function(){}}} , Table={create:function(){}} , spells_data , quests_data , items_data , npcs_data , achievements_data , quests_data , getItem =[],  getSpell =[], getAchievement =[], getNpc =[], getQuest =[]

eval(str)
	
var html = ''

if(items_data && (!t1 || t1=='item')){
	html += "<h4 class='silver'>物品</h4>"
	for(var i=0; i<items_data.length;i++)
		html += this.linkGen('wow','item',items_data[i][0],lang,items_data[i][1]);
	}
if(npcs_data && (!t1 || t1=='npc')){
	html += "<h4 class='silver'>NPC</h4>"
	for(var i=0; i<npcs_data.length;i++)
		html += this.linkGen('wow','nps',npcs_data[i][0],lang,npcs_data[i][1]);
	}
if(quests_data && (!t1 || t1=='quest')){
	html += "<h4 class='silver'>任务</h4>"
	for(var i=0; i<quests_data.length;i++)
		html += this.linkGen('wow','quest',quests_data[i][0],lang,quests_data[i][1]);
	}
if(achievements_data && (!t1 || t1=='achievement')){
	html += "<h4 class='silver'>成就</h4>"
	for(var i=0; i<achievements_data.length;i++)
		html += this.linkGen('wow','achievement',achievements_data[i][0],lang,achievements_data[i][1]);
	}
if(spells_data && (!t1 || t1=='spell')){
	html += "<h4 class='silver'>法术</h4>"
	for(var i=0; i<spells_data.length;i++)
		html += this.linkGen('wow','spell',spells_data[i][0],lang,spells_data[i][1]);
	}
	
if(html=='')
	html = '数据错误'
	
return html
}
	
}//ce
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
			x.innerHTML='读取错误';
			},
		'gbk'
		);
	}
}