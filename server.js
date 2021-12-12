var express = require('express');
var bodyParser = require('body-parser');
var Pusher = require('pusher');
const cookieParser = require("cookie-parser");

var app = express();
app.use(bodyParser.json());
app.use(cookieParser())
app.use(bodyParser.urlencoded({ extended: false }));


app.use(express.static('./'));

var pusher = new Pusher({
  appId: '1314372',
  key: '62a791ab3d814a374296',
  secret:  '5812bfaef6cd2d5fbe98',
  cluster: "ap1",
  useTLS: true,
});

app.post('/pusher/auth', function(req, res) {
  var socketId = req.body.socket_id;
  var channel = req.body.channel_name;
  const user_id = req.cookies.user_id;
  const presenceData = { user_id };
  var auth = pusher.authenticate(socketId, channel, presenceData);
  res.send(auth);
});

var port = process.env.PORT || 5000;
app.listen(port, () => console.log('Listening at http://localhost:5000'));