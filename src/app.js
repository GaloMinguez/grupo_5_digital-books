const express = require('express')
const path = require('path')
const app = express()
const port = 3001

//configuracion de la carpeta estatica
const publicPath = path.join(__dirname,'public');
app.use(express.static(publicPath))

const mainRoutes = require('./routes/mainRoutes');

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.get("/", mainRoutes);
app.get("/register", mainRoutes);
app.get("/login", mainRoutes);
app.get("/productDetail", mainRoutes);
app.get("/carrito", mainRoutes);
app.get("/productCrud", mainRoutes);
app.get('*', mainRoutes);

app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`)
})
