$(function(){
    $.ajax({
        url: 'https://type.fit/api/quotes',
        type: 'GET',
        dataType: 'json',
        success: function(data, textStatus, xhr){
            var randomQuoteNum = Math.floor((Math.random() * data.length) + 1);
            console.log(randomQuoteNum,"\n", data[randomQuoteNum])
            // console.log(data);
            $("#quote").html(data[randomQuoteNum]["text"]);
            $("#author").html(data[randomQuoteNum]["author"]);
        },
        error: function(xhr, textStatus, errorThrown) {
            console.log("Error in retrieving data")
            // var data = []
        }
    });
    
});