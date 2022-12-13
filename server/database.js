const dotenv = require("dotenv");
const mongoose = require("mongoose")

dotenv.config();
let db = process.env.CONNECTION_STRING
mongoose.set('strictQuery', true);
mongoose.connect(db).then(console.log("Database connected"))
  .catch((err) => {
    console.log(err)
  })
;