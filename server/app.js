const express = require("express");
const app = express();
const router = express.Router()
const bodyparser = require('body-parser')
const mysql = require('mysql');
const cors = require('cors')

app.use(cors())
app.use(express.json())
app.use(bodyparser.urlencoded({extended:true}))
var con = mysql.createConnection({
    user: "root",
    host: "localhost",
    password: "pkkannan",
    database: "student",
});
con.connect(function(err) {
    if(err){
      console.log("Error in the connection")
      console.log(err)
    }
    else{
      console.log(`Database Connected`)
    }
})

app.get("/",(req, res) => {
    con.query("select * from details", (err, data) => {
        if (err) {
            console.log(err)
        } else {
            console.log(data)
            res.send(data) 
        }
})
})
app.post("/Adduser", (req, res) => {

    sql = `insert into details (firstname,lastname,location,email,dob,education,about) values(?,?,?,?,?,?,?)`

    con.query(sql,[req.body.firstname,req.body.lastname,req.body.location,req.body.email,req.body.dob,req.body.education,req.body.about],(err, data) =>{
        if (err) {
            console.log(err)
        } else {
            console.log(data)
            res.send(data) 
        }
    })
})

app.delete("/deleteuser/:id", (req, res) => {
    const id = req.params.id
    sql = "delete from details where id=?"
    con.query(sql, id, (err, data) => {
        if (err) {
            console.log(err)
        } else {
            console.log(data)
            res.send(data) 
        }
    })
})

app.put("/updateStudent", (req, res) => {
    const id = req.body.id
    const firstname = req.body.firstname
    const lastname = req.body.lastname
    const location = req.body.location
    const email = req.body.email
    const dob = req.body.dob
    const education = req.body.education
        sql = `update details set firstname=${firstname}, lastname=${lastname}, location=${location}, email=${email}, dob=${dob}, education=${education} where id=${id}`
    con.query(sql, [firstname, lastname, location, email, dob, education, id], (err, data) => {
        if (err) {
            console.log(err)
        } else {
            console.log(data)
            res.send(data) 
        }
    }
    )
})


app.listen(8080, function () {
    console.log("server is running on the port: 8080");
});