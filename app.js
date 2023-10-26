const { log } = require('console');
const express = require('express');
const path = require('path');
const app = express();

app.get('/', (req, res) => {
   res.sendFile(path.join(__dirname, 'design', 'index.html'))
});

app.listen(3000, ()=> {
   console.log("servidor en marcha");
})

