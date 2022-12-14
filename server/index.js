const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
require("./database");
const userRoute = require("./routes/userRoute")

const app = express();
const PORT = 5000;

app.use(cors());
// app.use(express.json());
// app.use(express.urlencoded({
//   extended: false
// }));

app.use(
  bodyParser.urlencoded({
    extended: false
  })
);
app.use(bodyParser.json());

app.get('/', (req, res) => {
  console.log("Tjena")
  res.send('Hello World!')
})


app.use("/user", userRoute);
// app.use("/posts", postRoute);

app.listen(PORT, () => {
  console.log(`Server up and running on port ${PORT}`)
})