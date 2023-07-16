const express = require("express"); // install express
const bodyParser = require("body-parser"); //install body-parser
const mongoose = require("mongoose");
const cors = require("cors");

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

const app = new express();
app.use(bodyParser.json());
app.use(cors());


app.post("/login", (req, res) => {
  const { email, password } = req.body;
  db.collection("users_authentications").findOne(
    { email: email, password: password },
    (err, result) => {
      if (!result) {
        res.json("Username and password does not match");
      } else {
        console.log('RESULT', result);
        res.json(result);
      }
    },
  );
});

const jobs = mongoose.model('jobs', {
  title : {type : String},
  role: {type : String},
  company: {type : String},
  location: {type : String},
  startDate: {type : String},
  duratiion: {type : String},
  stipend: {type : String},
  applyBy: {type : String},
  applicants: {type : String},
  description: {type : String},
  skills: {type : Array},
  numberOfOpenings: {type : Number}
})

const users = mongoose.model('users_authentications', {
  name : {type : String},
  email : {type : String},
  mobile : {type : String},
  password : {type : String},
  skills : {type : Array}
})

app.get('/users', async (req, res) => {
  let promise = await users.find({}).exec();
  console.log(promise);
  res.json(promise);
})

app.post("/register", (req, res) => {
  const { name, password, email, mobile, skills} = req.body;
  db.collection("users_authentications").insertOne({
    name: name,
    password: password,
    email: email,
    mobile: mobile,
    skills: skills
  });
  res.json("Joined");
});

app.get("/jobs", async (req, res) => {
  let promise = await jobs.find({}).exec();
  console.log(promise);
  res.json(promise);
})

app.listen(4000, () => {
  console.log("listening on 4000");
});

