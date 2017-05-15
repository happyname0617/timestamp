var monthString =['January', 'February','March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
var express = require("express")
var app = express();
//var moment = require('moment');

app.set('port', (process.env.PORT || 8080));
app.get('/',function(req,res){
    res.end('hello this is timestamp microservice')
})

var jsonResponse = {'timestamp':null,'natural':null};
app.get('/:id',function(req,res){
    jsonResponse = {};
    
    if(isNaN(req.params.id))
    {
        var temp = DateString2Timestamp(req.params.id);
        if(temp>0){
            jsonResponse.timestamp
            jsonResponse.natural = req.params.id;
        }
    }
    else
    {
        jsonResponse.timestamp = req.params.id;
        jsonResponse.natural = time2DateString(req.params.id);
    }
    
    res.end(JSON.stringify(jsonResponse));
})

app.listen(app.get('port'), function() {
  console.log('Timestamp microservice is listening on port ', app.get('port'));
});

function time2DateString(unixTimeStamp)
{
    var t = new Date(unixTimeStamp*1000);
    var formatted = t.toDateString();
    return formatted;
}

function DateString2Timestamp(dateString)
{
    var t = Date.parse(dateString);
    return t/1000;
}