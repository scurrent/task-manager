require('../src/db/mongoose')

const User = require("../src/models/user.js")
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

/*
const _id = '5d1ba57d50882e4e2fdf3676'

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
*/


/*
const updateAgeAndCount = async (id, age) => {
    const user = await User.findByIdAndUpdate(id, {age})
    const count = await User.countDocuments({age})
    return count
}

updateAgeAndCount("5d1ba6c6bddc754f60fad739" , 2).then((count)=>{
    console.log(count)
}).catch((e)=>{
    console.log(e)
})
*/


const deleteTaskAndCount = async (id, ) => {
    const task = await Task.findByIdAndDelete(id,)
    const count = await Task.countDocuments({completed:false})
    return count
}

deleteTaskAndCount("5d1ba753b4cfec4fd564eae7").then((count)=>{
    console.log(count)
}).catch((e)=>{
    console.log(e)
})