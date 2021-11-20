const axios = require('axios');

axios.get('http://localhost:3030/api/v1/redis/get/test').then(({ data }) => console.log(data));
