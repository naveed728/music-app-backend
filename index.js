const express = require("express");
const cors = require("cors");
const db = require("./dbconnection")
const routes = require("./routes/routes");  
require('dotenv').config();


const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/v1/user/", routes);

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
