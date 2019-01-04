const express = require('express');
const config = require('./server/configure');
const mongoose = require('mongoose');
let app = express();

app.set('port', process.env.PORT || 3300);
app.set('Views', `${__dirname}/Views`);
app = config(app);
mongoose.connect('mongodb://localhost/imgPloadr', {
  useNewUrlParser: true
});
mongoose.connection.on('open', () => {
  console.log('Mongoose Connected');
});

//the following snippet is not required
// app.get('/', function (req, res) => {
//   res.send('Hello World');
// });

const server = app.listen(app.get('port'), () => {
  console.log(`Server up: http://localhost:${app.get('port')}`);
});
