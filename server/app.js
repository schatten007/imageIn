const express = require('express');
require('./config/mongoose')
require('./config/passport')
require('dotenv').config()
const cors = require('cors');
const app = express();
const userRouter = require('./routers/User');

const PORT = process.env.PORT || 3000;

app.use(cors());
app.use('/user', userRouter);

app.listen(PORT, () => {
    console.log('Server is running on port ' + PORT);
})