const { info } = require('console');
const express = require('express');
const app = express();
const PORT = 4999;

// middleware
app.use(express.static('public'))
app.use(require('cors')())
app.use(mw)
app.use(express.json()) 
// .json allows the server to process and use json information, cors allows cross origin requests Ex: React.

// middleware is a great way to authenticate as well.
function mw(req, res, next) {
    console.log('HIT THE MIDDLEWARE')
    const {id} = req.query
    console.log('ID:', id)
    if( id != 8 ) {
        return res.sendStatus(403)
    }
    next()
}

//TEMP DATABASE
const db = []

//SCHEDULER
function cron(ms, fn) {
    async function cb() {
        clearTimeout(timeout)
        await fn()
        timeout = setTimeout(cb, ms)
    }
    let timeout = setTimeout(cb, ms)
    return () => {}
}

function consoleDB() {
    console.log('DB= ', db)
}

cron(1000, consoleDB)

// GET POST PATCH PUT DELETE, what we can associate with our different routes, takes a request and responds as args
app.delete('/', (req, res) => {
    console.log('You have reached the home route: Delete');
    res.sendStatus(200)
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
    const { word, banana } = req.query
    console.log(word, banana)
    res.sendStatus(200)
})

app.delete('/delete/justin/cool', (req, res) => { // static
    res.send('Did not make it')
})
// important to keep dynamic at the bottom so that the static will be prioritized.
app.delete('/delete', (req, res) => { // dynamic
    const {id} = req.params
    console.log('What would you like to delete?', id);
    res.sendStatus(200)
})

app.listen(PORT, () => console.log(`Server has started on port: ${PORT}`))