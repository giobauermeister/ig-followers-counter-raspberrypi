var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var server = require('http').Server(app);
//var io = require('socket.io')(server);
var path = require('path');
var request = require('request');

app.use(bodyParser.json())

//app.use(express.static(path.join(__dirname, '/public')));

const CLIENTID = '9d3d02c6cf2c4e64abaec4605ec06eba'
//const REDIRECTURI = 'http://www.filipeflop.com'
const REDIRECTURI = 'http://localhost:8080'
const USER = 'giobauermeister'
const PASS = 'ul9mgz538x'

// request.post(
//     'http://www.google.com/',
//     { json: { key: 'value' } },
//     function (error, response, body) {
//         if (!error && response.statusCode == 200) {
//             console.log(body)
//         }
//     }
// );



//URL https://api.instagram.com/oauth/authorize/?client_id=CLIENT-ID&redirect_uri=REDIRECT-URI&response_type=code

var return_uri

// var redirect = request.get('https://api.instagram.com/oauth/authorize/?client_id='+CLIENTID+'&redirect_uri='+REDIRECTURI+'&response_type=code',
//                 function(err, res, body) {
//           //console.log(res);
//           console.log(this.uri.href);
//           return_uri = this.uri.href;
// });

var redirect = request.get('https://api.instagram.com/oauth/authorize/?client_id='+CLIENTID+'&redirect_uri='+REDIRECTURI+'&response_type=token',
                function(err, res, body) {
          //console.log(res);
          console.log(this.uri.href);
          return_uri = this.uri.href;
});

app.get('/', function (req, res) {
   res.redirect(return_uri)
   console.log(req);
});

// var data = {
//   username: USER,
//   password: PASS
// }
//
// var return_token = request.post(return_uri, data, function(err,res,body) {
//   console.log(body);
//   //console.log(this.uri.href)
// });


// request.get('http://ip-api.com/json/?fields=8405', function(err, res, body) {
//     console.log(body);
// });

//var locationData;

//server.listen(3000, '192.168.0.24', function() {
// var host = server.address().address
// var port = server.address().port
// console.log("Server listening on %s:%s...", host, port);
//});

server.listen(8080, function() {
 var host = server.address().address
 var port = server.address().port
 console.log("Server listening on %s:%s...", host, port);
});

// app.get('/', function (req, res) {
//   res.sendFile(__dirname + '/index.html');
// });

// app.post('/location', function(req, res) {
//  locationData = req.body
//  io.emit('locationEvent', locationData);
// });
