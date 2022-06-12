const express = require('express')
const bodyParser= require('body-parser');
const unirest=require('unirest');
const cors=require('cors');
// const request =require('request');
const app= express();
const port = 3000;
app.use(bodyParser.json());
app.use(cors());
app.use(function(req,res,next){
    res.header("Access-Control-Allow-Origin","*");
   res.header("Access-Control-Allow-Headers","Origin,X-Requested-with,Content-Type,Accept");
   next();
});
app.listen(port,()=>{
    console.log("running");
})
app.post('/login',(req,res)=>{
    var username = req.body.username;
    var password = req.body.password;
    var req = unirest('GET','http://dxktpipo.kaarcloud.com:50000/RESTAdapter/login900421')
    .header({
        'Authorization':'Basic UE9VU0VSQDE6VGVjaEAyMDIy',
        'Context-Type':'application/json'
    })
    .send('<?xml version="1.0" encoding="UTF-8"?><ns0:ZFM_CP_LOG xmlns:ns0="urn:sap-com:document:sap:rfc:functions"><I_CUSTID>'+ username +'</I_CUSTID><I_PASSWORD>'+ password +'</I_PASSWORD></ns0:ZFM_CP_LOG>')   
    .end(function(result){
        if(result.error){
            console.log(result.error);
        }
        else{
            this.res = result.body;
            console.log(this.res);
        }
        res.json(result.body);
        console.log(res);
    } )
})
app.post('/profile',(req,res)=>{
    var username = req.body.username;
    // var password = req.body.password;
    var req = unirest('GET','http://dxktpipo.kaarcloud.com:50000/RESTAdapter/profile900421')
    .header({
        'Authorization':'Basic UE9VU0VSQDE6VGVjaEAyMDIy',
        'Context-Type':'application/json'
    })
    .send('<?xml version="1.0" encoding="UTF-8"?><ns0:ZFM_CP_PROFILE xmlns:ns0="urn:sap-com:document:sap:rfc:functions"><CUSTID>'+ username +'</CUSTID></ns0:ZFM_CP_PROFILE>')   
    .end(function(result){
        if(result.error){
            console.log(result.error);
        }
        else{
            this.res = result.body;
            console.log(this.res);
        }
        res.json(result.body);
        console.log(res);
    } )
})
app.get('/login',(req,res)=>{
    res.send("hi")
})