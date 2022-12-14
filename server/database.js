const dotenv = require("dotenv");
const mongoose = require("mongoose")

dotenv.config();
let db = process.env.CONNECTION_STRING

mongoose.set('strictQuery', true);

mongoose.connect(db,  { useNewUrlParser: true }).then(() => console.log("MongoDB successfully connected"))
  .catch((err) => {
    console.log(err)
  })
;