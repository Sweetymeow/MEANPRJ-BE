var express = require("express"); // require express module
var bodyParser = require("body-parser");
var app = express(); // Creates an Express application.

var datebase; // access the database reference inside our message post

//var mongo = require("mongodb").MongoClient;
var mongoose = require("mongoose");
var Message = mongoose.model('Message', { msg : String });

app.use(bodyParser.json());
app.use(function(req, res, next){
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authroization');
    next();  
});

app.get('/api/message', GetMessages);

app.post('/api/message', function(req, res){
    console.log(req.body);
//  datebase.collection('messages').insertOne(req.body); // use for mongo
    var message = new Message(req.body);
    message.save(); 
    res.status(200);
});

function GetMessages(req, res){
    Message.find({}).exec(function(err, result){
       res.send(result); //console.log(result); 
    });
}

mongoose.connect("mongodb://localhost:27017/test",function(err,db){
   if(!err){
       console.log("we are connected to mongo"); //datebase = db;
//       GetMessages();
//     db.collection('messages').insertOne({'msg':'test'});
   } 
});

var server = app.listen(5000, function(){
    console.log("listening on port: ", server.address().port);
});

