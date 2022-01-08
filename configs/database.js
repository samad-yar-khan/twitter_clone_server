
const { MongoClient } = require('mongodb');
const { db } = require('./environment');
const environment = require('./environment');


const uri = `mongodb+srv://samad:${environment.db_pass}@cluster0.ypaul.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;

const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

client.connect(err => {
  const collection = client.db("test").collection("devices");
  console.log(err);
  // perform actions on the collection object
  client.close();
});

db.on('error' , console.error.bind(console, "ERROR CONNECTING TO DB"));

db.once('open' , function(){
    console.log("Connected to MongoDB");
});

module.exports = db;