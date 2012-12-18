var armory = new Object;

armory.get = function(realm,name,o,host,update,todo)
{
	function e(t){return escape(encodeURIComponent(t)).replace(/%25/g,'%')}
	function e2(t){t=t.replace("'",'').replace(" ",'-');return escape(encodeURIComponent(t)).replace(/%25/g,'%')}
	if (host=='cn')
		{
		var hosthost = 'www.battlenet.com.cn'
		var cachepath = 'cache_cnwowarmory_new_2'
		var proxypath = 'http://img4.ngacn.cc/proxy'
		var iconbase = 'http://img.db.178.com/wow/icons/s/'
		var portraitpath = ''
		var glyphiconbase = ''
		var dbbase = 'http://db.178.com/wow/cn/item/'
		var u = 'wow/zh/character/'+e(realm)+'/'+e(name)+'/advanced'
		}
	else if (host=='us')
		{
		var hosthost = 'us.battle.net'
		var cachepath = 'cache_uswowarmory_new_2'
		var proxypath = 'http://img4.ngacn.cc/proxy'
		var iconbase = 'http://img.db.178.com/wow/icons/s/'
		var portraitpath = ''
		var glyphiconbase = ''
		var dbbase = 'http://db.178.com/wow/tw/item/'
		var u = 'wow/en/character/'+e(realm)+'/'+e(name)+'/advanced'
/*
		var hosthost = 'www.wowarmory.com'
		var cachepath = 'cache_uswowarmory_new'
		var proxypath = 'http://img4.ngacn.cc/proxy'
		var iconbase = 'http://www.wowarmory.com/wow-icons/_images/21x21/'
		var portraitpath = 'http://www.wowarmory.com/_images/portraits/wow-80/'
		var glyphiconbase = 'http://www.wowarmory.com/wow-icons/_images/21x21/'
		var dbbase = 'http://db.178.com/wow/tw/item/'
		var u = 'character-sheet.xml?r='+e(realm)+'&cn='+e(name)
		*/
		}
	else if (host=='eu')
		{
		var hosthost = 'eu.battle.net'
		var cachepath = 'cache_euwowarmory_new_2'
		var proxypath = 'http://img4.ngacn.cc/proxy'
		var iconbase = 'http://img.db.178.com/wow/icons/s/'
		var portraitpath = ''
		var glyphiconbase = ''
		var dbbase = 'http://db.178.com/wow/tw/item/'
		var u = 'wow/en/character/'+e(realm)+'/'+e(name)+'/advanced'
/*
		var hosthost = 'eu.wowarmory.com'
		var cachepath = 'cache_euwowarmory_new'
		var proxypath = 'http://img4.ngacn.cc/proxy'
		var portraitpath = 'http://www.wowarmory.com/images/portraits/wow-80/'
		var iconbase = 'http://www.wowarmory.com/wow-icons/_images/21x21/'
		var glyphiconbase = 'http://www.wowarmory.com/wow-icons/_images/21x21/'
		var dbbase = 'http://db.178.com/wow/tw/item/'
		var u = 'character-sheet.xml?r='+e(realm)+'&cn='+e(name)
		*/
		}
	else if (host=='tw')
		{
		var hosthost = 'tw.battle.net'
		var cachepath = 'cache_twwowarmory_new_2'
		var proxypath = 'http://img4.ngacn.cc/proxy'
		var iconbase = 'http://img.db.178.com/wow/icons/s/'
		var portraitpath = ''
		var glyphiconbase = ''
		var dbbase = 'http://db.178.com/wow/tw/item/'
		var u = 'wow/zh/character/'+e(realm)+'/'+e(name)+'/advanced'
/*
		var hosthost = 'tw.wowarmory.com'
		var cachepath = 'cache_twwowarmory_new'
		var proxypath = 'http://img4.ngacn.cc/proxy'
		var iconbase = 'http://us.battle.net/wow-assets/static/images/icons/18/'
		var portraitpath = 'http://www.wowarmory.com/_images/portraits/wow-80/'
		var glyphiconbase = 'http://us.battle.net/wow-assets/static/images/icons/18/'
		var dbbase = 'http://db.178.com/wow/tw/item/'
		var u = 'character-sheet.xml?r='+e(realm)+'&cn='+e(name)
		*/
		}
	var self = this;
	if (update==-1)
		{
		o.innerHTML="[<a class='b' href='http://"+hosthost+"/"+u+"' target='_blank'>"+realm+' '+name+"</a>]"
		return;
		}
	var k = hex_md5(u)
	//var d = new Date
	cachepath = cachepath+'/'+k.substr(0,2)+'/'+k.substr(2,2);
	if (update)
		var urls = [proxypath+"/proxy.php?update=1&host="+hosthost+"&url=" + encodeURIComponent(u) + "&rand=" +Math.random()+(window.__DEBUG?'&debug=1':'')]
	else
		var urls = [proxypath+"/"+cachepath+"/" + k + ".js",proxypath+"/proxy.php?host="+hosthost+"&url=" + encodeURIComponent(u)];

	if (todo)
	{
	httpDataGetter.script_muti_get(urls,
		function(x){
			if (!x)return false;
			else
				{
				var date = new Date
				if ((date.getTime() - x[0])>3600*24*30)return false
				if (!x[0])x[0]=false
				todo(x[0],realm,name,o,host,hosthost,u)
				return true
				}
			},
		function(){todo(x[0],realm,name,o,host,hosthost,u)},
		'utf-8'
		);
	}
	else
	{
	httpDataGetter.script_muti_get(urls,
		function(x){
			if (!x)
				return false;
			else if (!x[0] || x.error){
				if(host!='us')
					o.innerHTML=self.error((x.error)?x.error:1,realm,name,host,hosthost,u)
				else
					o.innerHTML=self.error((x.error)?x.error:4,realm,name,host,hosthost,u)
				return true
				}
			else
				{
				var date = new Date
				if ((date.getTime()/1000 - x[1])>3600*24*7)
					return false
				if(typeof(x[0])=='string')
					o.innerHTML=self.proc(x[0],realm,name,o,host,hosthost,portraitpath,iconbase,glyphiconbase,u,dbbase)
				else
					o.innerHTML=self.proc_v2(x[0],realm,name,o,host,hosthost,iconbase,u,dbbase)
				return true
				}
			},
		function(){
			o.innerHTML=self.error(0,realm,name,host,hosthost,u)
			},
		'utf-8'
		);
	}
}//fe

