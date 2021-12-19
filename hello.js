var http=require("http");
console.log("server listening on port no 80000");
http.createServer(function(req,res){
    res.end("hello node");
}).listen(8000);