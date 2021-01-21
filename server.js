require('./db')

const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const passport = require("passport");
const users = require("./routes/api/users");
const leads = require("./routes/api/leads");

const app = express();

app.use(cors());

app.use(
  bodyParser.urlencoded({
    extended: false
  })
);
app.use(bodyParser.json());

app.use(passport.initialize());
require("./config/passport")(passport);



const port = process.env.PORT || 5000; 

app.listen(port, () => console.log(`Server up and running on port ${port} !`));


app.use("/api/users", users);
app.use("/api/leads", leads);