armory.proc = function(t,realm,name,o,host,hosthost,portraitpath,iconbase,glyphiconbase,u,dbbase)
{
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
							r = r+f+k+' = '+c[k]+'<br/>';
						}
				}
		}
if (typeof(xmlParser)!='object')
	{
		xmlParser = new AVSXmlParser();
	}
t = xmlParser.xml2Array(t)
if (!t.page || !t.page.characterInfo || !t.page.characterInfo.character || !t.page.characterInfo.characterTab )
	{
	return this.error(2,realm,name,host,hosthost,u);
	}
var professions = '';
if (t.page.characterInfo.characterTab.professions && t.page.characterInfo.characterTab.professions.skill)
	{
	for (var i=0; i<2; i++)
		{
		if (t.page.characterInfo.characterTab.professions.skill[i])
			{
			professions += ' '+t.page.characterInfo.characterTab.professions.skill[i].name
			}
		}
	}
if (professions)professions="<span class='gray'>专业:</span>"+professions

var talent = '';
if (t.page.characterInfo.characterTab.talentSpecs)
	{
	for (var k in t.page.characterInfo.characterTab.talentSpecs.talentSpec)
		{
		if (typeof(t.page.characterInfo.characterTab.talentSpecs.talentSpec[k])=='object')
			{
			var tmp = t.page.characterInfo.characterTab.talentSpecs.talentSpec[k];
			if(tmp.treeOne!=0 || tmp.treeTwo!=0 || tmp.treeThree!=0)
				{
				if(!tmp.prim)tmp.prim='';
				if (tmp.active)
					talent+=tmp.prim+":"+tmp.treeOne+"/"+tmp.treeTwo+"/"+tmp.treeThree+" ";
				else
					talent+="<span class='gray'>"+tmp.prim+":"+tmp.treeOne+"/"+tmp.treeTwo+"/"+tmp.treeThree+"</span> ";
				}
			}
		}
	}
else 
	{
	var tmp = t.page.characterInfo.characterTab.talentSpec[0];
	if(!tmp.prim)tmp.prim='';
	talent+=tmp.prim+":"+tmp.treeOne+"/"+tmp.treeTwo+"/"+tmp.treeThree+" "
	}

var achievement='';
tmp = t.page.characterInfo;
if (tmp.summary && tmp.summary.c)
	{
	achievement = "<span class='gray'>成就:</span>"+tmp.summary.c[0].points
	}

