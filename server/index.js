import express from "express";
import cors from "cors"

const server = express();
server.use(cors());
const PORT = 5000;

server.get('/api', (req, res) => {
    console.log("Tjena")
    res.send('Hello World!')
  })
  
  server.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`)
  })