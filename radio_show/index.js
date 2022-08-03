var express = require("express");
var app = express();
var path = require("path");

app.use("/js", express.static(path.join(__dirname, "js")));
app.use("/css", express.static(path.join(__dirname, "css")));

var visiting_users = 0;
var magic_number = Math.floor(Math.random()*100)+1

app.get("/", function(req, res){
    console.log("a new visitor arrived!");

    res.sendFile(__dirname + "\\home.html");
      
});

app.get("/call", function(req, res){
    visiting_users = visiting_users + 1;
    if (visiting_users == magic_number) {
        res.send("Yes")
        
    } else {
        res.send("no");
    }
});

var listener = app.listen(process.env.PORT  || 8080, process.env.HOST || "0.0.0.0", function() {
    console.log("listening on port 8080");
});