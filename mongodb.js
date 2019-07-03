//const mongodb = require("mongodb")
//const MongoClient = mongodb.MongoClient
//const ObjectID = mongodb.ObjectID



//docs: https://docs.mongodb.com/manual/reference/operator/update/
const {MongoClient, ObjectID} = require("mongodb")

const id = new ObjectID()
//console.log(id)
//console.log(id.getTimestamp())

//console.log(id.id.length)
//console.log(id.toHexString().length)




const connectionURL = 'mongodb://127.0.0.1:27017'
const databaseName = 'task-manager'

MongoClient.connect(connectionURL, { userNewUrlParser: true}, (error, client) => {
    if(error){
        return console.log("Unable to connct to Mongo")
    }

    const db = client.db(databaseName)

    const updatePromise = db.collection('users').updateOne({
        _id: new ObjectID("5d1b7d47addf7d260fdac24e")
    }, {
        $set: {
            name: "Luke"
        }
    })

    updatePromise.then((result)=>{
        console.log(result)

    }).catch((error)=>{
        console.log(error)
    })
  

    db.collection('users').updateMany({
        name: "Ian"
    }, {
        $set: {
            name: "Ian 2"
        }
       
    }).then((result)=>{
        console.log(result)

    }).catch((error)=>{
        console.log(error)
    })


    db.collection('users').deleteMany({
        age: 33
    }).then((result)=>{
        console.log(result)

    }).catch((error)=>{
        console.log(error)
    })
   

})  


/*
    //console.log("connected success")
    const db = client.db(databaseName)
  /* 
    db.collection('users').insertOne({
        _id: id, 
        name: 'Ian',
        age: 45
    }, (error, result)=>{
        if(error){
            return console.log("unable to do user insert")
        }

        console.log(result.ops)

    })

    db.collection('users').insertMany([
        {
            name:'Jen',
            age: 33
        },
        {
            name:'John',
            age: 35
        }


    ], (error, result) =>{
        if(error){
            console.log("error on many")
        }
        console.log(result.ops)
    }
    )
   

   db.collection('tasks').insertMany([
    {
        description:'Doc Number 1',
        completed: true
    },
    {
        description:'Doc Number 45',
        completed: true
    },
    {
        description:'Doc Number 145',
        completed: false
    }


], (error, result) =>{
    if(error){
        console.log("error on many task entry")
    }
    console.log(result.ops)
}
)

// CRUD create read update delete

const { MongoClient, ObjectID } = require('mongodb')

const connectionURL = 'mongodb://127.0.0.1:27017'
const databaseName = 'task-manager'

MongoClient.connect(connectionURL, { useNewUrlParser: true }, (error, client) => {
    if (error) {
        return console.log('Unable to connect to database!')
    }

    const db = client.db(databaseName)
    
    // db.collection('users').findOne({ _id: new ObjectID("5c1113239cbfe605241f9071") }, (error, user) => {
    //     if (error) {
    //         return console.log('Unable to fetch')
    //     }

    //     console.log(user)
    // })

    // db.collection('users').find({ age: 27 }).toArray((error, users) => {
    //     console.log(users)
    // })

    db.collection('tasks').findOne({ _id: new ObjectID("5c0fec243ef6bdfbe1d62e2f") }, (error, task) => {
        console.log(task)
    })

    db.collection('tasks').find({ completed: false }).toArray((error, tasks) => {
        console.log(tasks)
    })
})





db.collection('tasks').findOne({ _id: new ObjectID("5d1b7ed3a2f78d2773483571") }, (error, task) => {
    console.log(task)
})


db.collection('tasks').find({ completed: false }).toArray((error, tasks) => {
    console.log(tasks)
})
 */


