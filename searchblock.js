
chrome.runtime.onMessage.addListener((request,sender,sendResponse) =>{
    
    if(request && request.message =='addresult'){
	var engine = whichSearchEngine();
	var rs = null;
	var info =[];
	if(engine =='google'){
	    rs = getGoogleResult();	    	    
	}else if(engine =='bing'){
	    rs = getBingResult();
	}else if(engine =='duckduckgo'){
	    rs = getDuckResult();
	}else{
	    // do nothing
	    sendResponse({error: 'stop'});
	}

	var links = getLink(rs);
	links.forEach( e => {
	    var h = getHost(e);
	    if(h != null && h !='')
		if(!except(h))
		   info.push(h);
	});
	sendResponse({hosts: info});
    }
    
});

function except(url){
    if(url =='www.bing.com' ||
       url =='duckduckgo.com' ||
       url =='www.google.ca'){
	return true;
    }else
	return false;
}


function whichSearchEngine(){
    var m = getHost(document.URL);
    if(m =='www.bing.com')
	return 'bing';
    else if(m == 'www.google.ca')
	return 'google';
    else if(m == 'duckduckgo.com')
	return 'duckduckgo';
    else
	return 'unknown';
}

function getGoogleResult() {
    var tmp =[];
    var r = document.getElementById('search');
    r.querySelectorAll('a').forEach(e => {
	tmp.push(e.href);
    });
    return tmp;
}

function getBingResult() {
    var tmp = [];
    var r  = document.getElementById('b_results');

    r.querySelectorAll('cite').forEach(e => {
	tmp.push(e.innerText);
    });
    r.querySelectorAll('a').forEach(e => { tmp.push(e.href)});
    return tmp;

}

function getDuckResult() {
    var tmp = [];
    var r = document.getElementsByClassName('results--main')[0];
    r.querySelectorAll('a').forEach(e => { tmp.push(e.href)});
    return tmp;
    
}
function getLink(results){
    return results;
}
function getHost(link){
    var url ='';
    try{
	url = new URL(link);

    }catch{
	return null;
    }
    
    return url.hostname;
}



