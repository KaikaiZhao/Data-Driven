var gapi=window.gapi=window.gapi||{};gapi._bs=new Date().getTime();(function(){var k=void 0,n=!0,p=null,q=!1,aa=encodeURIComponent,r=window,ba=Object,u=document,v=String,ca=decodeURIComponent;function da(a,b){return a.type=b}var ea="appendChild",w="push",x="test",fa="exec",y="replace",ga="getElementById",A="concat",B="indexOf",ha="match",ia="readyState",D="createElement",ja="firstChild",E="setAttribute",ka="getTime",la="getElementsByTagName",G="length",H="split",J="location",K="style",ma="call",L="getAttribute",M="href",na="action",N="apply",O="parentNode",Q="join",R="toLowerCase";var S=r,T=u,oa=S[J],pa=function(){},qa=/\[native code\]/,U=function(a,b,c){return a[b]=a[b]||c},ra=function(a){for(var b=0;b<this[G];b++)if(this[b]===a)return b;return-1},sa=/&/g,ta=/</g,ua=/>/g,va=/"/g,wa=/'/g,xa=function(a){return v(a)[y](sa,"&amp;")[y](ta,"&lt;")[y](ua,"&gt;")[y](va,"&quot;")[y](wa,"&#39;")},V=function(){var a;if((a=ba.create)&&qa[x](a))a=a(p);else{a={};for(var b in a)a[b]=k}return a},W=function(a,b){return ba.prototype.hasOwnProperty[ma](a,b)},ya=function(a){if(qa[x](ba.keys))return ba.keys(a);
var b=[],c;for(c in a)W(a,c)&&b[w](c);return b},za=function(a,b){a=a||{};for(var c in a)W(a,c)&&(b[c]=a[c])},X=U(S,"gapi",{});var Aa=function(a,b,c){var f=RegExp("([#].*&|[#])"+b+"=([^&#]*)","g");b=RegExp("([?#].*&|[?#])"+b+"=([^&#]*)","g");if(a=a&&(f[fa](a)||b[fa](a)))try{c=ca(a[2])}catch(d){}return c},Ba=/^([^?#]*)(\?([^#]*))?(\#(.*))?$/,Ca=function(a){a=a[ha](Ba);var b=V();b.j=a[1];b.c=a[3]?[a[3]]:[];b.e=a[5]?[a[5]]:[];return b},Da=function(a){return a.j+(0<a.c[G]?"?"+a.c[Q]("&"):"")+(0<a.e[G]?"#"+a.e[Q]("&"):"")},Ea=function(a){var b=[];if(a)for(var c in a)W(a,c)&&a[c]!=p&&b[w](aa(c)+"="+aa(a[c]));return b},Fa=function(a,
b,c){a=Ca(a);a.c[w][N](a.c,Ea(b));a.e[w][N](a.e,Ea(c));return Da(a)};var Ga=function(a,b,c){if(S[b+"EventListener"])S[b+"EventListener"]("message",a,q);else if(S[c+"tachEvent"])S[c+"tachEvent"]("onmessage",a)};var Y;Y=U(S,"___jsl",V());U(Y,"I",0);U(Y,"hel",10);var Ha=function(a){return!Y.dpo?Aa(a,"jsh",Y.h):Y.h},Ia=function(a){return U(U(Y,"H",V()),a,V())};var Ja=U(Y,"perf",V()),La=U(Ja,"g",V()),Ma=U(Ja,"i",V());U(Ja,"r",[]);V();V();var Na=function(a,b,c){var f=Ja.r;"function"===typeof f?f(a,b,c):f[w]([a,b,c])},Oa=function(a,b,c){La[a]=!b&&La[a]||c||(new Date)[ka]();Na(a)},Qa=function(a,b,c){b&&0<b[G]&&(b=Pa(b),c&&0<c[G]&&(b+="___"+Pa(c)),28<b[G]&&(b=b.substr(0,28)+(b[G]-28)),c=b,b=U(Ma,"_p",V()),U(b,c,V())[a]=(new Date)[ka](),Na(a,"_p",c))},Pa=function(a){return a[Q]("__")[y](/\./g,"_")[y](/\-/g,"_")[y](/\,/g,"_")};var Ra=V(),Sa=[],Z;Z={b:"callback",o:"sync",l:"config",d:"_c",g:"h",p:"platform",k:"jsl",TIMEOUT:"timeout",n:"ontimeout",t:"mh",q:"u"};Sa[w]([Z.k,function(a){for(var b in a)if(W(a,b)){var c=a[b];"object"==typeof c?Y[b]=U(Y,b,[])[A](c):U(Y,b,c)}if(b=a[Z.q])a=U(Y,"us",[]),a[w](b),(b=/^https:(.*)$/[fa](b))&&a[w]("http:"+b[1])}]);var Ta=decodeURI("%73cript");Ra.m=function(a){var b=Y.ms||"https://apis.google.com";a=a[0];if(!a||0<=a[B](".."))throw"Bad hint";return b+"/"+a[y](/^\//,"")};
var Ua=function(a){return a[Q](",")[y](/\./g,"_")[y](/-/g,"_")},Va=function(a,b){for(var c=[],f=0;f<a[G];++f){var d=a[f];d&&0>ra[ma](b,d)&&c[w](d)}return c},Wa=/^[\/_a-zA-Z0-9,.\-!:=]+$/,Xa=/^https?:\/\/[^\/\?#]+\.google\.com(:\d+)?\/[^\?#]+$/,Ya=/\/cb=/g,Za=/\/\//g,$a=function(a){var b=T[D](Ta);b[E]("src",a);b.async="true";a=T[la](Ta)[0];a[O].insertBefore(b,a)},bb=function(a,b){var c=b||{};"function"==typeof b&&(c={},c[Z.b]=b);var f=c,d=f&&f[Z.d];if(d)for(var h=0;h<Sa[G];h++){var e=Sa[h][0],g=Sa[h][1];
g&&W(d,e)&&g(d[e],a,f)}f=a?a[H](":"):[];if(!(d=c[Z.g]))if(d=Ha(oa[M]),!d)throw"Bad hint";h=d;e=U(Y,"ah",V());if(!e["::"]||!f[G])ab(f||[],c,h);else{d=[];for(g=p;g=f.shift();){var j=g[H]("."),j=e[g]||e[j[1]&&"ns:"+j[0]||""]||h,m=d[G]&&d[d[G]-1]||p,l=m;if(!m||m.hint!=j)l={hint:j,i:[]},d[w](l);l.i[w](g)}var s=d[G];if(1<s){var t=c[Z.b];t&&(c[Z.b]=function(){0==--s&&t()})}for(;f=d.shift();)ab(f.i,c,f.hint)}},ab=function(a,b,c){var f=a.sort();a=[];for(var d=k,h=0;h<f[G];h++){var e=f[h];e!=d&&a[w](e);d=e}a=
a||[];var g=b[Z.b],j=b[Z.l],d=b[Z.TIMEOUT],m=b[Z.n],l=p,s=q;if(d&&!m||!d&&m)throw"Timeout requires both the timeout parameter and ontimeout parameter to be set";var f=U(Ia(c),"r",[]).sort(),t=U(Ia(c),"L",[]).sort(),C=[][A](f),P=function(a,b){if(s)return 0;S.clearTimeout(l);t[w][N](t,z);var d=((X||{}).config||{}).update;d?d(j):j&&U(Y,"cu",[])[w](j);if(b){Qa("me0",a,C);try{cb(function(){var a;a=c===Ha(oa[M])?U(X,"_",V()):V();a=U(Ia(c),"_",a);b(a)})}finally{Qa("me1",a,C)}}g&&g();return 1};0<d&&(l=S.setTimeout(function(){s=
n;m()},d));var z=Va(a,t);if(z[G]){var z=Va(a,f),I=U(Y,"CP",[]),F=I[G];I[F]=function(a){if(!a)return 0;Qa("ml1",z,C);var b=function(){I[F]=p;return P(z,a)};if(0<F&&I[F-1])I[F]=b;else for(b();(b=I[++F])&&b(););};if(z[G]){var Ka="loaded_"+Y.I++;X[Ka]=function(a){I[F](a);X[Ka]=p};a=c[H](";");a=(d=Ra[a.shift()])&&d(a);if(!a)throw"Bad hint:"+c;d=a=a[y]("__features__",Ua(z))[y](/\/$/,"")+(f[G]?"/ed=1/exm="+Ua(f):"")+("/cb=gapi."+Ka);h=d[ha](Za);e=d[ha](Ya);if(!e||!(1===e[G]&&Xa[x](d)&&Wa[x](d)&&h&&1===h[G]))throw"Bad URL "+
a;f[w][N](f,z);Qa("ml0",z,C);b[Z.o]||S.___gapisync?(b=a,"loading"!=T[ia]?$a(b):T.write("<"+Ta+' src="'+encodeURI(b)+'"></'+Ta+">")):$a(a)}else I[F](pa)}else P(z)};var cb=function(a){if(Y.hee&&0<Y.hel)try{return a()}catch(b){Y.hel--,bb("debug_error",function(){r.___jsl.hefn(b)})}else return a()};X.load=function(a,b){return cb(function(){return bb(a,b)})};var db=function(a){var b=r.___jsl=r.___jsl||{};b[a]=b[a]||[];return b[a]},eb=function(a){var b=r.___jsl=r.___jsl||{};b.cfg=!a&&b.cfg||{};return b.cfg},fb=function(a){return"object"===typeof a&&/\[native code\]/[x](a[w])},gb=function(a,b){if(b)for(var c in b)b.hasOwnProperty(c)&&(a[c]&&b[c]&&"object"===typeof a[c]&&"object"===typeof b[c]&&!fb(a[c])&&!fb(b[c])?gb(a[c],b[c]):b[c]&&"object"===typeof b[c]?(a[c]=fb(b[c])?[]:{},gb(a[c],b[c])):a[c]=b[c])},$=function(a){if(!a)return eb();a=a[H]("/");for(var b=
eb(),c=0,f=a[G];b&&"object"===typeof b&&c<f;++c)b=b[a[c]];return c===a[G]&&b!==k?b:k};var hb=U(Y,"rw",V());var ib=function(a){var b;a[ha](/^https?%3A/i)&&(b=ca(a));a=b?b:a;b=u[D]("div");var c=u[D]("a");c.href=a;b[ea](c);b.innerHTML=b.innerHTML;a=v(b[ja][M]);b[O]&&b[O].removeChild(b);return a},jb=function(a){a=a||"canonical";for(var b=u[la]("link"),c=0,f=b[G];c<f;c++){var d=b[c],h=d[L]("rel");if(h&&h[R]()==a&&(d=d[L]("href")))return ib(d)}return r[J][M]};var kb={allowtransparency:"true",frameborder:"0",hspace:"0",marginheight:"0",marginwidth:"0",scrolling:"no",style:"",tabindex:"0",vspace:"0",width:"100%"},lb=0,mb=function(a,b,c,f,d,h){var e;try{e=a[D]('<iframe frameborder="'+xa(c.frameborder)+'" scrolling="'+xa(c.scrolling)+'" name="'+xa(c.name)+'"/>')}catch(g){e=a[D]("iframe")}for(var j in c)a=c[j],"style"==j&&"object"===typeof a?za(a,e[K]):e[E](j,c[j]);if(!h||!h.dontClear)for(;b[ja];)b.removeChild(b[ja]);b[ea](e);c.allowtransparency&&(e.allowTransparency=
n);return e};var nb=mb,mb=function(a,b,c,f,d,h){if((h||{}).allowPost&&2E3<f[G]){h=Ca(f);c.src="";c["data-postorigin"]=h.j;c=nb(a,b,c,f,d);var e;if(-1!=navigator.userAgent[B]("WebKit")){e=b[ja].contentWindow.document;e.open();f=e[D]("div");var g={},j=d+"_inner";g.name=j;g.src="";g.style="display:none";nb(a,f,g,"",j)}g=(f=h.c[0])?f[H]("&"):[];f=[];for(j=0;j<g[G];j++){var m=g[j][H]("=",2);f[w]([ca(m[0]),ca(m[1])])}h.c=[];g=Da(h);h=a[D]("form");h.action=g;h.method="POST";h.target=d;h[K].display="none";for(d=0;d<f[G];d++)g=
a[D]("input"),da(g,"hidden"),g.name=f[d][0],g.value=f[d][1],h[ea](g);b[ea](h);h.submit();h[O].removeChild(h);e&&e.close();a=c}else a=nb(a,b,c,f,d);return a};var ob=/:([a-zA-Z_]+):/g,pb={style:"position:absolute;top:-10000px;width:300px;margin:0px;borderStyle:none"},qb="onPlusOne _ready _close,_open _resizeMe _renderstart oncircled".split(" "),rb=p,sb=U(Y,"WI",V()),tb=function(){var a=$("googleapis.config/sessionIndex");a==p&&(a=r.__X_GOOG_AUTHUSER);if(a==p){var b=r.google;b&&(a=b.authuser)}a==p&&(a=k,a==p&&(a=r[J][M]),a=a?Aa(a,"authuser")||p:p);return a==p?p:v(a)},ub=function(a,b){if(!rb){var c=$("iframes/:socialhost:"),f=tb()||"0",d=tb();rb={socialhost:c,
session_index:f,session_prefix:d!==k&&d!==p&&""!==d?"u/"+d+"/":"",im_prefix:$("googleapis.config/signedIn")===q?"_/im/":""}}return rb[b]||""},vb=["style","data-gapiscan"],wb=function(a){var b=k;"number"===typeof a?b=a:"string"===typeof a&&(b=parseInt(a,10));return b},xb=function(){};var yb,zb,Ab,Bb,Cb,Db=/(?:^|\s)g-((\S)*)(?:$|\s)/,Eb={div:n,span:n};yb=U(Y,"SW",V());zb=U(Y,"SA",V());Ab=U(Y,"SM",V());Bb=U(Y,"FW",[]);Cb=p;
var Gb=function(a,b){Fb(k,q,a,b)},Fb=function(a,b,c,f){Oa("ps0",n);c=("string"===typeof c?u[ga](c):c)||T;var d;d=T.documentMode;if(c.querySelectorAll&&(!d||8<d)){d=f?[f]:ya(yb)[A](ya(zb))[A](ya(Ab));for(var h=[],e=0;e<d[G];e++){var g=d[e];h[w](".g-"+g,"g\\:"+g)}d=c.querySelectorAll(h[Q](","))}else d=c[la]("*");c=V();for(h=0;h<d[G];h++){e=d[h];var j=e,g=f,m=j.nodeName[R](),l=k;j[L]("data-gapiscan")?g=p:(0==m[B]("g:")?l=m.substr(2):(j=(j=v(j.className||j[L]("class")))&&Db[fa](j))&&(l=j[1]),g=l&&(yb[l]||
zb[l]||Ab[l])&&(!g||l===g)?l:p);g&&(e[E]("data-gapiscan",n),U(c,g,[])[w](e))}if(b)for(var s in c){b=c[s];for(f=0;f<b[G];f++)b[f][E]("data-onload",n)}for(var t in c)Bb[w](t);Oa("ps1",n);((s=Bb[Q](":"))||a)&&X.load(s,a);if(Hb(Cb||{}))for(var C in c){a=c[C];t=0;for(b=a[G];t<b;t++)a[t].removeAttribute("data-gapiscan");Ib(C)}else{f=[];for(C in c){a=c[C];t=0;for(b=a[G];t<b;t++){e=a[t];d=C;g=h=e;e=V();l=0!=g.nodeName[R]()[B]("g:");j=0;for(m=g.attributes[G];j<m;j++){var P=g.attributes[j],z=P.name,P=P.value;
0<=ra[ma](vb,z)||(l&&0!=z[B]("data-")||"null"===P)||(l&&(z=z.substr(5)),e[z[R]()]=P)}l=e;g=g[K];(j=wb(g&&g.height))&&(l.height=v(j));(g=wb(g&&g.width))&&(l.width=v(g));Jb(d,h,e,f,b)}}Kb(s,f)}},Lb=function(a){var b=U(X,a,{});b.go||(b.go=function(b){return Gb(b,a)},b.render=function(b,f){var d=f||{};da(d,a);var h=d.type;delete d.type;var e=("string"===typeof b?u[ga](b):b)||k,g={},j;for(j in d)W(d,j)&&(g[j[R]()]=d[j]);g.rd=1;d=[];Jb(h,e,g,d,0);Kb(h,d)})};var Ib=function(a,b){var c=U(Y,"watt",V())[a];b&&c?c(b):X.load(a,function(){var c=U(Y,"watt",V())[a],d=b&&b.iframeNode;!d||!c?(0,X[a].go)(d&&d[O]):c(b)})},Hb=function(){return q},Kb=function(){},Jb=function(a,b,c,f,d){switch(Mb(b,a)){case 0:Nb(a+"_annotation",b,c);break;case 1:Nb(a,b,c);break;case 2:if(b[O]){var h,e;h=e=a;"plus"==a&&c[na]&&(e=a+"_"+c[na],h=a+"/"+c[na]);(e=$("iframes/"+e+"/url"))||(e=":socialhost:/_/widget/render/"+h);h=e[y](ob,ub);e={};za(c,e);e.hl=$("lang")||"en-US";e.origin=r[J].origin||
r[J].protocol+"//"+r[J].host;e.exp=$("iframes/"+a+"/params/exp");switch(a){case "plus":var g;g=e[M];var j=c[na]?k:"publisher";g=(g="string"==typeof g?g:k)?ib(g):jb(j);e.url=g;delete e[M];break;case "plusone":e.url=c[M]?ib(c[M]):jb();g=c.db;j=$();g==p&&j&&(g=j.db,g==p&&(g=j.gwidget&&j.gwidget.db));e.db=g||k;g=c.ecp;j=$();g==p&&j&&(g=j.ecp,g==p&&(g=j.gwidget&&j.gwidget.ecp));e.ecp=g||k;delete e[M];break;case "signin":e.url=jb()}e.hl=$("lang")||"en-US";Y.ILI&&(e.iloader="1");delete e["data-onload"];
delete e.rd;g=$("inline/css");"undefined"!==typeof g&&(0<d&&g>=d)&&(e.ic="1");g=/^#|^fr-/;d={};for(var m in e)W(e,m)&&g[x](m)&&(d[m[y](g,"")]=e[m],delete e[m]);m=[][A](qb);g=$("iframes/"+a+"/methods");"object"===typeof g&&qa[x](g[w])&&(m=m[A](g));for(var l in c)if(W(c,l)&&/^on/[x](l)&&("plus"!=a||"onconnect"!=l))m[w](l),delete e[l];delete e.callback;d._methods=m[Q](",");h=Fa(h,e,d);c.rd?l=b:(l=u[D]("div"),b[E]("data-gapistub",n),l[K].cssText="position:absolute;width:100px;left:-10000px;",b[O].insertBefore(l,
b));l.id||(b=l,U(sb,a,0),m="___"+a+"_"+sb[a]++,b.id=m);b=V();b[">type"]=a;za(c,b);l[E]("data-gwattr",Ea(b)[Q](":"));e=h;b=l;l={allowPost:1,attributes:pb};m=b.ownerDocument;g=0;do d=l.id||["I",lb++,"_",(new Date)[ka]()][Q]("");while(m[ga](d)&&5>++g);if(!(5>g))throw Error("Error creating iframe id");var s,j=m[J][M];g=V();var t=Aa(j,"_bsh",Y.bsh);t&&(g._bsh=t);(j=Ha(j))&&(g.jsh=j);j=V();j.id=d;j.parent=m[J].protocol+"//"+m[J].host;var t=Aa(m[J][M],"id",""),C=Aa(m[J][M],"pfname","");(t=t?C+"/"+t:"")&&
(j.pfname=t);l.hintInFragment?za(g,j):s=g;s=Fa(e,s,j);e=V();za(kb,e);za(l.attributes,e);e.name=e.id=d;e.src=s;b=mb(m,b,e,s,d,l);s={};s.userParams=c;s.url=h;da(s,a);s.iframeNode=b;s.id=b[L]("id");c=s.id;h=V();h.id=c;h.userParams=s.userParams;h.url=s.url;da(h,s.type);h.state=1;hb[c]=h;c=s}else c=p;c&&((h=c.id)&&f[w](h),Ib(a,c))}},Mb=function(a,b){if(a&&1===a.nodeType&&b){if(zb[b])return 1;var c;if(c=Ab[b])if(c=!!Eb[a.nodeName[R]()])c=(c=a.innerHTML)&&c[y](/^[\s\xa0]+|[\s\xa0]+$/g,"")?n:q;if(c)return 0;
if(yb[b])return 2}return p},Nb=function(a,b,c){var f={};f.iframeNode=b;f.userParams=c;Ib(a,f)};U(X,"platform",{}).go=Gb;Hb=function(a){for(var b=[Z.d,Z.k,Z.g],c=0;c<b[G]&&a;c++)a=a[b[c]];b=Ha(oa[M]);return!a||0!=a[B]("n;")&&0!=b[B]("n;")&&a!==b};Kb=function(a,b){var c=function(){Ga(f,"remove","de")},f=function(f){var e=f.data,g=f.origin;if(Ob(e,b)){var j=d;d=q;j&&Oa("rqe");bb(a,function(){j&&Oa("rqd");c();for(var a=U(Y,"RPMQ",[]),b=0;b<a[G];b++)a[b]({data:e,origin:g})})}};if(!(0===b[G]||!r.JSON||!r.JSON.parse)){var d=n;Ga(f,"add","at");bb(a,c)}};
Sa[w]([Z.p,function(a,b,c){Cb=c;b&&Bb[w](b);for(b=0;b<a[G];b++)yb[a[b]]=n;var f=c[Z.d].annotation||[];for(b=0;b<f[G];++b)zb[f[b]]=n;f=c[Z.d].bimodal||[];for(b=0;b<f[G];++b)Ab[f[b]]=n;for(b=0;b<a[G];b++)Lb(a[b]);if(b=r.__GOOGLEAPIS)b.googleapis&&!b["googleapis.config"]&&(b["googleapis.config"]=b.googleapis),U(Y,"ci",[])[w](b),r.__GOOGLEAPIS=k;eb(n);f=r.___gcfg;b=db("cu");if(f&&f!==r.___gu){var d={};gb(d,f);b[w](d);r.___gu=f}var f=db("cu"),h=u.scripts||u[la]("script")||[],d=[],e=[];e[w][N](e,U(Y,"us",
[]));for(var g=0;g<h[G];++g)for(var j=h[g],m=0;m<e[G];++m)j.src&&0==j.src[B](e[m])&&d[w](j);0==d[G]&&h[h[G]-1].src&&d[w](h[h[G]-1]);for(h=0;h<d[G];++h)if(!d[h][L]("gapi_processed")){d[h][E]("gapi_processed",n);(e=d[h])?(g=e.nodeType,e=3==g||4==g?e.nodeValue:e.textContent||e.innerText||e.innerHTML||""):e=k;if(e){for(;0==e.charCodeAt(e[G]-1);)e=e.substring(0,e[G]-1);g=k;try{g=(new Function("return ("+e+"\n)"))()}catch(l){}if("object"===typeof g)e=g;else{try{g=(new Function("return ({"+e+"\n})"))()}catch(s){}e=
"object"===typeof g?g:{}}}else e=k;e&&f[w](e)}h=db("cd");f=0;for(d=h[G];f<d;++f)gb(eb(),h[f]);h=db("ci");f=0;for(d=h[G];f<d;++f)gb(eb(),h[f]);f=0;for(d=b[G];f<d;++f)gb(eb(),b[f]);if("explicit"!=$("parsetags")){b=U(Y,"sws",[]);b[w][N](b,a);var t;if(c){var C=c[Z.b];C&&(t=function(){S.setTimeout(C,0)},delete c[Z.b])}if("complete"!==T[ia])try{Fb(k,n)}catch(P){}var z=function(){Fb(t,n)};if("complete"===T[ia])z();else{var I=q,F=function(){if(!I)return I=n,z[N](this,arguments)};S.addEventListener?(S.addEventListener("load",
F,q),S.addEventListener("DOMContentLoaded",F,q)):S.attachEvent&&(S.attachEvent("onreadystatechange",function(){"complete"===T[ia]&&F[N](this,arguments)}),S.attachEvent("onload",F))}}}]);var Pb=/^\{h\:'/,Qb=/^!_/,Ob=function(a,b){a=v(a);if(Pb[x](a))return n;a=a[y](Qb,"");if(!/^\{/[x](a))return q;try{var c=r.JSON.parse(a)}catch(f){return q}if(!c)return q;var d=c.f;return c.s&&d&&-1!=ra[ma](b,d)?("_renderstart"===c.s&&(c=c.a&&c.a[1],d=T[ga](d),c&&d&&xb(d[O],d,c)),n):q};xb=function(a,b,c){if(c.width&&c.height){a[K].cssText="";var f=c.width;c=c.height;var d=a[K];d.textIndent="0";d.margin="0";d.padding="0";d.background="transparent";d.borderStyle="none";d.cssFloat="none";d.styleFloat="none";d.lineHeight="normal";d.fontSize="1px";d.verticalAlign="baseline";a[K].display="inline-block";a=b[K];a.position="static";a.left=0;a.top=0;a.visibility="visible";f&&(a.width=f+"px");c&&(a.height=c+"px");if(f=b.id)(f=hb[f])&&(f.state=2);b["data-csi-wdt"]=(new Date)[ka]()}};Oa("bs0",n,r.gapi._bs);Oa("bs1",n);delete r.gapi._bs;})();
gapi.load("plusone",{callback:window["gapi_onload"],_c:{"jsl":{"ci":{"services":{},"lexps":[69,71,96,79,74,45,17,86,83,82,92,94,88,61,90,30],"inline":{"css":1},"report":{},"oauth-flow":{},"isPlusUser":false,"iframes":{"additnow":{"url":"https://apis.google.com/additnow/additnow.html?bsv"},"savetowallet":{"url":"https://clients5.google.com/s2w/o/savetowallet?bsv"},"plus":{"methods":["onauth"],"url":":socialhost:/u/:session_index:/_/pages/badge?bsv"},":socialhost:":"https://plusone.google.com","hangout":{"url":"https://talkgadget.google.com/widget/go?bsv"},"plus_circle":{"params":{"url":""},"url":":socialhost:/:session_prefix:_/widget/plus/circle?bsv"},"evwidget":{"params":{"url":""},"url":":socialhost:/:session_prefix:_/events/widget?bsv"},":signuphost:":"https://plus.google.com","plus_followers":{"params":{"url":""},"url":":socialhost:/_/im/_/widget/render/plus/followers?bsv"},"plusone":{"preloadUrl":["https://ssl.gstatic.com/s2/oz/images/stars/po/Publisher/sprite4-a67f741843ffc4220554c34bd01bb0bb.png"],"params":{"count":"","size":"","url":""},"url":":socialhost:/:session_prefix:_/+1/fastbutton?bsv"},"plus_share":{"params":{"url":""},"url":":socialhost:/:session_prefix:_/+1/sharebutton?plusShare\u003dtrue\u0026bsv"}},"debug":{"host":"https://plusone.google.com","reportExceptionRate":0.05,"rethrowException":true},"csi":{"rate":0.0},"googleapis.config":{"mobilesignupurl":"https://m.google.com/app/plus/oob?"}},"h":"m;/_/scs/apps-static/_/js/k\u003doz.gapi.zh_CN.5CW4ZtVzMRg.O/m\u003d__features__/am\u003dAQ/rt\u003dj/d\u003d1/rs\u003dAItRSTN7JYX27nGiPN5iA1ygMM60aqwy3w","u":"https://apis.google.com/js/plusone.js","hee":true,"fp":"6e6970db8f0b5982979b679fc10919634e019cb8","dpo":false},"platform":["plusone","plus","additnow","savetowallet","notifications","identity","hangout"],"fp":"6e6970db8f0b5982979b679fc10919634e019cb8","annotation":[],"bimodal":[]}});