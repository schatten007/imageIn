const axios = require('axios');

const apiClient = axios.create({
  baseURL: 'https://api.stability.ai/v1/',
  headers: {
    'Content-Type': 'application/json'
  }
});



module.exports = {
  apiClient
}