const express = require('express');
const connectToMongodb = require('./db'); 
const app = express();
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
