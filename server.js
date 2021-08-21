const mongoose = require('mongoose');
const express = require('express');
const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

app.use(require('./routes'));

mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/chukl', {
  useFindAndModify: false,
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverSelectionTimeoutMS: 5000
})
.then(serverStart)
.catch(err => {
  if(err)
  console.log({errorMessage: "MongoDB server is not initialized"})
})

function serverStart(){
  mongoose.set('debug', true);
  app.listen(PORT, () => console.log(`🌍 Connected on localhost:${PORT}`));
}
