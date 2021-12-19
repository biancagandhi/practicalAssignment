const mysql=require('mysql');
let express=require('express');
let session=require('express-session');
let bodyParser=require('body-parser');
// var fileStore=require('session-file-store')(session);
const path=require('path');

const app=express();
app.use(express.static('public'));
app.use(function(req,res,next)
{
    console.log(req.method+" "+req.url);
    next();
})

var connection=mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'',
    database:'student_db'
});

app.use(session({
    secret:'secret',
    resave:false,
    saveUninitialized:false,
    //store:new fileStore({path:'./session-data'})
}));
app.use(bodyParser.urlencoded({extended:true}));


app.post('/validate',function(request,response)
{
    var username=request.body.username;
    var password=request.body.password;
    if(username && password)
    {
        connection.query('select * from users where username=? and password=?',[username,password],function(error,result,fields)
        {
            if(result.length > 0)
        {
            request.session.loggedin=true;
            request.session.username=username;
            response.redirect('/home');
        }
        else{
            response.send('Incorrect Username and Password!');
        }
        });
    }else{
        response.send('please enter Username and Password');
    }
});

app.get('/home',function(request,response)
{
    if(request.session.loggedin)
    {
        response.send("Welcome"+request.session.username+"<br>"+request.session.id+"!!!" +"<br><a href='./logout'>Logout</a>");
                
    }
    else{
        response.redirect('/login.html');
    }
});

app.get('/logout',(req,res)=>{
    if(req.session.loggedin)
    {
        if(req.session)
        {
            req.session.destroy(function(err)
            {
                if(err)
                {
                    return next(err);
                }
                else{
                    res.clearCookie("connect.sid"),
                    res.redirect('/login.html');
                }
            });
        }
    }else{
        res.redirect('/login.html')
    }
})
app.listen(8000);