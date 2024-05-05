const express = require('express');
const app = express();
const PORT = 4999;

// GET POST PATCH PUT DELETE, what we can associate with our different routes.
// takes a request and responds as args
// '/' = the home route

app.get('/', (req, res) => {
    console.log('You have reached the home route: GET');
})

app.delete('/', (req, res) => {
    console.log('What would you like to delete?');
})

app.listen(PORT, () => console.log(`Server has started on port: ${PORT}`))