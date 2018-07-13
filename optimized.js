
sessionStorage.setItem('key', 'value');

var data = sessionStorage.getItem('key');


console.log(data);

browser.browserAction.onClicked.addListener(cancel2);


//ارتباط با حافظه
function cancel2() {
chrome.storage.local.get("active", items=>{
	console.log(items.active);
	active = items.active;
	
	if(items.active){
	browser.storage.local.set({active:false});
	  browser.browserAction.setIcon({path: "Tele2.ico"});
	}else{
	browser.storage.local.set({active:true});
	browser.browserAction.setIcon({path: "Not_optimum.png"});
	}
	});
}



// match pattern for the URLs to redirect
var pattern = "<all_urls>";
var pattern1 = ".ansarbank.com/ .antiplagiat.ru .bale.ai .eitaa.com/ .libgen.pw/ .mycdn.me .php.net/ .researchgate.net/ .rsl.ru .sfedu.ru/ centrinvest.ru dissercat.com facebook.com fadak.ir fbcdn.net google.com google.ru igap.net ok.ru skype.com tele2.ru translate.google.com translate.googleusercontent.com twirpx.com userapi.com vk.com vk-cdn.net vkuserlive.com vkuservideo.net whatsapp.com wikimedia.org wikipedia.org wiktionary.org aaatec.academia.edu cdn.reverso.net/ context.reverso.net/ dictionary.abadis.ir/ elibrary.ru/ fromtexttospeech.com/ journals.sndu.ac.ir/ linguee.ru/ panel.hiweb.ir/ vajehyab.com/ .amazon.com www.ldoceonline.com/";

// cancel function returns an object
// which contains a property `cancel` set to `true`
function cancel(requestDetails) {
	
	
		console.log(active);
	
 // console.log("Cancelingaa: " + requestDetails.url.substring(2));
if(pattern1.indexOf(getDomain(requestDetails.url))<0 && active){
	 console.log("Canceling: " + getDomain(requestDetails.url));
	 return {cancel: true};
}else{
		 console.log("Allow: " + getDomain(requestDetails.url));

	
}
}

// add the listener,
// passing the filter argument and "blocking"
browser.webRequest.onBeforeRequest.addListener(
  cancel,
  {urls: [pattern]},
  ["blocking"]
);


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