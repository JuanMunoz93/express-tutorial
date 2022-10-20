require("express-async-errors");
const express = require('express');
const cors = require('cors');
const routerApi = require('./routes');
const {logErrors, errorHandler, boomErrorHandler} = require('./middlewares/error.handler');

const app = express();
const port = 3000;

app.use(express.json());

const whitelist = ['http://127.0.0.1:5500', 'https://myapp.co', undefined];
const options = {
  origin: (origin, callback) => {
    if (whitelist.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error(`origen "${origin}" no permitido`));
    }
  }
}
app.use(cors(options));

routerApi(app);
app.use(logErrors);
app.use(boomErrorHandler);
app.use(errorHandler);

app.listen(port,()=>{
  console.log(`mi port ${port}`);
});
