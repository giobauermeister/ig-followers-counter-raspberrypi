var express = require('express');
var app = express();
var api = require('instagram-node').instagram();
var bodyParser = require('body-parser');
var server = require('http').Server(app);
var request = require('request');
var io = require('socket.io')(server);
var path = require('path');
var bodyParser = require('body-parser');

app.use(bodyParser.json())
//request.use(bodyParser.json())
app.use(express.static(path.join(__dirname, '/public')));

var jsonParser = bodyParser.json()

api.use({
  client_id: '9d3d02c6cf2c4e64abaec4605ec06eba',
  client_secret: '0a4cb7dd0c2b4606b1abf248244bc432'
});

//var redirect_uri = process.env.INSTAGRAM_BASE_URL + '/handleauth';
var redirect_uri = 'http://localhost:8080/handleauth';
var base_url = 'http://localhost:8080';
var ig_api_url = 'https://api.instagram.com/v1/users/';

var USER_ID;
var TOKEN;

// app.get('/authorize_user', function(req,res) {
//   res.redirect(
//     api.get_authorization_url(redirect_uri, {
//                                               scope: ['likes'],
//                                               state: 'a state'
//                                             })
//   );
// });

app.get('/authorize_user', function(req,res) {
  res.redirect(
    api.get_authorization_url(redirect_uri));
});

app.get('/handleauth', function(req, res) {
  api.authorize_user(req.query.code, redirect_uri, function(err, result) {
    if (err) {
      console.log(err.body);
      res.send("Didn't work");
    } else {
      console.log("Access token: " + result.access_token);
      console.log("User ID: " + result.user.id);
      //res.send("You made it!")
      TOKEN = result.access_token;
      USER_ID = result.user.id;
      res.redirect(base_url);
      make_get();
    }
  });
});

//api.user_followers(USER_ID, function(err, users, pagination, remaining, limit) {});

// https://api.instagram.com/v1/users/USER_ID/?access_token=ACCESS_TOKEN
// https://api.instagram.com/v1/users/223155900/?access_token=223155900.9d3d02c.cdc226e359154865ae39885c145718db
function make_get() {
  request.get(ig_api_url + USER_ID + '/?access_token=' + TOKEN, function(err, res, body) {
    //console.log(err);
    //console.log(res);
    var response = JSON.parse(body);
    console.log("Username: " + response.data.username);
    console.log("Name: " + response.data.full_name);
    console.log("Followers: " + response.data.counts.followed_by);
    io.emit('responseEvent', response);
    setTimeout(make_get, 3000);
    //console.log("User: " + body.data);
    //console.log("Followers: " + result.data.followed_by);
  });
}

app.get('/', function (req, res) {
  res.sendFile(__dirname + '/index.html');
});

server.listen(8080, function() {
 var host = server.address().address
 var port = server.address().port
 console.log("Server listening on %s:%s...", host, port);
});
