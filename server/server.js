const express = require('express');
const app = express();
const port = process.env.PORT || 5000;

// app.get('/', (res) => res.send('hello John'))

app.listen(port, () => console.log(`Example app listening on port ${port}`))

// create the GET route
app.get('/express_backend', (req, res) => {
  res.send({ express: 'your express backend is connected'});
})