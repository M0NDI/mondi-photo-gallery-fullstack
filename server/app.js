const express = require("express");
const app = express();
const cors = require("cors");
require("dotenv").config();

const logger = require("./middleware/eventLogger");

// rest of the packages
const morgan = require("morgan");
const cookieParser = require("cookie-parser");

// db
const connectDB = require("./db/connect");

// middleware
app.use(express.json());
app.use("/", logger);
app.use(cors({ origin: "http://localhost:5173", credentials: true }));
app.use(morgan("common"));
app.use(cookieParser(process.env.JWT_SECRET)); // cookies now in req.signedCookies

// routers
const authRouter = require("./routes/authRouter");
const userRouter = require("./routes/userRouter");
const isAuthenticated = require("./utils/authenticate");

// routes
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/users", isAuthenticated, userRouter);

app.get("/", (req, res) => {
  console.log(req.signedCookies);
  res.send(`Server up and running`);
});

// start
const port = 3000;
const start = () => {
  try {
    connectDB(process.env.MONGO_URI);
    console.log(`Connected to DB`);
  } catch (error) {
    console.log(error);
  }
  app.listen(port, console.log(`Server listening on port ${port}`));
};

start();
