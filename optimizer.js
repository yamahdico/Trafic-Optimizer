// با کلید بر روی نوار ابزار متغیر اجرا می شود
browser.browserAction.onClicked.addListener(Change_Situation);

//اجرای اولیه برنامه
Change_Situation();
//ذخیره پر جلسه
function Change_Situation() {
//	console.log(sessionStorage.getItem('active'));
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

// cancel function returns an object
// which contains a property `cancel` set to `true`
var Whitelist;
function cancel(requestDetails) {
	chrome.storage.local.get("active", items=>{
	Whitelist = items.active;
	
	});
	if(Whitelist.indexOf(getDomain(requestDetails.url))<0 && sessionStorage.getItem('active') == 'false'){
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