const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');

const app = express();

dotenv.config();
const mongoUri = process.env.DB_URI

mongoose.connect(mongoUri, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true
});

mongoose.connection.on('connected', () => {
  console.log('Connected to mongo instance');
});

mongoose.connection.on('error', (err) => {
  console.error('Error', err);
});


app.get('/', (req, res) => {
  res.send('Hi there');
});

app.listen(3000, () =>{
  console.log('Listening at port 3000')
});