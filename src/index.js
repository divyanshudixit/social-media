const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));



const mongoURI = process.env.MONGODB_URI;
mongoose.connect(mongoURI)
    .then(() => {
        console.log('MongoDB connected');
        startServer();
    })
    .catch(err => console.error('MongoDB connection error:', err));


const userRoutes = require('./routes/userRoutes');
const discussionRoutes = require('./routes/discussionRoutes');
const commentRoutes = require('./routes/commentRoutes');



app.use('/api', userRoutes);
app.use('/api', discussionRoutes);
app.use('/api', commentRoutes);


function startServer() {
    const port = process.env.PORT || 3000;
    app.listen(port, () => {
        console.log(`Server is running on port ${port}`);
    });
}

module.exports = app;
