const express = require('express');
require('dotenv').config();
const cookieParser = require("cookie-parser");
const connectWithDb = require('./config/db');

const app = express();

//routes
const authRoutes = require('./routes/auth');

//CONNECTED WITH DATABASES
connectWithDb();

//middlware
app.use(express.json());
app.use(cookieParser());

//route
app.use('/api/v1', authRoutes);

app.get('/', (req, res) => {
  res.send('hello world');
});

app.listen(process.env.PORT, () => {
  console.log(`app is runnig at port ${process.env.PORT}`);
});
