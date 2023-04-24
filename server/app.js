const express = require('express');
require('dotenv').config()
const cors = require('cors');
require('./config/mongoose')
require('./config/passport')
const app = express();
const userRouter = require('./routers/User');
const imageRouter = require('./routers/Image');

const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use('/user', userRouter);
app.use('/images', imageRouter);

app.listen(PORT, () => {
    console.log('Server is running on port ' + PORT);
})