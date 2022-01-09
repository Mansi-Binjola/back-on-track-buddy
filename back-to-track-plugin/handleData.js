window.onload = function () {

chrome.browserAction.setPopup( {
    popup: 'popup.html'
});
    var lastKey = 0;
   if (localStorage.length > 0) {
        listLen = localStorage.length;
        var table = document.getElementById("displayLinks");
        for (var i = 0; i < listLen; i++) {
            var row = table.insertRow(i);
            var value = localStorage.getItem(localStorage.key(i));
            var urlName = row.insertCell(0);
            urlName.innerHTML = value;
            var delbtn = row.insertCell(1)
            // localStorage.setItem(listLen,data[listLen].split("/")[2]);
            delbtn.innerHTML = '<button class="delbtn" id="' + i + '"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash-fill" viewBox="0 0 16 16"><path d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1H2.5zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5zM8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5zm3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0z"/></svg></button>';
            //delbtn.setAttribute("id", listLen);
            lastKey = localStorage.key(i);
        }
    }
        var data = new Array;
        document.getElementById("addBtn").addEventListener("click", addUrl);
        function addUrl() {
            var value = document.getElementById("urlName").value;
            if (validateUrl(value) == true) {
                data.push(value);
                displayData(data);
            }
        }

        function validateUrl(value) {
            var expr = /^(?:(?:https?|ftp):\/\/)(?:\S+(?::\S*)?@)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,}))\.?)(?::\d{2,5})?(?:[/?#]\S*)?$/i
                ;
            var regex = new RegExp(expr);
            if (value.match(regex)) {
                if (duplicateUrl(value) == true) {
                    return true;
                }
            } else {
                alert("url is invalid");
            }
        }
        function duplicateUrl(value) {
            var index = $.inArray(value, data);
            if (index == -1) {
                return (true)
            } else {
                alert("link already in list");
            }
        }
        function displayData(data) {
            var listLen = data.length - 1;
            var table = document.getElementById("displayLinks");
            var row = table.insertRow(listLen);
            var urlName = row.insertCell(0);
            urlName.innerHTML = data[listLen].split("/")[2];
            var delbtn = row.insertCell(1)
            //localStorage.setItem("url_data", JSON.stringify(data));
            localStorage.setItem(lastKey+1, data[listLen].split("/")[2]);
            lastKey++;
            delbtn.innerHTML = '<button class="delbtn" id="' + listLen + '"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash-fill" viewBox="0 0 16 16"><path d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1H2.5zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5zM8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5zm3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0z"/></svg></button>';
            //delbtn.setAttribute("id", listLen);
        }
}