const express = require('express');
const app = express();

app.use(express.static('../client/build/')); 

// app.get('/', (res) => res.send('hello John'))

app.listen(5000, () => console.log("Example app listening on port 5000"))

// // old way
// app.listen(3000, function(){
//   console.log('listening to to port 5000')
// })

// create the GET route
// app.get('/express_backend', (req, res) => {
//   res.send({ express: 'your express backend is connected'});
// })

// app.get('/express_backend', (req, res) => {
//   res.sendFile(index.html)
// })

app.get ('/', function(req, res){
  res.sendFile('index.html');
})