var glyph='';
tmp = t.page.characterInfo.characterTab;
if (tmp.glyphs && tmp.glyphs.glyph)
	{
	for (var k in tmp.glyphs.glyph)
		{
		if (typeof(tmp.glyphs.glyph[k])=='object')
			{
			glyph+="<img title='"+tmp.glyphs.glyph[k].name+" : "+tmp.glyphs.glyph[k].effect+"' src='"+glyphiconbase+tmp.glyphs.glyph[k].icon+".jpg' style='width:14px;height:14px;vertical-align:-2px'/>"
			}
		}
	}
var r = '';
//d('',t)
//return r;
realm=realm.replace("'",'&#39;')
name=name.replace("'",'&#39;')
r = "\
<table class='armorychr'>\
	<tbody>\
	<tr>\
		<td style='width:120px;height:104px;padding:0px;background:url("+this.portrait(t.page.characterInfo.character[0].genderId, t.page.characterInfo.character[0].raceId, t.page.characterInfo.character[0].classId,portraitpath)+") no-repeat 50px 34px'>\
			<div style='width:120px;height:104px;background:url("+__IMG_STYLE+"/armorymask.png) no-repeat'></div>\
		</td>\
		<td class='defaultcolor'>\
			<span class='gray'>["+realm+"] ["+t.page.characterInfo.character[0].guildName+"]</span> [<a href='http://"+hosthost+"/character-sheet.xml?"+t.page.characterInfo.character[0].charUrl+"' target='_blank' class='name'>"+t.page.characterInfo.character[0].prefix + t.page.characterInfo.character[0].name + t.page.characterInfo.character[0].suffix+"</a>] <span class='xtxt gray'>("+hosthost+")</span> <a class='xtxt' href='javascript:void(0)' onclick='armory.get(\""+realm+"\",\""+name+"\",this.parentNode.parentNode.parentNode.parentNode.parentNode,\""+host+"\",1)'>[RELOAD]</a><br/>\
			<b>"+t.page.characterInfo.character[0].level+"级 "+t.page.characterInfo.character[0]['class']+"</b> "+talent+" "+glyph+"<br/>\
			"+(t.page.characterInfo.characterTab.items ? this.items(t.page.characterInfo.characterTab.items.item,iconbase,dbbase,host) : '')+"<br/>\
			"+professions+' '+achievement+"\
		</td>\
	</tr>\
	</tbody>\
</table>\
";
//if(window.location.href.indexOf('debug')!=-1)r+="<textarea>"+this.treeDisp('',t)+"</textarea>"
return r;
}//fe

armory.items = function(t,iconbase,dbbase,host)
{
if (typeof(t)!='object')
	{
	return '';
	}
var r = '';
for (i=0; i<19; i++)
	{
	if (t[i] && t[i].id)
		r = r+ "<a href='"+dbbase+t[i].id+".html' target='_blank' onmouseover='wowdb_tooltip.delayGet_v2(this,\"item\",\""+t[i].id+"\",false,\""+host+"\",false);delay_showdscp(event,wowdb_tooltip.tip[\"tip\"],700);' onmousemove='movedscp(event,wowdb_tooltip.tip[\"tip\"])' onmouseout='wowdb_tooltip.clear()'><img src='"+iconbase+t[i].icon+".jpg' style='width:21px;height:21px'/></a>";
	}
return r
}

armory.portrait = function(g,r,c,hosthost)
{
var p = hosthost+g+'-'+r+'-'+c+'.gif'
return (p)
}

armory.error = function(c,realm,name,host,hosthost,u)
{
var cc='  未知错误  ';
if (typeof(c)=='number'){
	switch(c){
		case 0:
			cc = '  无法从代理获得数据，或者代理不可用  '
			break;
		case 1:
			cc = '  无法通过代理获得Armory数据，或Armory服务器不可用  '
			break;
		case 2:
			cc = '  Armory中无此玩家数据，或Armory服务器在维护中  '
			break;
		case 3:
			cc = '  Armory中无此玩家数据，或Armory服务器在维护中，或数据格式错误  '
			break;
		case 4:
			cc = '  Armory中无此玩家数据，或Armory服务器在维护中  '
			break;
		}
	}
else{
	c=c.replace(/^\s*|\s*$/g,'');
	switch(c){
		case 'get data timeout':
			cc = '  代理读取Armory数据超时  '
			break;
		case 'connect error':
			cc = '  代理连接Armory服务器失败  '
			break;
		}
	}
var date = new Date
return "<span class='gray'>[<a class='b' href='http://"+hosthost+"/"+u+"' target='_blank'>"+realm+' '+name+"</a>] <span class='x_txt'>( "+cc+" "+date.toUTCString()+" <a href='javascript:void(0)' onclick=\"armory.get('"+realm.replace("'",'&#39;')+"','"+name.replace("'",'&#39;')+"',this.parentNode.parentNode.parentNode,'"+host+"',1)\">[RELOAD]</a>)</span></span>"
}

