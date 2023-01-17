const dotenv = require("dotenv");
const mongoose = require("mongoose")

dotenv.config();
let db = process.env.CONNECTION_STRING
if (process.env.NODE_ENV === "test") {
  db = process.env.TEST_CONNECTION_STRING
}

console.log("NODEENV", process.env.NODE_ENV)

mongoose.set('strictQuery', true);

mongoose.connect(db,  { useNewUrlParser: true }).then(() => console.log("MongoDB successfully connected"))
  .catch((err) => {
    console.log(err)
  })
;