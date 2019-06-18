const express = require('express');
const mysql = require('mysql');
const cors = require('cors');
const bodyParser = require('body-parser');
let app = express();  
app.listen(80,()=>{console.log('server is start!')})
const router = express.Router();
const option = {
    host:"localhost",
    user:"root",
    password:"root",
    port: '3306',
    database:"test",
    connectTimeout:5000,
    multipleStatements: false
}


app.use(cors()); //解决跨域
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));

//const con = mysql.createConnection(option);
let con;
recon();
app.all("/login",(req,res)=>{
   con.connect();
   con.query("SELECT * FROM user",(e,r)=>res.json(new Result({data:r})));
   con.end();
})

function Result({code=1,msg="",data={}}){
    this.code = code;
    this.msg = msg;
    this.data = data;
}


function recon(){
    con = mysql.createConnection(option);
    con.on('error', err=>err.code === 'PROTOCOL_CONNECTION_LOST'&& setTimeout(recon,2000));
}