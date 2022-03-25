
chrome.runtime.onMessage.addListener(function(request, sender, senderResponse){
    if(request.todo == "startTracking"){
        // show page and block pages
           chrome.browserAction.setPopup({
                popup: "activatedPage.html"
            });
            chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
                chrome.tabs.update(tabs[0].id, {url: tabs[0].url});
            });


        
    }else{
        // stop tracking and unblock pages
            chrome.browserAction.setPopup({
                popup: "popup.html"
            });
    }
});
// chrome.tabs.query({currentWindow: true, active: true}, function(tabs){
//     console.log(tabs[0].url);
// });
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

//   var contextMenuItem = {
//     "id": "addLink",
//     "title": "Add the page link",
//     "contexts": ["page"]
//   };

//   chrome.contextMenus.create(contextMenuItem);

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
// chrome.runtime.onInstalled.addListener(function (){
// chrome.storage.sync.get(['blockLinks','trackingStarted'], function(data){
//     console.log(data.blockLinks == true);
//     if(data.trackingStarted == true){
//     chrome.contextMenus.removeAll();

//       allLinks = data.blockLinks;
//     //   allLinks = $.map(allLinks, function (Links) {
//     //     return "https://*." + Links + "/*";
//     //   });
//       // block the links function
//     var url = window.location.origin; 
//     var index = $.inArray(url, allLinks);
//       if (index != -1) {
//           //return (); blocked link
          
//           alert("you are in wrong area");

//       }
//     } else {
//         function validateUrl(value) {
//             var expr = /^(?:(?:https?|ftp):\/\/)(?:\S+(?::\S*)?@)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,}))\.?)(?::\d{2,5})?(?:[/?#]\S*)?$/i
//                 ;
//             var message = {};
//             var regex = new RegExp(expr);
//             if (value.match(regex)) {
//                 if (duplicateUrl(value,links) == true) {
//                     message['valid'] = true;
//                     message['description'] = "valid";
//                     message['title'] = "Valid url";
//                 } else {
//                     message['valid'] = false;
//                     message['description'] = "The link entered is already in the list.";
//                     message['title'] = "Duplicate Link";
//                 }
//             } else {
//                 message['valid'] = false;
//                 message['description'] = "The link entered is not of correct format, please enter correct link.";
//                 message['title'] = "Incorrect Link";
//             } 
//             return(message);
//         }
//         function duplicateUrl(value, data) {
//             value = value.split('/')[2];
//             var index = $.inArray(value, data);
//             if (index == -1) {
//                 return (true)
//             } 
//             return(false);
//         }
      
      
      
//           var contextMenuItem = {
//             "id": "addLink",
//             "title": "Add the page link",
//             "contexts": ["page"]
//           };
      
//           chrome.contextMenus.create(contextMenuItem);
      
//           chrome.contextMenus.onClicked.addListener(function (clickData) {
//             //if(clickData.menuItemId == 'addLink' && clickData.selectionText){
//             if (clickData.menuItemId == 'addLink') {
//               //var message = validateUrl(clickData.selectionText);
      
//               //console.log(clickData)
              
