require("dotenv").config();
require("express-async-errors");
const express = require("express"); 
const Fs = require("fs");
const cors = require("cors");

const routes = require('./routes');
// error handler
const notFoundMiddleware = require('./middlewares/not-found');
const errorHandlerMiddleware = require('./middlewares/error-handler');

const app = express();
const PORT = process.env.PORT || 3000;
const HOST = process.env.HOST || "localhost";

// express middleware 
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.use('/', routes);

app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware); 

app.listen(PORT, async () => {
  try {
    console.log(`Example app listening at http://${HOST}:${PORT}`);
  } catch (error) {
    console.log("Error in Connecting Database", error.toString());
    process.exit(1);
  }
});
