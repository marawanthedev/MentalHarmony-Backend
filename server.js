const express = require("express");
const dotEnv = require("dotenv").config();
const port = process.env.PORT || 5000;
const userRoutes = require("./routes/userRoutes");
const { errorHandler } = require("./middleware/errorMiddleWare");
const colors = require("colors");
const { connectDB } = require("./config/db");
const cors = require("cors");
connectDB();

const app = express();

//required for body parsing
app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(errorHandler);
//use is for using other routers
app.use("/api/users", userRoutes);

app.listen(port, () => {});
