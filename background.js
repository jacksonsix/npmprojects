// install context menu for search engine, bing,google,duckduckgo

chrome.runtime.onInstalled.addListener(function(){    
    chrome.contextMenus.create({
	title: "Add Sites",
	id: "addresult",
    });

});

chrome.contextMenus.onClicked.addListener(function(info, tab) {   
    if (info.menuItemId == "addresult") {
	chrome.tabs.sendMessage(tab.id,{'message':'addresult'}, function(response) {
	    console.log(response.hosts);
	    addLocalStorage(response.hosts);
	});
	
    }
    
});


function refresh(){
    let blackurls =  ["*://badwebsite.com/"]; 
    chrome.storage.local.get('blacksites', function(data) {
        if (data.blacksites) {
            blackurls =   data.blacksites;
        }
        chrome.webRequest.onBeforeRequest.addListener(
            function(details) {
                return {cancel: true}; 
            },
            
            {urls: blackurls,
             types: ['main_frame', 'sub_frame']
            },
            ["blocking"]);      
    });  
}

refresh();

/// listen for  messages
chrome.runtime.onMessage.addListener((request,sender,sendResponse) =>{
        editLocalStorage(request.message);
	refresh();
	sendResponse({farewell: "ok"});
  
});


function addLocalStorage(items){
    console.log(items);
    chrome.storage.local.get('blacksites', function(data) {
       
	if (data.blacksites) {
            var blackurls =   data.blacksites;   
	    var mySet = new Set();
	    blackurls.forEach( e => mySet.add(e));
	    items.forEach(e => {
		let  entry = '*://' + e.trim() +'/*';
		mySet.add(entry);
	    });
	    var  myArr = Array.from(mySet);
	    chrome.storage.local.set({'blacksites': myArr}, function() {
		refresh();
	    });
        }else{
	    var mySet = new Set();
	    items.forEach(e => {
		let  entry = '*://' + e.trim() +'/*';
		mySet.add(entry);
	    });
	    var  myArr = Array.from(mySet);
	    chrome.storage.local.set({'blacksites': myArr}, function() {
		refresh();
	    });
	    
	}
	
    });
    
}

function editLocalStorage(items){
    var mySet = new Set();
    items.forEach(e => {
	let  entry = '*://' + e.trim() +'/*';
	mySet.add(entry);
    });
    var  myArr = Array.from(mySet);
    chrome.storage.local.set({'blacksites': myArr}, function() {
	refresh();
    });

}
