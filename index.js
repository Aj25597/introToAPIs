const express = require('express')
const app = express()
const port = 3000


// C - Create - POST
// R - Read - GET
// U - Update - PATCH
// D - Delete - DELETE 

// Route - a location that determines where request should go
// Method - abides by the REST Specification -> GET
// Handler - business logic


var people = [
  {
  id: 1,
  name: "AD",
  school: "UMD",
  age: 25
  },
  {
    id: 2,
    name: "Low",
    school: "BSU",
    age: 31
  }
]

// Middleware Pipeline
app.use(express.json()); 

//Home Page
app.get('/', (req, res) => {
  res.send('Hello World!')
})

//Current Date and Time 
app.get('/now', (req, res) => {
  let currDate = new Date()
  console.log(currDate)
  

  var currDateJ = {
    Date: currDate
  }

  res.send(currDateJ)

})
  

//Health Link
app.get('/health', (req, res) => {
  res.send('AD API Service is healthy!')
})

//AD Link
app.get('/AD', (req, res) => {
    res.send('AD API Service is not healthy!')
    
  })

// GET People
app.get('/people', (req, res) => {
  res.send(people)
  console.log('Here is the list of people!')
})

// GET Person
app.get('/person/:id/', (req, res) => {
  let id = req.params.id
  //console.log(isNaN(id))

  if (isNaN(id) == true) {
    let name = req.params.id
    console.log(name)

    for(let i = 0; i < people.length; i++) {
      if(people[i].name == name) {
        res.send(people[i])
      }
    }

    res.status(404).send({ message: "User does not exist!" })

   
  }
    id = parseInt(id)
    // console.log(typeof(id))
  if(id < 0 || id > people.length) {
    res.status(400).send({Response: "Not a valid id"})
  } else {
    res.send(people[id])
  }
/*
    for (let i=0;i<people.length;i++) {

      if (people[i].id == id) {
        res.send(people[i])
  
      }
    } 
  
    res.status(404).send({ message: "User does not exist!" })
*/   
  }
)

//Get Person based of name




// https://localhost:3000/input?name=AD"
app.get('/input', (req, res) => {
  let text = req.query.name
  res.send(`Hello ${text}!`)

})

app.get('/payload', (req, res) => {
  // console.log(req.body)
  console.log("Name =>",req.body.name)
  console.log("Lesson =>",req.body.lesson)

  res.send('Success!')
})


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})