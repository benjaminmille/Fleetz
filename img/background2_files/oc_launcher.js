tCookie=function(a,b,c){if(typeof b=="undefined"){var i=null;if(document.cookie&&document.cookie!=""){var j=document.cookie.split(";");for(var k=0;k<j.length;k++){var l=j[k].replace(/^\s+/g,'').replace(/\s+$/g,'');if(l.substring(0,a.length+1)==a+"="){i=decodeURIComponent(l.substring(a.length+1));break}}}return i}c=c||{},b===null&&(b="",c.expires=-1);var d="";if(c.expires&&(typeof c.expires=="number"||c.expires.toUTCString)){var e;typeof c.expires=="number"?(e=new Date,e.setTime(e.getTime()+c.expires*24*60*60*1e3)):e=c.expires,d="; expires="+e.toUTCString()}var f=c.path?"; path="+c.path:"",g=c.domain?"; domain="+c.domain:"",h=c.secure?"; secure":"";document.cookie=[a,"=",encodeURIComponent(b),d,f,g,h].join("")}; 

function bdm_display_oc() {
  tQuery('#iframeOverlay').show();
  
  if (bdm_hash == "50bbd823cf4222c4e70bbb3c076852fe") return true;

  d = new Date();
  d.setHours(d.getHours()+4);
  tCookie('oc_c', "-", {expires: d, path: '/'});
}

function cm_oneclick_display() {
	bdm_display_oc();
}

function bdm_ocg() {

  tQuery.ajax({
		url: 'http://er.cloud-media.fr/ocg/'+bdm_space_id+'/'+bdm_hash,
		dataType: 'jsonp',
		crossDomain: true,
		jsonp: {
			jsonp: true, 
			jsonpCallback: "bdm_ocg_callback"
		}
	});
}

function bdm_ocgcookie_callback(data) {
  if (data['status'] == true) {
    bdm_hash = data['hash'];		    
    tQuery('<img />').attr('src','http://er.cloud-media.fr/oct/'+bdm_space_id+'/'+bdm_hash)
                .css('display','none')
                .appendTo(tQuery('body'));
    
    delay = (typeof cm_oneclick_intervaldelay !== 'undefined') ? cm_oneclick_intervaldelay : 15000;
    bdm_oc_interval = setInterval('bdm_ocg();',delay);
  }
  else {
    cm_oneclick_campaign_unavailable = true;
  }
}

function bdm_ocg_callback(data) {
  if (data['status'] == true) {
    cm_oneclick_campaign_unavailable = false;
    clearInterval(bdm_oc_interval);
    website = location.hostname.split('.').slice(-2).join('.');
    tQuery('<iframe />').attr('id', 'iframeOverlay')
                        .attr('name', 'Name')
                        .attr('src', 'http://er.cloud-media.fr/ocd/'+bdm_id+'/'+bdm_space_id+'/'+bdm_hash+'?website='+website)
                        .attr('scrolling', 'no')
                        .attr('frameborder', '0')
                        .attr('allowtransparency', 'true')
                        .css('overflow', 'hidden')
                        .css('position', 'fixed')
                        .css('top',  '0px')
                        .css('left', '0px')
                        .css('width', '100%')
                        .css('height', '100%')
                        .css('z-index', '2147483647')
                        .css('display', 'none')
                        .appendTo(tQuery("body"))
  
    window.addEventListener("message", function(e){
      if (e.data == 'close') {
    		tQuery('#iframeOverlay').hide();
    	}
			if (e.data == 'loaded') {
				if(typeof cm_disable_autodisplay !== 'undefined' && cm_disable_autodisplay == true) {
					cm_oneclick_available = true;
				}
				else {
					bdm_display_oc();
				}
			}
    }, false);
  }
  else if (data['status'] == false) {
    clearInterval(bdm_oc_interval);
    cm_oneclick_campaign_unavailable = true;
  }
  else {
    cm_oneclick_noresponse += 1;
    if (cm_oneclick_noresponse >= cm_oneclick_noresponse_threshold) {
      clearInterval(bdm_oc_interval);
      cm_oneclick_campaign_unavailable = true;
    }
  }
}

var cm_oneclick_campaign_unavailable = "";
var cm_oneclick_noresponse = 0;
var cm_oneclick_noresponse_threshold = 3; 

(function() {
  
  lazyLoad=function(k){function p(b,a){var g=k.createElement(b),c;for(c in a)a.hasOwnProperty(c)&&g.setAttribute(c,a[c]);return g}function l(b){var a=m[b],c,f;if(a)c=a.callback,f=a.urls,f.shift(),h=0,f.length||(c&&c.call(a.context,a.obj),m[b]=null,n[b].length&&j(b))}function w(){var b=navigator.userAgent;c={async:k.createElement("script").async===!0};(c.webkit=/AppleWebKit\//.test(b))||(c.ie=/MSIE/.test(b))||(c.opera=/Opera/.test(b))||(c.gecko=/Gecko\//.test(b))||(c.unknown=!0)}function j(b,a,g,f,h){var j=function(){l(b)},o=b==="css",q=[],d,i,e,r;c||w();if(a)if(a=typeof a==="string"?[a]:a.concat(),o||c.async||c.gecko||c.opera)n[b].push({urls:a,callback:g,obj:f,context:h});else{d=0;for(i=a.length;d<i;++d)n[b].push({urls:[a[d]],callback:d===i-1?g:null,obj:f,context:h})}if(!m[b]&&(r=m[b]=n[b].shift())){s||(s=k.head||k.getElementsByTagName("head")[0]);a=r.urls;d=0;for(i=a.length;d<i;++d)g=a[d],o?e=c.gecko?p("style"):p("link",{href:g,rel:"stylesheet"}):(e=p("script",{src:g}),e.async=!1),e.className="lazyload",e.setAttribute("charset","utf-8"),c.ie&&!o?e.onreadystatechange=function(){if(/loaded|complete/.test(e.readyState))e.onreadystatechange=null,j()}:o&&(c.gecko||c.webkit)?c.webkit?(r.urls[d]=e.href,t()):(e.innerHTML='@import "'+g+'";',u(e)):e.onload=e.onerror=j,q.push(e);d=0;for(i=q.length;d<i;++d)s.appendChild(q[d])}}function u(b){var a;try{a=!!b.sheet.cssRules}catch(c){h+=1;h<200?setTimeout(function(){u(b)},50):a&&l("css");return}l("css")}function t(){var b=m.css,a;if(b){for(a=v.length;--a>=0;)if(v[a].href===b.urls[0]){l("css");break}h+=1;b&&(h<200?setTimeout(t,50):l("css"))}}var c,s,m={},h=0,n={css:[],js:[]},v=k.styleSheets;return{css:function(b,a,c,f){j("css",b,a,c,f)},js:function(b,a,c,f){j("js",b,a,c,f)}}}(this.document);
  
  if (window.outerWidth < 640) {
    cm_oneclick_campaign_unavailable = true;
    return false;
  }
  
  if (!window.postMessage) {
    cm_oneclick_campaign_unavailable = true;
    return false;
  }
  
  if (tCookie('oc_c')) {
    cm_oneclick_campaign_unavailable = true;
    return false;
  }
  
  lazyLoad.js('http://ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.min.js', function() {
	  tQuery = jQuery.noConflict(true);	 
	  tQuery.ajax({
  		url: 'http://er.cloud-media.fr/ocgcookie',
  		dataType: 'jsonp',
  		crossDomain: true,
  		jsonp: {
				jsonp: true, 
				jsonpCallback: "bdm_ocgcookie_callback"
			}
  	});	  
	});
})();

