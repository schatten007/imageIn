const express = require('express');
require('./config/mongoose')
require('dotenv').config()
const cors = require('cors');
const app = express();

const PORT = process.env.PORT || 3000;

app.use(cors());

app.listen(PORT, () => {
    console.log('Server is running on port ' + PORT);
})