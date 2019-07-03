require('../src/db/mongoose')

//const User = require("../src/models/user.js")
const Task = require("../src/models/task.js")


/*
User.findByIdAndUpdate('5d1ba6c6bddc754f60fad739', {age:1}).then((user)=>{
    console.log(user)
    return User.countDocuments({age: 1})

}).then((result)=>{
    console.log(result)
}).catch((e)=>{
    console.log(e)
})
*/
const _id = '5d1ba0c0de6b39495e87a6ee'

Task.findByIdAndUpdate(_id, {description:'updated description', completed:'true'}).then((task)=>{
 
    console.log(_id)
    console.log(task)
    return Task.countDocuments({completed: false})

}).then((result)=>{
    console.log("incomplete tasks")
    console.log(result)
    return result
}).catch((e)=>{
    console.log(e)
})