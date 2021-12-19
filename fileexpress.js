const express=require('express');
const multer =require('multer');
const path =require('path');

const app=express();
app.use(express.static('public'));

 var options=multer.diskStorage({destination:function(req,file,cb){
    if(file.mimetype!=='image/jpeg')
    {
       return cb('invalid file formate')
    }
    cb(null,'./uploads');
},filename:function(req,file,cb){
    cb(null,(Math.random().toString(30)).
    slice(5,10)+Date.now()
    +path.extname(file.originalname));
  
}});
var upload=multer({storage:options});

app.get("/",function(req,res){
    res.send("<a href='page_upload.html'>upload your file </a>");
})
app.post("/file_upload",upload.single('myfile'),function(req,res){
    res.send("file is uploaded");

});
app.post("/photos_upload",upload.array('photos',2),function(req,res){
    res.send("files are uploaded");

});
app.listen(8000);
