const express = require("express")
require("./db/mongoose.js")
const User = require("./models/user.js")
const Task = require("./models/task.js")

const userRouter = require("./routers/userRoutes.js")
const taskRouter = require("./routers/taskRoutes.js")
const app = express()



const port = process.env.PORT || 3000

//with NO middleware    new req ->  run route handler
//with middleware    new req -> do something -> run route handler

app.use((req, res, next)=>{
    console.log(req.method, req.path)

    //must call next to exit

   // if(req.method == 'GET'){
   //     res.status(503).send("Site is in maintenance mode")
   // } else{

        next()
   // }
})

app.use(express.json())
app.use(userRouter)
app.use(taskRouter)


app.listen(port, ()=>{
    console.log("APPLICATION IS UP on port : " + port)
})









