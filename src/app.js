const { log } = require('console');
const express = require('express');
const path = require('path');
const app = express();

app.get('/', (req, res) => {
   res.sendFile(path.join(__dirname, 'src','views', 'index.html'))
});

const publicPath = path.join(__dirname, 'src');

app.use(express.static(publicPath));

app.listen(3000, ()=> console.log(`http://localhost:3000`));

