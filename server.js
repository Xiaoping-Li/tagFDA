const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

const PORT = process.env.PORT || 5000;
const server = express();

const db = require('./config/keys_dev').mongoURI;
const Drugs = require('./models/Drug');
const drugs = require('./populateProducts.js');

// Setup some middleware
server.use(bodyParser.urlencoded({ extended: false }));
server.use(bodyParser.json());
server.use(cors({
  origin: true,
  credentials: true,
}));



// Routers
server.get('/drugs', (req, res) => {
  Drugs
    .find()
    .then(drugs => res.status(200).json(drugs))
    .catch(err => console.log('Error when try to get drugs: ' + err));
});

// Seeding MongoDB Atlas with data in drugs array
// server.post('/drugs', (req, res) => {
//   Drugs
//     .create(drugs)
//     .then(result => res.status(200).json(result))
//     .catch(err => console.log('Error when try to create drugs: ' + err))
// });





// Connect to MongoDB
mongoose.Promise = global.Promise;
mongoose
  .connect(db, {useNewUrlParser: true, useFindAndModify: false, useCreateIndex: true})
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.log(err));

server.listen(PORT, () => console.log(`server listen on ${PORT}`));