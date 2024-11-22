const express = require('express');
const connectToMongodb = require('./db'); 
var cors = require('cors')
var app = express()
 
app.use(cors())
const port = 8080;

connectToMongodb();

app.use(express.json());
app.use('/api/auth', require('./routes/auth.js'));
app.use('/api/notes', require('./routes/notes.js'));

app.get('/', (req, res) => {
    res.send('Welcome to our API');
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
