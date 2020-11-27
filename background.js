
 chrome.webRequest.onBeforeRequest.addListener(
        function(details) { return {cancel: true}; },
     {urls: ["*://www.evil.com/*",
	     "*://www.facebook.com/*",
	    "*://v.youku.com/*"]},
     ["blocking"]);


