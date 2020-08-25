const express = require('express');
const app = express();

app.get('/', (req, res) => {
  return res.json('API Online')
});

app.listen(3001, () => {
  console.log('Server Online')
});