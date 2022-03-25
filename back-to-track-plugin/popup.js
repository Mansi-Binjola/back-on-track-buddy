$(function(){
    var links = [];
    chrome.storage.sync.get(['blockLinks','trackingStarted'], function(data){
        
        if(data.blockLinks){
            // var name = $("#name").val();
            // var cl = $("#class").val();
            // var row = "<tr><td>" + name + "</td><td>" + cl + "</td></tr>";
            // $("table tbody").append(row);
            for (var i = 0; i < data.blockLinks.length; i++) {
                var link = data.blockLinks[i];
                var row = "<tr><td>"+ link +"</td><td>" + 
                '<button class="delbtn" id="' + i + '"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash-fill" viewBox="0 0 16 16"><path d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1H2.5zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5zM8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5zm3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0z"/></svg></button>'
                + "</td></tr>";
                $('#blockedLinks').append(row);
                links.push(link);
            }
            if(data.trackingStarted == false){
                var contextMenuItem = {
                    "id": "addLink",
                    "title": "Add the page link",
                    "contexts": ["page"]
                };
                chrome.contextMenus.create(contextMenuItem);
            }
            
        }
        // chrome.storage.sync.set({"trackingStarted": false});
    })
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
    $('#addLink').click(function(){
        var url = $('#urlName').val();
        var message = validateUrl(url)
        if(message['valid']){
            url = url.split("/")[2];
            links.push(url);
            chrome.storage.sync.set({'blockLinks':links}, function(){
                var row = "<tr><td>"+ url +"</td><td>" + 
                '<button class="delbtn" id="' + links.length + '"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash-fill" viewBox="0 0 16 16"><path d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1H2.5zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5zM8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5zm3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0z"/></svg></button>'
                + "</td></tr>";
                $('#blockedLinks').append(row);
            });
            chrome.storage.sync.set({"trackingStarted": false});
            
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
    $("#blockedLinks").on('click','.delbtn',function(){
        $(this).closest('tr').remove();
        var index = $(this).attr('id');
        chrome.storage.sync.get('blockLinks',function(data){
            allLinks = data.blockLinks;
            allLinks.splice(index,index+1); // doubt
            chrome.storage.sync.set({'blockLinks':allLinks},function(){
                close(); // to be changed
            });
        })
     });
     $("#startTracking").on('click', function(){
        // localStorage.setItem("trackingStarted", true);
        chrome.storage.sync.set({"trackingStarted": true}, function(){
           chrome.runtime.sendMessage({todo:"startTracking"});
           chrome.contextMenus.removeAll();
        //    chrome.contextMenus.update({id:"addLink", enabled:false});
        });
     });
     $("#stopTracking").on('click', function(){
        // localStorage.setItem("trackingStarted",false);
        chrome.storage.sync.set({"trackingStarted": false}, function(){
            chrome.runtime.sendMessage({todo:"stopTracking"});
        });
    //     var contextMenuItem = {
    //         "id": "addLink",
    //         "title": "Add the page link",
    //         "contexts": ["page"]
    //       };
      
    //       chrome.contextMenus.create(contextMenuItem);
      });
})