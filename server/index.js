const express = require("express");
const cors = require("cors");
require("./database");

// const dotenv = require("dotenv");
// const mongoose = require("mongoose")


// dotenv.config();

// mongoose.set('strictQuery', true);
// mongoose.connect(process.env.CONNECTION_STRING, () =>
//   console.log("Database connected")
// );

const app = express();
const PORT = 5000;

app.use(cors({ origin: true }));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use((req, res, next) => {
  console.log(req.method);
  console.log(req.path);
  next();
});

app.get('/api', (req, res) => {
    console.log("Tjena")
    res.send('Hello World!')
  })
  
  app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`)
  })