const mongoose = require('mongoose');

const connectWithDb = () => {
  mongoose
    .connect(process.env.DB_URL, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
      useCreateIndex: true,
    })
    .then(console.log('DB connected successfuly'))
    .catch((err) => {
      console.log('DB not connected');
      process.exit(1);
    });
};

module.exports = connectWithDb;
