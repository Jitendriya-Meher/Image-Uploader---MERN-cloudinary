require("dotenv").config();
const express = require("express");
const app = express();
 
const cors = require("cors");
const PORT = process.env.PORT || 4000;

app.use(express.json());
app.use(cors());

// db connection
const connectDB = require("./db/conn");
connectDB();

// routers
const router = require("./routes/router");
app.use(router);

app.listen(PORT, () => {
    console.log("server listening on port",PORT);
});