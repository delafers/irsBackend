import express, {urlencoded} from 'express'
import bcrypt from 'bcrypt'
import flash from "express-flash"
import session from "express-session"
import passport from "passport"
import {initialize} from "./passpor-config.js";
import cors from "cors"
import bodyParser from "body-parser"
import { Sequelize, DataTypes } from 'sequelize'
import db, {openConnection, closeConnection} from "./db.js";
const PORT = process.env.PORT || 8080
const app = express()
const users = []
const data = [
    {head: "d", name:"blood", volume:"100", batch: "30", date:"03:04:2021", entity: "120", expiration: "20 days"},
    {head: "xd", name:"cold blood", volume:"200", batch: "22", date:"03:10:2022", entity: "1200", expiration: "21 days"},
    {head: "xdd", name:"warm blood", volume:"300", batch: "12", date:"14:08:2022", entity: "780", expiration: "20 days"},
]
initialize(passport,
        email => {
    let a = users.find(user => user.email === email)
    console.log(a, email, users[0]?.email, "getUsers")
            return a
        },
        id => users.find( user => user.id === id))
app.set("view-engine", "ejs")
app.use(bodyParser.urlencoded({
    extended: true
}))
app.use(bodyParser.json())
app.use(flash())
app.use(session({
    secret: "secret",
    resave: false,
    saveUninitialized: false
}))
app.use(cors())
let router = express.Router()

app.use(passport.initialize())
app.use(passport.session())
app.post("/api", async (req, res) => {
    try {
        const hashedPassword = await bcrypt.hash(req.body.password, 10)
        users.push({
            id: Date.now().toString(),
            name: req.body.name,
            email: req.body.email,
            password: hashedPassword
        })

    }catch {

    }
    let a = users.find(user => user.email === req.body.email)
    res.send(a)
})
app.get('/', checkAuthenticated, async (req, res) => {
    res.render("app.ejs", {name: req.user.name})

})
app.put("/tablet", (req, res) => {
    data.push(req.body)
    console.log(data)
    res.send("all oks")
})
app.post('/log/', (req, res) => {
    let a = req.isAuthenticated()
    let ok = users.find( user => user.email === req.body.email)
    if(ok){
        res.send({code: "authorised", name: ok.name} )
    }else{
        res.send("No such user")
    }    
    console.log(ok)
    
})
app.get('/log/', (req, res) => {
    let a = req.isAuthenticated()
    let ok = users.find( user => user.email === req.body.email)
    console.log(ok)
    if(ok){
        res.send("authorised")
    }else{
        res.send("No such user")
    }    
  
})

app.post('/register', checkNotAuthenticated, async (req, res) =>{

})


app.use(express.json())
app.post('/api/user', async (req, res) => {
    const {name, surname} = req.body
    res.send(newPerson)
})
app.get("/tablet", (req, res) => {
    res.send(data)
})
function checkAuthenticated(req, res, next){
    if( req.isAuthenticated()){
        return next()
    }
    return res.redirect('/login')
}
function checkNotAuthenticated(req, res, next){
    if( req.isAuthenticated()){
      res.send('YOY was auth')
    }
        return next()

}

app.listen(PORT, () => {
    console.log(`server started on port ${PORT}`)
})
