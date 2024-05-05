const { info } = require('console');
const express = require('express');
const app = express();
const PORT = 4999;

app.use(express.json()) 
// middleware, ^ allows the server to process and use json information

//TEMP DATABASE
const db = []

// GET POST PATCH PUT DELETE, what we can associate with our different routes.
// takes a request and responds as args
// '/' = the home route
app.get('/', (req, res) => {
    console.log('You have reached the home route: GET');
    res.status(200).json({"Message": 'hello friends'})
    // .send also brings up the json message.
})

app.post('/api/info', (req, res) => {
    const { information } = req.body
    console.log('THE POSTED MESSAGE WAS: ', information)
    db.push(information)
    console.log('DB: ', db)
    res.status(201).json({
        "yourMessage": information
    })
})

app.put('/api', (req, res) => {
    const {information} = req.body
    console.log(information)
    res.sendStatus(200)
})

app.delete('/delete/:id', (req, res) => {
    console.log('What would you like to delete?');
    res.sendStatus(200)
})

app.listen(PORT, () => console.log(`Server has started on port: ${PORT}`))