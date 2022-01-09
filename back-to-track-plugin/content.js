/*
url = window.location.host;

*/
chrome.tabs.query({active: true, lastFocusedWindow: true}, tabs => {
    let url = tabs[0].url.split("/")[2];
    console.log(url);
    for(var i=0; i<localStorage.length;i++){
        if(localStorage.getItem(localStorage.key(i)) == url){
            //window.location.replace("https://google.com");
            //window.location = "https://google.com";
            //alert("wrong page");
            chrome.tabs.update({url:"https://google.com"});
           /*chrome.tabs.executeScript({
            code: `console.log('location:', window.location.href);`
          });*/
          //chrome.runtime.sendMessage({todo:"yes"});
    }
}
    // use `url` here inside the callback because it's asynchronous!
});