armory.treeDisp = function(f,c)
{
	var x = '';
	for (var k in c)
		{
			if (typeof(c[k])=='object')
				{
					x+=this.treeDisp(f+k+'.',c[k]);
				}
			else
				{
					x+=f+k+' = '+c[k]+'\n';
				}
		}
	return x;
}


armory.proc_v2 = function(t,realm,name,o,host,hosthost,iconbase,u,dbbase)
{
if (!t.profile || !t.statAdv)
	return this.error(3,realm,name,host,hosthost,u);

var style='';
if (t.profile.race.match(/^[a-zA-Z ]+$/))
	style = 'armorychrSmallTxt'

var professions = '';
if (t.profession){
	for (var k in t.profession)
		professions += "<span class='subcolor'>"+k+":</span> <span class='value'>"+t.profession[k]+'</span> '
	}

var talent = '';
if (t.talent){
	for (var k in t.talent){
		if(t.talent[k].talent){
			talent += k+": <span class='subcolor'>"
			
			for (var kk in t.talent[k].talent)
				talent += "<a href='javascript:void(0)' style='border:1px gray solid;font-size:9px;padding:0 0 0 16px;background:url("+iconbase+t.talent[k].talent[kk][0]+")' title='"+t.talent[k].talent[kk][1]+"' no-repeat -1px -1px'></a>&nbsp;";
	
			talent += '</span> '
			
			if(t.talent[k].glyphs){
				
				talent += "&nbsp;&nbsp;<span class='subcolor'>"
				
				for (var kk in t.talent[k].glyphs)
					talent += "<a href='javascript:void(0)' style='border:1px gray solid;font-size:9px;padding:0 0 0 16px;background:url("+iconbase+t.talent[k].glyphs[kk][0]+")' title='"+t.talent[k].glyphs[kk][1]+"' no-repeat -1px -1px'></a>&nbsp;";
		
				talent += '</span> '				
							
				}
			}
		else if(typeof(t.talent[k][0])!='undefined')
			talent += k+": <span class='subcolor'>"+t.talent[k].join('/')+'</span> '
		}
	if(talent)talent+='<br/>';
	}

var achievement='';
if (t.profile.achievements)
	achievement = "<span class='value' style='background:url("+__IMG_STYLE+"/achievements.gif) no-repeat 0 4px' title='成就'>&emsp;"+t.profile.achievements+"</span>"
	


var r = '';
//d('',t)
//return r;
realm=realm.replace("'",'&#39;')
name=name.replace("'",'&#39;')

var _realm = "<span title='服务器'>["+t.profile.realm+"]</span> "
			+(t.profile.guild ? "<span class='gcolor' title='公会'>["+t.profile.guild+"]</span> " : '')
var _name = "<b class='namecolor'>"+t.profile.name+'</b>'
			+(t.profile.title ? ' '+t.profile.title : '')

var stat = '';
for (var k in t.statAdv.Base)
	stat += "<span class='subcolor'>"+k+":</span> <span class='value'>"+t.statAdv.Base[k]+'</span> '

for (var k in t.statAdv.Other)
	stat += "<span class='subcolor'>"+k+":</span> <span class='value'>"+t.statAdv.Other[k]+'</span> '
//<div style='width:120px;height:104px;background:url("+__IMG_STYLE+"/armorymask.png) no-repeat'></div>

t.profile.avatar = t.profile.avatar.replace(/avatar/g,'inset').replace(/avatar\/race/g,'inset').replace(/avatar\/class/g,'inset')
r = "\
<table class='armorychr armorychr_v2'>\
	<tbody>\
	<tr>\
		<td style='height:104px;padding:0 3px 0 130px;background:#000 url("+t.profile.avatar+") no-repeat -50px -9px;overflow:hidden' class='"+style+"'>\
			<nobr>"+_realm+"<span class='class"+t.profile.classId+"'>[lv"+t.profile.level+" "+t.profile.race+" "+t.profile.spec+" "+t.profile.className+"]</span> [<a href='http://"+hosthost+"/"+u+"' target='_blank' class='name'>"+_name+"</a>]</nobr><br/>\
			"+talent+"\
			<nobr>"+stat+"</nobr><br/>\
			<nobr>"+this.items_v2(t.item,iconbase,dbbase,host)+"</nobr><br/>\
			<span style='float:right'><span class='xtxt subcolor'>("+hosthost+")</span> <a class='xtxt' href='javascript:void(0)' onclick='armory.get(\""+realm+"\",\""+name+"\",this.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode,\""+host+"\",1)'>[RELOAD]</a></span>"+professions+' '+achievement+"\
		</td>\
	</tr>\
	</tbody>\
</table>\
";
//if(window.location.href.indexOf('debug')!=-1)r+="<textarea>"+this.treeDisp('',t)+"</textarea>"
return r;
}//fe

