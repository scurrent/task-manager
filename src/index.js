const express = require("express")
require("./db/mongoose.js")
const User = require("./models/user.js")
const Task = require("./models/task.js")

const app = express()

app.use(express.json())

const port = process.env.PORT || 3000

app.post('/users', (req, res) => {
    console.log(req.body)
    const user = new User(req.body)
    
    user.save().then(()=>{
        console.log("in save")
        
        res.setStatus(201).send(user)
    }).catch((e) =>{
        console.log("in error")

        res.status(400)
        res.send(e)
    })
})

app.get('/users', (req, res) =>{
//    User.find({name: "Scott"})
    User.find({}).then((users)=>{
        res.send(users)
    }).catch((e)=>{
        res.status(500).send()
    })
})

app.get('/users/:id', (req, res) =>{
    console.log(req.params)
    const _id = req.params.id
        User.findById(_id).then((user)=>{
            if(!user){
                res.setStatus(404).send()
            }else{
                res.send(user)
            }    

        }).catch((e)=>{
            console.log(e)
            res.status(500).send()
        })
    })

    app.get('/tasks', (req, res) =>{
            Task.find({}).then((task)=>{
            res.send(task)
        }).catch((e)=>{
            res.status(500).send()
        })
    })
        
    app.get('/tasks/:id', (req, res) =>{
        console.log(req.params)
        const _id = req.params.id
        Task.findById(_id).then((task)=>{
            if(!task){
                res.setStatus(404).send()
            }else{
                res.send(task)
            }    

        }).catch((e)=>{
            console.log(e)
            res.status(500).send()
        })
    })
    



app.post('/tasks', (req, res) => {
    console.log(req.body)
    const task = new Task(req.body)
    
    task.save().then(()=>{
        console.log("in save")
        res.setStatus(201).send(task)
    }).catch((e) =>{
        console.log("in error")

        res.status(400)
        res.send(e)
    })
})


app.listen(port, ()=>{
    console.log("APPLICATION IS UP on port : " + port)
})