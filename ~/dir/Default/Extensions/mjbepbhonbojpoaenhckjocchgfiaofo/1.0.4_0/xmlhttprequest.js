Registry.require(["helper","convert"],function(){var t=Registry.get("helper"),u=Registry.get("convert"),n={},z=function(b){var e=t.isLocalImage(b);return b&&4<b.length&&"http"==b.substr(0,4)||e},A={"user-agent":!0,referer:!0,origin:!0,host:!0,"proxy-connection":!0,"accept-encoding":!0,"accept-charset":!0},q=function(b,e,l){void 0===e&&(e={});void 0===l&&(l={});var m=function(a,c){if(e[a])e[a]("function"==typeof c?c():c)},f=function(a,c){e[a]&&(m(a,c),e[a]=null)},d=new XMLHttpRequest,k=function(a){var c=
"",v=b.url;if(2<d.readyState&&(c=d.getAllResponseHeaders(),4==d.readyState)){c&&(c=c.replace(/TM-finalURL[0-9a-zA-Z]*\: .*[\r\n]{1,2}/,""));var w=d.getResponseHeader("TM-finalURL"+rea.runtime.short_id);w&&(v=w)}c={readyState:d.readyState,responseHeaders:c,finalUrl:v,status:4==d.readyState?d.status:0,statusText:4==d.readyState?d.statusText:""};a&&4==d.readyState?(d.responseType?(c.responseXML=null,c.responseText=null,c.responseType=d.responseType):(c.responseXML=d.responseXML,c.responseText=d.responseText),
c.response=d.response):(c.responseXML=null,c.responseText="",c.response=null);return c},B=function(a){(function(a,b){for(var d=[],g=0,e=a.length;g<e;g+=b)d.push(a.slice(g,b+g));return d})(a,parseInt(b.partialSize)).forEach(function(a){m("onpartial",{partial:a})})},r={onload:function(){var a=k(!0);4==a.readyState&&200!=a.status&&0!=a.status&&0<b.retries?(b.retries--,q(b,e,l)):function(){if(b.convertBinary&&a.response){var c=a.responseType?a.responseType.toLowerCase():"";if("blob"==c){var d,e=new FileReader;
e.onload=function(){a.response=u.arrbuf2str(e.result);d()};e.readAsArrayBuffer(a.response);return{done:function(a){d=a}}}"arraybuffer"==c?a.response=u.arrbuf2str(a.response):"json"==c&&(a.response=JSON.stringify(a.response))}return{done:function(a){a()}}}().done(function(){if(b.partialSize&&e.onpartial){var c=b.convertBinary&&a.response?a.response:a.responseText;a.response_types={};["response","responseText","responseXML"].forEach(function(c){a.response_types[c]=!!a[c];delete a[c]});c&&(c.length>
b.partialSize?B(c):a.response_data=c)}f("onload",a);4==a.readyState&&f("ondone",a)})},onerror:function(){var a=k();4==a.readyState&&200!=a.status&&0!=a.status&&0<b.retries?(b.retries--,q(b,e,l)):(f("onerror",a),f("ondone",a))},onloadstart:function(){m("onloadstart",function(){return k()})},onreadystatechange:function(a){m("onreadystatechange",function(){var c=k();c.progress=x(a,c);return c})},onprogress:function(a){m("onprogress",function(){var c=k();return x(a,c,c)})},ontimeout:function(){var a=
k();f("ontimeout");f("ondone",a)}},p=0==Object.keys(r).concat(["ondone"]).filter(function(a){return!!e[a]}).length,x=function(a,c,b){void 0===b&&(b={});try{var e=null,g=null;if(a.lengthComputable||0<a.total)e=a.loaded,g=a.total;else{var f=Number(t.getStringBetweenTags(c.responseHeaders.toLowerCase(),"content-length:","\n").trim()),h=d.responseText?d.responseText.length:0;0==f&&(f=-1);e=a.loaded||h;g=a.total||f}b.lengthComputable=a.lengthComputable;b.loaded=e;b.done=e;b.position=e;b.total=g;b.totalSize=
g}catch(k){}return b};p||Object.keys(r).forEach(function(a){if(e[a]||-1!=["ontimeout","onload","onerror"].indexOf(a))d[a]=r[a]});try{if(!l.internal&&!z(b.url))throw Error("Invalid scheme of url: "+b.url);d.open(b.method,b.url,!p,b.user,b.password);if(b.headers)for(var h in b.headers){var y=h;n.use&&n.headers&&A[h.toLowerCase()]&&(y=n.prefix+h);d.setRequestHeader(y,b.headers[h])}"undefined"!==typeof b.overrideMimeType&&d.overrideMimeType(b.overrideMimeType);"undefined"!==typeof b.responseType&&(d.responseType=
b.responseType);"undefined"!==typeof b.timeout&&(d.timeout=b.timeout);"undefined"!==typeof b.data?d.send(b.data):d.send()}catch(a){if(console.error(a.stack),h={responseXML:"",responseText:"",response:null,readyState:4,responseHeaders:"",status:403,statusText:"Forbidden"},f("onerror",h),f("ondone",h),p)return h}if(p)return k()};Registry.register("xmlhttprequest","58",{run:q,setWebRequest:function(b){n=b}})});
