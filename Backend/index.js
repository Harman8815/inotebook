const express= require('express');

const app = express();
const port=8080;

// Define the API routes
app.use(express.json());
app.get('./',(req,res)=>{

    res.send('Welcome to our API');
})