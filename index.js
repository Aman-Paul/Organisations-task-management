require("dotenv").config();
require("express-async-errors");
const { Sequelize } = require('sequelize');

const DB_CONFIG = require('./database/db.config.json');
const authRoutes = require('./routes/authRoutes');


const cors = require("cors");
// error handler
const notFoundMiddleware = require('./middlewares/not-found');
const errorHandlerMiddleware = require('./middlewares/error-handler');

const express = require("express"); 
const app = express();
const PORT = process.env.PORT || 3000;
const HOST = process.env.HOST || "localhost";
const ENV = process.env.NODE_ENV || "development";


const sequelize = new Sequelize(DB_CONFIG[ENV].DB_URL);

// express middleware 
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.send("Hello World!");
});

// routes
app.use(`/auth`, authRoutes);

app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware); 

app.listen(PORT, async () => {
  try {
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');
    console.log(`Example app listening at http://${HOST}:${PORT}`);
  } catch (error) {
    console.log("Error in Connecting Database", error.toString());
    process.exit(1);
  }
});
