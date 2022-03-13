chrome.storage.onChanged.addListener(function (changes, storageName) {
  console.log(changes.trackingStarted);
  if (changes.trackingStarted.newValue) {
    chrome.storage.sync.get(["blockLinks", 'trackingStarted'], function (data) {
      //if(data.trackingStarted){
      chrome.contextMenus.removeAll();

      allLinks = data.blockLinks;
      allLinks = $.map(allLinks, function (Links) {
        return "https://*." + Links + "/*";
      });
      // block the links function
    var url = window.location.origin; 
    var index = $.inArray(url, allLinks);
      if (index != -1) {
          //return (); blocked link
          alert("you are in wrong area")

      } 
    });

    
    // // allLinks = allLinks.map(function(links, i ){
    // //     return ("https://" + Links)
    // // })
    // // console.log(allLinks);
    // chrome.webRequest.onBeforeRequest.addListener(
    //   function () {
    //     return { cancel: true }
    //   },
    //   {
    //     urls: allLinks
    //   },
    //   ['blocking']
    // )
  }
  else {
    function validateUrl(value) {
      var expr = /^(?:(?:https?|ftp):\/\/)(?:\S+(?::\S*)?@)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,}))\.?)(?::\d{2,5})?(?:[/?#]\S*)?$/i
          ;
      var message = {};
      var regex = new RegExp(expr);
      if (value.match(regex)) {
          if (duplicateUrl(value,links) == true) {
              message['valid'] = true;
              message['description'] = "valid";
              message['title'] = "Valid url";
          } else {
              message['valid'] = false;
              message['description'] = "The link entered is already in the list.";
              message['title'] = "Duplicate Link";
          }
      } else {
          message['valid'] = false;
          message['description'] = "The link entered is not of correct format, please enter correct link.";
          message['title'] = "Incorrect Link";
      } 
      return(message);
  }
  function duplicateUrl(value, data) {
      value = value.split('/')[2];
      var index = $.inArray(value, data);
      if (index == -1) {
          return (true)
      } 
      return(false);
  }



    var contextMenuItem = {
      "id": "addLink",
      "title": "Add the page link",
      "contexts": ["page"]
    };

    chrome.contextMenus.create(contextMenuItem);

    chrome.contextMenus.onClicked.addListener(function (clickData) {
      //if(clickData.menuItemId == 'addLink' && clickData.selectionText){
      if (clickData.menuItemId == 'addLink') {
        //var message = validateUrl(clickData.selectionText);

        //console.log(clickData)
        
        var url = clickData.pageUrl.split('/')[2];
        chrome.storage.sync.get('blockLinks', function (data) {
          links = data.blockLinks;
          // url = url.split("/")[2];
          message = validateUrl(clickData.pageUrl);
          if(message.valid){
          links.push(url);
          chrome.storage.sync.set({ 'blockLinks': links }, function () {
            // add notification option
            var notifOptions = {
              type: "basic",
              iconUrl: "icons/icon128.png",
              title: "Link Added!",
              message: "Link has been added successfully"
            }
            chrome.notifications.create('addLink', notifOptions);
          });
      } else{
            // console.log(message);
            var notifOptions = {
                type: "basic",
                iconUrl: "icons/icon128.png",
                title: message.title,
                message: message.description
            }
            chrome.notifications.create('errorMsg',notifOptions);
        }
      });
      }
    });
  }
});






/*if(message['valid']){
chrome.storage.sync.get('blockLinks', function(data){
  links = data.blockLinks;
  url = url.split("/")[2];
  links.push(url);
  chrome.storage.sync.set({'blockLinks':links}, function(){
      var row = "<tr><td>"+ url +"</td><td>" + 
      '<button class="delbtn" id="' + links.length + '"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash-fill" viewBox="0 0 16 16"><path d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1H2.5zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5zM8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5zm3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0z"/></svg></button>'
      + "</td></tr>";
      $('#blockedLinks').append(row);
  })
})
                  
} else {
console.log(message);
}*/
