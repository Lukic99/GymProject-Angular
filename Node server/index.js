const express = require('express')
const bodyParser = require('body-parser');
const app = express()
var cors = require('cors')
app.use(cors()) 

app.use(bodyParser());
app.get('/', (req, res) => res.send('Hello World!'));

app.use('/api/trainers', require('./trainer'));

app.use('/api/clients', require('./clients'));

app.use('/api/trainings', require('./trainings'));

app.listen(3000, () => console.log('App Server listening on port 3000!'));