//               var url = clickData.pageUrl.split('/')[2];
//               chrome.storage.sync.get('blockLinks', function (data) {
//                 links = data.blockLinks;
//                 // url = url.split("/")[2];
//                 message = validateUrl(clickData.pageUrl);
//                 if(message.valid){
//                 links.push(url);
//                 chrome.storage.sync.set({ 'blockLinks': links }, function () {
//                   // add notification option
//                   var notifOptions = {
//                     type: "basic",
//                     iconUrl: "icons/icon128.png",
//                     title: "Link Added!",
//                     message: "Link has been added successfully"
//                   }
//                   chrome.notifications.create('addLink', notifOptions);
//                 });
//             } else{
//                   // console.log(message);
//                   var notifOptions = {
//                       type: "basic",
//                       iconUrl: "icons/icon128.png",
//                       title: message.title,
//                       message: message.description
//                   }
//                   chrome.notifications.create('errorMsg',notifOptions);
//               }
//             });
//             }
//           });
//     }
// })
// });
chrome.tabs.onUpdated.addListener(function (tabId, changeInfo) {
    
    const url = changeInfo.pendingUrl || changeInfo.url;
    if (!url || !url.startsWith("http")) {
      return;
    }
  
    const hostname = new URL(url).hostname;
    chrome.storage.sync.get(['blockLinks','trackingStarted'], function(data){
        // console.log(data.blockLinks == true);
        if(data.trackingStarted){
            
            if(data.blockLinks.find(domain => hostname.includes(domain))){
                // alert("shdfuih")
                // reload the page and show simple html with quotes
                // window.location.href = "staticpage.html";
                // var url = "back-to-track-plugin/staticpage.html";    
                // $(location).attr('href',url);
                // window.open("https://www.google.com","_self")
                chrome.tabs.update(undefined, {url: "redirectPage.html"})

            }
        }
    //     else {
    //     //     function validateUrl(value) {
    //     //     var expr = /^(?:(?:https?|ftp):\/\/)(?:\S+(?::\S*)?@)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,}))\.?)(?::\d{2,5})?(?:[/?#]\S*)?$/i
    //     //         ;
    //     //     var message = {};
    //     //     var regex = new RegExp(expr);
    //     //     if (value.match(regex)) {
    //     //         if (duplicateUrl(value,links) == true) {
    //     //             message['valid'] = true;
    //     //             message['description'] = "valid";
    //     //             message['title'] = "Valid url";
    //     //         } else {
    //     //             message['valid'] = false;
    //     //             message['description'] = "The link entered is already in the list.";
    //     //             message['title'] = "Duplicate Link";
    //     //         }
    //     //     } else {
    //     //         message['valid'] = false;
    //     //         message['description'] = "The link entered is not of correct format, please enter correct link.";
    //     //         message['title'] = "Incorrect Link";
    //     //     } 
    //     //     return(message);
    //     // }
    //     // function duplicateUrl(value, data) {
    //     //     value = value.split('/')[2];
    //     //     var index = $.inArray(value, data);
    //     //     if (index == -1) {
    //     //         return (true)
    //     //     } 
    //     //     return(false);
    //     // }
      
    //     // //   var contextMenuItem = {
    //     // //     "id": "addLink",
    //     // //     "title": "Add the page link",
    //     // //     "contexts": ["page"]
    //     // //   };
      
    //     // //   chrome.contextMenus.create(contextMenuItem);
      
    //     //   chrome.contextMenus.onClicked.addListener(function (clickData) {
    //     //     //if(clickData.menuItemId == 'addLink' && clickData.selectionText){
    //     //     if (clickData.menuItemId == 'addLink') {
    //     //       //var message = validateUrl(clickData.selectionText);
      
    //     //       //console.log(clickData)
              
    //     //       var url = clickData.pageUrl.split('/')[2];
    //     //       chrome.storage.sync.get('blockLinks', function (data) {
    //     //         links = data.blockLinks;
    //     //         // url = url.split("/")[2];
    //     //         message = validateUrl(clickData.pageUrl);
    //     //         if(message.valid){
    //     //         links.push(url);
    //     //         chrome.storage.sync.set({ 'blockLinks': links }, function () {
    //     //           // add notification option
    //     //           var notifOptions = {
    //     //             type: "basic",
    //     //             iconUrl: "icons/icon128.png",
    //     //             title: "Link Added!",
    //     //             message: "Link has been added successfully"
    //     //           }
    //     //           chrome.notifications.create('addLink', notifOptions);
    //     //         });
    //     //     } else{
    //     //           // console.log(message);
    //     //           var notifOptions = {
    //     //               type: "basic",
    //     //               iconUrl: "icons/icon128.png",
    //     //               title: message.title,
    //     //               message: message.description
    //     //           }
    //     //           chrome.notifications.create('errorMsg',notifOptions);
    //     //       }
    //     //     });
    //     //     }
    //     //   });
    // }
//     chrome.storage.sync.get(["blocked", "enabled"], function (local) {
//       const { blocked, enabled } = local;
//       if (Array.isArray(blocked) && enabled && blocked.find(domain => hostname.includes(domain))) {
//         chrome.tabs.remove(tabId);
//       }
    });
  });