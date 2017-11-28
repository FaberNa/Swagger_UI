const express = require('express')
const app= express()
var http = require("http");
var https = require("https");

app.use(express.static('dist'));
app.use(express.static('repo'));

app.use(function(req, res, next){
    //res.setHeader('Access-Control-Allow-Origin', 'http://dev-mobile-services-1.pgol.net:3002');
    //res.header('Access-Control-Allow-Origin', '*');
    //res.setHeader('Access-Control-Allow-Methods', 'GET, POST, DELETE, PUT, PATCH, OPTIONS');
    //res.setHeader('Access-Control-Allow-Headers', 'Content-Type, api_key, Authorization');
    //res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
next();
});

app.get("/repo",function(req,res){
	
	console.log('servo questo get');
});



app.get("/get/:fileName",function(req,res){
   console.log(req.params.fileName);
   var fileName=req.params.fileName;


   // http://gitlab.pgol.net/idb/swaggerformatrepo/raw/master/mio.json?private_token=7Wsc29dxY82zdMzBsNFb
   //TODO
    var options = {
        host: 'gitlab.pgol.net',
        path: '/idb/swaggerformatrepo/raw/master/'+fileName+'?private_token=7Wsc29dxY82zdMzBsNFb',
        method: 'GET',
        headers: {
            'Content-Type': 'text/plain',
        }
    };
    console.dir(options)
    // call my gitlab server to retrieve element
   getJSON(options, function(statusCode, result) {
        // I could work with the result html/json here.  I could also just return it
        //console.log("onResult: (" + statusCode + ")" + JSON.stringify(result));
        res.statusCode = statusCode;
        res.send(result);
    });

});

getJSON = function(options, onResult)
{
    console.log("rest::getJSON");

    var port = options.port == 443 ? https : http;
    //console.log("porta "+options.port)
    var req = port.request(options, function(res)
    {
        var output = '';
        //console.log(options.host + ':' + res.statusCode);
        res.setEncoding('utf8');

        res.on('data', function (chunk) {
            output += chunk;
        });

        res.on('end', function() {
            //var obj = JSON.parse(output);
            //console.dir(output);
            if(output) {
                try {
                  var   obj = JSON.parse(output);
                } catch(e) {
                    obj='error on parsing json'
                }
            }
            onResult(res.statusCode, obj);
        });
    });

    req.on('error', function(err) {
        console.log('error: ' + err.message);
    });

    req.end();
};
app.set('port', process.env.PORT || 3002);
app.set('host',process.env.HOST || 'localhost');

app.get('/', function(req, res) {
    res.redirect("/index_end.html");
});


listener = app.listen(app.get('port'),app.get('host'),function(){
 console.log('Server running '+ listener.address().address+' on port '+listener.address().port)

})
