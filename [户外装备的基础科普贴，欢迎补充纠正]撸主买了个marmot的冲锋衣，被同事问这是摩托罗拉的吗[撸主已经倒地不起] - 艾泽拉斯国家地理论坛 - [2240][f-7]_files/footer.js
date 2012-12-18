document.writeln("<div id=\"footer\">");
document.writeln("	<p><a href=\"http:\/\/www.178.com\/s\/about\/about.html\" title=\"关于178\">关于178<\/a>　|　<a href=\"http:\/\/www.178.com\/s\/about\/join.html\" title=\"招聘信息\">招聘信息<\/a>　|　<a href=\"http:\/\/www.178.com\/s\/about\/guide.html\" title=\"网站地图\">网站地图</a>　|　<a href=\"http:\/\/www.178.com\/s\/about\/contactus.html\" title=\"联系我们\">联系我们<\/a><\/p>");
document.writeln("	<p>copyright © 2011 powered by 178.com　[<a href=\"http:\/\/www.178.com\/\" title=\"178首页\">178游戏网<\/a> 版权所有]<\/p>");
document.writeln("	<p>客服邮箱：<a href=\"mailto:kf@178.com\" title=\"客服邮箱\">kf@178.com<\/a>　客服电话：(010)84872184  网站突发事故：18701409178<\/p>");
document.writeln("	<p>商务电话：(010)84871126<\/p>");
document.writeln("	<p><a href=\"http:\/\/img.178.com\/www\/201103\/92953973615\/92954087567.jpg\" title=\"京网文【2011】0036-013\">京网文【2011】0036-013<\/a>　<a href=\"http:\/\/www.miibeian.gov.cn\/\" title=\"京ICP备09019508号\">京ICP备09019508号<\/a>　<a href=\"http:\/\/www.miibeian.gov.cn\/\" title=\"京ICP证090345号\">京ICP证090345号</a>　<a href=\"#\" title=\"BBS专项\">BBS专项<\/a>　京公网安备：110105001242<\/p>");
document.writeln("<\/div>");

document.writeln("<script src='http://w.cnzz.com/c.php?id=30039253' language='JavaScript' charset='gb2312'></script>");

var gaJsHost=document.createElement('script');
gaJsHost.src=("https:" == document.location.protocol) ? "https://ssl.google-analytics.com/ga.js" : "http://www.google-analytics.com/ga.js";
gaJsHost.onload = gaJsHost.onreadystatechange = function(){
   if (this.readyState && this.readyState != 'loaded' && this.readyState != 'complete'){
     return;
   }
   try {
     var pageTracker = _gat._getTracker("UA-7730459-1");
     var domain = window.location.href.toLowerCase().match(/http:\/\/(?:[^\/]+\.)?([^\/\.]+\.[^\/\.]+)(?:\/|$)/);
     pageTracker._setDomainName("."+domain[1]);
     pageTracker._trackPageview();
   } catch(err) {}
}

document.body.insertBefore(gaJsHost,document.body.firstChild);

//2010.6.29新増代码
var gaJsHost=document.createElement('script');
gaJsHost.src=("https:" == document.location.protocol) ? "https://ssl.google-analytics.com/ga.js" : "http://www.google-analytics.com/ga.js";
gaJsHost.onload = gaJsHost.onreadystatechange = function(){
	if (this.readyState && this.readyState != 'loaded' && this.readyState != 'complete'){
		return;
	}
	try {
		var pageTracker = _gat._getTracker("UA-17202304-1");
		var domain = window.location.href.toLowerCase().match(/http:\/\/(?:[^\/]+\.)?([^\/\.]+\.[^\/\.]+)(?:\/|$)/);
		pageTracker._setDomainName("."+domain[1]);
		pageTracker._trackPageview();
	} catch(err) {}
}

document.body.insertBefore(gaJsHost,document.body.firstChild);
if((/http:\/\/\w+\.178.com\/(news\/)?\d{6}\/\d+\.html/ig.test(document.location))){
	document.write('<img style="display:none" src="http://118.144.73.188/atcount.php?time='+new Date().getTime()+'"/>');
}