armory.item_quality = {7:'#e5cc80',6:'#e5cc80',5:'#ff8000',4:'#a335ee',3:'#0070dd',2:'#1eff00',1:'#ffffff',0:'#9d9d9d'}

armory.items_v2=function(t,iconbase,dbbase,host){
if (typeof(t)!='object')
	return '';
var r = '',q='',id=0,icon='';
if(host=='us' || host=='eu')
	host='tw';
for (i=0; i<t.length; i++){
	if (t[i]){
		if(t[i][3]){
			q = this.item_quality[t[i][0]]
			id = t[i][1]
			icon = t[i][3]
			}
		else{
			q = '#888888'
			id = t[i][0]
			icon = t[i][2]
			}
		r = r+ "<a href='"+dbbase+id+".html' target='_blank' onmouseover='wowdb_tooltip.delayGet_v2(this,\"item\",\""+id+"\",false,\""+host+"\",false);delay_showdscp(event,wowdb_tooltip.tip[\"tip\"],700);' onmousemove='movedscp(event,wowdb_tooltip.tip[\"tip\"])' onmouseout='wowdb_tooltip.clear()' style='border:1px "
		+q+" solid;font-size:9px;padding:0 0 0 16px;background:url("+iconbase+icon+") no-repeat -1px -1px'></a>&nbsp;";
		}
	}
if (t['avgLevel'])
	r+="<span class='subcolor' title='平均装备等级'>Avg lv:</span> <span class='value'>"+t['avgLevel']+'</span>'
return r
}//fe










//diablo============================================
//diablo============================================
//diablo============================================

