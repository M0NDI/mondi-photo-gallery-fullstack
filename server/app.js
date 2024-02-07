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
// Serve static files from the build folder
app.use(express.static(path.join(__dirname, "build")));

const allowedOrigins = ["http://localhost:5173", "https://mondi-photo-gallery.onrender.com"];

app.use(
  cors({
    origin: allowedOrigins,
    credentials: true,
  })
);
app.use(express.json());
app.use("/", logger);

app.use(morgan("common"));
app.use(cookieParser(process.env.JWT_SECRET)); // cookies now in req.signedCookies

// routers
const authRouter = require("./routes/authRouter");
const userRouter = require("./routes/userRouter");
const imagesRouter = require("./routes/imagesRouter");

// routes
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/users", userRouter);
app.use("/api/v1/images", imagesRouter);

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "dist", "index.html"));
});

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
  app.listen(port, "0.0.0.0", (err) => {
    if (err) throw err;
    console.log(`Listening on port ${port}`);
  });
};

start();
