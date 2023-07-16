const mongoose = require("mongoose");

const connectionString = "mongodb://127.0.0.1/mindfull-internships"; //localhost:27017
mongoose.connect(connectionString);
mongoose.Promise = global.Promise;

var db = mongoose.connection;

db.on("connected", () => {
  console.log("Connected");
});

db.on("error", () => {
  throw new Error("Connection error");
});

const getJobs = () => {
    db.collection("jobs").findAll({}, (err, result) => {
      if(result){
        return result;
      } else {
        res.sendStatus(400);
      }
    })
  }

  export default getJobs;