var d3armory = {

cache:{},


get:function(a,update){// arg:{key,host,name,id,o}

if(typeof(a)=='string')
	a = this.cache[a]
if(!a)
	return
if(!this.cache[a.key])
	this.cache[a.key] = a

var pname = a.name.replace('#','-')

function e(t){return escape(encodeURIComponent(t)).replace(/%25/g,'%')}
function e2(t){t=t.replace("'",'').replace(" ",'-');return escape(encodeURIComponent(t)).replace(/%25/g,'%')}

if (a.host=='cn')
	{
	a.hosthost = 'www.battlenet.com.cn'
	a.cachepath = 'cache_cnwowarmory_new_2'
	a.proxypath = 'http://img4.ngacn.cc/proxy'
	a.iconbase = 'http://img.db.178.com/d3/icons/skills/42/'
	a.portraitpath = ''
	a.glyphiconbase = ''
	a.dbbase = 'http://tw.battle.net'
	a.u = 'd3/zh/profile/'+pname+'/hero/'+a.id
	}
else if (a.host=='us')
	{
	a.hosthost = 'us.battle.net'
	a.cachepath = 'cache_uswowarmory_new_2'
	a.proxypath = 'http://img4.ngacn.cc/proxy'
	a.iconbase = 'http://img.db.178.com/d3/icons/skills/42/'
	a.portraitpath = ''
	a.glyphiconbase = ''
	a.dbbase = 'http://us.battle.net'
	a.u = 'd3/en/profile/'+pname+'/hero/'+a.id
	}
else if (a.host=='eu')
	{
	a.hosthost = 'eu.battle.net'
	a.cachepath = 'cache_euwowarmory_new_2'
	a.proxypath = 'http://img4.ngacn.cc/proxy'
	a.iconbase = 'http://img.db.178.com/d3/icons/skills/42/'
	a.portraitpath = ''
	a.glyphiconbase = ''
	a.dbbase = 'http://us.battle.net'
	a.u = 'd3/en/profile/'+pname+'/hero/'+a.id
	}
else if (a.host=='tw')
	{
	a.hosthost = 'tw.battle.net'
	a.cachepath = 'cache_twwowarmory_new_2'
	a.proxypath = 'http://img4.ngacn.cc/proxy'
	a.iconbase = 'http://img.db.178.com/d3/icons/skills/42/'
	a.portraitpath = ''
	a.glyphiconbase = ''
	a.dbbase = 'http://tw.battle.net'
	a.u = 'd3/zh/profile/'+pname+'/hero/'+a.id
	}

var self = this;
if (update==-1)
	return o.innerHTML="[<a class='b' href='http://"+a.hosthost+"/"+a.u+"' target='_blank'>"+a.name+" / "+a.id+"</a>]"

urls = this.genUrl(a.hosthost,a.proxypath,a.cachepath,a.u,update)

httpDataGetter.script_muti_get(urls,
	function(x){
		if (!x)
			return false;
		else if (!x[0] || x.error){
			a.o.innerHTML=self.error((x.error)?x.error:1,a)
			return true
			}
		else
			{
			var date = new Date
			if ((date.getTime()/1000 - x[1])>3600*24*7)
				return false
			a.o.innerHTML=self.proc(x[0],a)
			return true
			}
		},
	function(){
		a.o.innerHTML=self.error(0,a)
		},
	'utf-8'
	);

},//fe

translate:function(t){
var x =t.toUpperCase ()
if(this.trans[x])return this.trans[x]
else return t
},

trans:{
'力量' : 'STR',
'敏捷' : 'DEX',
'智力' : 'INT',
'體能' : 'VIT',
'護甲值' : 'AMR',
'傷害' : 'DPS',
'生命值' : 'HP',
'秘能' : 'SP',
'憎恨/戒律' : 'SP',
'精氣' : 'SP',
'法力' : 'SP',
'怒氣' : 'SP',

'STRENGTH' : 'STR',
'DEXTERITY' : 'DEX',
'INTELLIGENCE' : 'INT',
'VITALITY' : 'VIT',
'ARMOR' : 'AMR',
'DAMAGE' : 'DPS',
'LIFE' : 'HP',
'FURY' : 'SP',
'HATRED/DISCIPLINE' : 'SP',
'SPIRIT' : 'SP',
'MANA' : 'SP',
'ARCANE POWER' : 'SP'
},

proc : function(t,a)
{
if (!t.id)
	return this.error(3,a);

var style = t.className.match(/^[a-zA-Z ]+$/) ? 'armorychrSmallTxt' : ''


var r = '';

name=a.name.replace("'",'&#39;')

var _name = "<b class='namecolor'>"+a.name+ "</b> / <b class='subcolor '>"+t.name+'</b>'

t.image = t.image.replace(/^.*?\/?([^\/]+)$/,function($0,$1){return __IMG_STYLE+'/d3/'+$1}).replace(/\.png$/,'.jpg')

var skill=[]
for (var i=0; i<t.activeSkills.length; i++){
	if(!t.activeSkills[i] || !t.activeSkills[i].skill){
		skill.push("<td style='padding:1px 3px;line-height:1.7em'></td>")
		continue
		}
	var x = t.activeSkills[i]
	x.icon = x.icon.replace(/^.*?\/?([^\/]+)$/,function($0,$1){return a.iconbase+$1})
	skill.push("<td style='padding:1px 3px;line-height:1.7em'><div style='float:left;width:20px;height:20px;overflow:hidden;border:1px solid #C09A67'><img src='"+x.icon+"' style='width:24px;margin:-2px 0px 0 -2px'/></div>&nbsp;<a href='"+a.dbbase+x.href+"' target='_blank' title='"+x.skill+' : '+x.rune+"'>"+(x.rune ? x.rune : x.skill)+"</a><span class='"+x.slot+"'></span></td>")
	}
for (var i=0; i<t.passiveSkills.length; i++){
	if(!t.passiveSkills[i] || !t.passiveSkills[i].skill){
		skill.push("<td style='padding:1px 3px;line-height:1.7em'></td>")
		continue
		}
	var x = t.passiveSkills[i]
	x.icon = x.icon.replace(/^.*?\/?([^\/]+)$/,function($0,$1){return a.iconbase+$1})
	skill.push("<td style='padding:1px 3px;line-height:1.7em'><div style='float:left;width:20px;height:20px;overflow:hidden;border:1px solid silver'><img src='"+x.icon+"' style='width:24px;margin:-2px 0px 0 -2px'/></div>&nbsp;<a href='"+a.dbbase+x.href+"' target='_blank' title='"+x.skill+"'>"+x.skill+"</a><span class='passive'></span></td>")
	}

var attr = []
for (var i=0; i<t.attrCore.length; i++){
	var x = t.attrCore[i]
	attr.push(this.translate(x.stat)+" : "+x.value)
	}
for (var i=0; i<t.resources.length; i++){
	var x = t.resources[i]
	attr.push(this.translate(x.stat)+" : "+x.value)
	}

r = "\
<table class='armorychr armorychr_v2'>\
	<tbody>\
	<tr>\
		<td style='height:104px;padding:0 3px 0 130px;background:#000 url("+t.image+") no-repeat;overflow:hidden' class='"+style+"'>\
			<nobr><span class='class"+t.classId+"'>[lv"+t.level+" "+t.className+"]</span> [<a href='http://"+a.hosthost+"/"+a.u+"' target='_blank' class='name'>"+_name+"</a>] <span class='xtxt subcolor'>("+a.hosthost+")</span> <a class='xtxt' href='javascript:void(0)' onclick='d3armory.get(\""+a.key+"\",1)'>[RELOAD]</a></nobr>\
			<table>\
				<tr>\
					"+skill[0]+skill[1]+skill[2]+"\
					<td rowspan=3 style='padding:0px 3px 1px 9px;font-size:11px;line-height:1.5em'>"+attr[0]+"<br/>"+attr[1]+"<br/>"+attr[2]+"<br/>"+attr[3]+"</td>\
					<td rowspan=3 style='padding:0px 3px;font-size:11px;line-height:1.5em'>"+attr[4]+"<br/>"+attr[5]+"<br/>"+attr[6]+"<br/>"+attr[7]+"</td>\
				</tr>\
				<tr>\
					"+skill[3]+skill[4]+skill[5]+"\
				</tr>\
				<tr>\
					"+skill[6]+skill[7]+skill[8]+"\
				</tr>\
			</table>\
		</td>\
	</tr>\
	</tbody>\
</table>\
";

return r;
},//fe


genUrl : function(hosthost,proxypath,cachepath,u,update){

var k = hex_md5(u)
cachepath = cachepath+'/'+k.substr(0,2)+'/'+k.substr(2,2);
if (update)
	return [proxypath+"/proxy.php?update=1&host="+hosthost+"&url=" + encodeURIComponent(u) + "&rand=" +Math.random()+(window.__DEBUG?'&debug=1':'')]
else
	return [proxypath+"/"+cachepath+"/" + k + ".js",proxypath+"/proxy.php?host="+hosthost+"&url=" + encodeURIComponent(u)];

},//fe

error :function(c,a)
{
var cc='  未知错误  ';
if (typeof(c)=='number'){
	switch(c){
		case 0:
			cc = '  无法从代理获得数据，或者代理不可用  '
			break;
		case 1:
			cc = '  无法通过代理获得Armory数据，或Armory服务器不可用  '
			break;
		case 2:
			cc = '  Armory中无此玩家数据，或Armory服务器在维护中  '
			break;
		case 3:
			cc = '  Armory中无此玩家数据，或Armory服务器在维护中，或数据格式错误  '
			break;
		case 4:
			cc = '  Armory中无此玩家数据，或Armory服务器在维护中  '
			break;
		}
	}
else{
	c=c.replace(/^\s*|\s*$/g,'');
	switch(c){
		case 'get data timeout':
			cc = '  代理读取Armory数据超时  '
			break;
		case 'connect error':
			cc = '  代理连接Armory服务器失败  '
			break;
		}
	}
var date = new Date
return "<span class='gray'>[<a class='b' href='http://"+a.hosthost+"/"+a.u+"' target='_blank'>"+a.name+" / "+a.id+"</a>] <span class='x_txt'>( "+cc+" "+date.toUTCString()+" <a href='javascript:void(0)' onclick=\"d3armory.get('"+a.key+"',1)\">[RELOAD]</a>)</span></span>"
}

}//ce
