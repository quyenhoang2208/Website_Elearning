const express = require('express');
const bodyParser = require('body-parser');
var cors = require('cors');
const app = express();

app.use(express.static('public'));

app.use(bodyParser.json());

app.use(cors({origin: 'http://localhost:3000'}));

app.use('/api', require('./routes/api'));

app.listen(process.env.port || 8800, function(){
    console.log('Connect successfully');
});