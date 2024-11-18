const mongoose = require('mongoose');
const mongoURI='mongodb://localhost:27017/inotebooks';
const connectToMongodb =()=>{
    mongoose.connect(mongoURI)
       .then(() => console.log('MongoDB Connected...'))
       .catch(err => console.error(err));
}

module.exports = connectToMongodb;