// با کلید بر روی نوار ابزار متغیر اجرا می شود
browser.browserAction.onClicked.addListener(Change_Situation);

//اجرای اولیه برنامه
Change_Situation();
//ذخیره پر جلسه
function Change_Situation() {
	console.log(sessionStorage.getItem('active'));
	if(sessionStorage.getItem('active')=='true'){
	sessionStorage.setItem('active', 'false');	
	browser.browserAction.setIcon({path: "icons/lock.png"});
	}else{
	sessionStorage.setItem('active', 'true');
	browser.browserAction.setIcon({path: "icons/unlock.png"});
	}
}

// match pattern for the URLs to redirect
var pattern = "<all_urls>";
var pattern1 = ".ansarbank.com/ .antiplagiat.ru .bale.ai .eitaa.com/ .libgen.pw/ .mycdn.me .php.net/ .researchgate.net/ .rsl.ru .sfedu.ru/ centrinvest.ru dissercat.com facebook.com fadak.ir fbcdn.net google.com google.ru igap.net ok.ru skype.com tele2.ru translate.google.com translate.googleusercontent.com twirpx.com userapi.com vk.com vk-cdn.net vkuserlive.com vkuservideo.net whatsapp.com wikimedia.org wikipedia.org wiktionary.org aaatec.academia.edu cdn.reverso.net/ context.reverso.net/ dictionary.abadis.ir/ elibrary.ru/ fromtexttospeech.com/ journals.sndu.ac.ir/ linguee.ru/ panel.hiweb.ir/ vajehyab.com/ .amazon.com www.ldoceonline.com/";

// cancel function returns an object
// which contains a property `cancel` set to `true`
function cancel(requestDetails) {
	if(pattern1.indexOf(getDomain(requestDetails.url))<0 && sessionStorage.getItem('active') == 'false'){
	//	 console.log("Canceling: " + getDomain(requestDetails.url));
		 return {cancel: true};
	}
}

// add the listener,
// passing the filter argument and "blocking"
browser.webRequest.onBeforeRequest.addListener(
  cancel,
  {urls: [pattern]},
  ["blocking"]
);

/// به دست آورن نام سایت
function getHostName(url) {
    var match = url.match(/:\/\/(www[0-9]?\.)?(.[^/:]+)/i);
    if (match != null && match.length > 2 && typeof match[2] === 'string' && match[2].length > 0) {
    return match[2];
    }
    else {
        return null;
    }
}

function getDomain(url) {
    var hostName = getHostName(url);
    var domain = hostName;
    
    if (hostName != null) {
        var parts = hostName.split('.').reverse();
        
        if (parts != null && parts.length > 1) {
            domain = parts[1] + '.' + parts[0];
                
            if (hostName.toLowerCase().indexOf('.co.uk') != -1 && parts.length > 2) {
              domain = parts[2] + '.' + domain;
            }
        }
    }
    
    return domain;
}