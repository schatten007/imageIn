const mongoose = require('mongoose');

mongoose.connect('mongodb://127.0.0.1:27017/ImageIn-Database', {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log('Mongoose connected successfully');
}).catch((err) => {
  console.error(err);
});