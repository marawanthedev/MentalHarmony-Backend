const express = require("express");
const dotEnv = require("dotenv").config();
const port = process.env.PORT || 5000;
const userRoutes = require("./src/routes/userRoutes");
const dailyPopUpRoutes = require("./src/routes/dailyPopUpRoutes");
const feelingsRoutes = require("./src/routes/feelingRoutes");
const approvalRequestRoutes = require("./src/routes/approvalRequestRoute");
const { errorHandler } = require("./src/middleware/errorMiddleWare");
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

// Add headers before the routes are defined

//use is for using other routers
app.use("/api/users", userRoutes);
app.use("/dailyPopUp", dailyPopUpRoutes);
app.use("/feeling", feelingsRoutes);
app.use("/requests", approvalRequestRoutes);

app.listen(port, () => {});
