const express = require("express")
require("./db/mongoose.js")
const User = require("./models/user.js")

const app = express()


const port = process.env.PORT || 3000

app.post('/users', (req, res) => {
    console.log(req.body)
    const user = new User(req.body)
    
    user.save().then(()=>{
        console.log("in save")
        res.send(user)
    }).catch((e) =>{
        console.log("in error")

        res.status(400)
        res.send(e)
    })
})


app.listen(port, ()=>{
    console.log("APPLICATION IS UP on port : " + port)
})