
function burlToshow(burl){
   return burl.substring(4,burl.length-2); 
}


function getStorage(){
    chrome.storage.local.get('blacksites', function(data) {
	
        if (data.blacksites) {
            var blackurls =   data.blacksites;
	    var myList =  document.getElementById("myWeb");
	    for(var i=0;i<blackurls.length;i++){
		var l = document.createElement('li');
		var t = document.createTextNode(burlToshow(blackurls[i]));
		l.appendChild(t);
		var span = document.createElement("SPAN");
		var txt = document.createTextNode("\u00D7");
		span.className = "close";
		span.appendChild(txt);
		span.onclick = function(evt) {
		    var div = evt.target.parentElement;
		    div.parentElement.removeChild(div);
		}
		l.appendChild(span);
		myList.appendChild(l);
	    }   
        }
        
    });
}


function newElement() {
    var li = document.createElement("li");
    var inputValue = document.getElementById("myInput").value;
    
    if (inputValue === '') {
	alert("You must write something!");
    } else {
	try{
	    let u = new URL(inputValue);
	    var t = document.createTextNode(u.hostname);
	    li.appendChild(t);
	    document.getElementById("myWeb").appendChild(li);
	}catch{
	    alert("Invalid url");
	}

    }
    document.getElementById("myInput").value = "";

    var span = document.createElement("SPAN");
    var txt = document.createTextNode("\u00D7");
    span.className = "close";
    span.appendChild(txt);
    li.appendChild(span);
    span.onclick = function(evt) {
	var div = evt.target.parentElement;
	div.parentElement.removeChild(div);

    }
    
}


function save(){
    var myNodelist = document.getElementsByTagName("li");
    var entry =[];
    for(var i=0;i<myNodelist.length;i++){
	let  txt = myNodelist[i].innerText;
	let ntxt = txt.replace('\u00D7','');
        entry.push(ntxt);	
    }
    
    chrome.runtime.sendMessage({message:entry}, response =>{
    	window.close();
    });
}

document.getElementById('savebtn').addEventListener('click',save);
document.getElementById('addbtn').addEventListener('click',newElement);
getStorage();

