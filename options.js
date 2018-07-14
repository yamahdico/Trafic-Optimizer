chrome.storage.local.get("active", items=>{
document.querySelector("#Whitelist").value = items.active;
});
function saveOptions() {
	var settingsToStore={
		active: document.querySelector("#Whitelist").value
//		appendFileNames: document.querySelector("#appendFileNames").checked,
		}
	chrome.storage.local.get("active", items=>{
	browser.storage.local.set(settingsToStore);
	});
}
document.querySelector("form").addEventListener("submit", saveOptions);