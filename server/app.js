const express = require("express");
const app = express();
require("dotenv").config();

const logger = require("./middleware/eventLogger");

// db
const connectDB = require("./db/connect");

// middleware
app.use(express.json());
app.use("/", logger);

// routers
const authRouter = require("./routes/authRouter");
const userRouter = require("./routes/userRouter");

// routes
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/users", userRouter);

app.get("/", (req, res) => {
  res.send(`hi`);
});

// start
const port = 3000;
const start = () => {
  try {
    connectDB(process.env.MONGO_URI);
    console.log(`Connected to DB`)
  } catch (error) {
    console.log(error);
  }
  app.listen(port, console.log(`Server listening on port ${port}`));
};

start();
