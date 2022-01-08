
const { MongoClient } = require('mongodb');
const Mongoose  = require('mongoose');
const env = require("./environment");
// console.log(env.db_pass);


const uri = `mongodb+srv://samad:${env.db_pass}@cluster0.ypaul.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
const connectionParams={
  useNewUrlParser: true,
  useUnifiedTopology: true 
}
Mongoose.connect(uri,connectionParams)
  .then( () => {
      console.log('Connected to database ')
  })
  .catch( (err) => {
      console.error(`Error connecting to the database. \n${err}`);
  })

const db= Mongoose.connection;
db.on('error' , console.error.bind(console, "ERROR CONNECTING TO DB"));

db.once('open' , function(){
    console.log("Connected to MongoDB");
});
module.exports = db;