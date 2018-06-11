const express = require('express');
const app = express();
const path = require('path');
// Use port if exist else use localhost 3000
const port = process.env.PORT || 3000;

app.use(express.static(path.join(__dirname, '../public')));

// When we refresh, we will get 404 error since we are doing client routing.
// Hence, we will just catch those 404 errors and pass back index.html again
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/index.html'));
});

app.listen(port, () => {
  console.log('Server is up!');
});