const express = require('express')
const path = require('path')
const app = express()
const port = 3001

//configuracion de la carpeta estatica
const publicPath = path.join(__dirname,'public');
app.use(express.static(publicPath))

app.get('/', (req, res) => {
   res.sendFile(path.join(__dirname,'views', 'index.html'))
});

//ruta Detalle de producto
app.get("/detalleProducto", (req, res) => {
   res.sendFile(path.join(__dirname, "views", "productDetail.html"));
 });

//ruta login
app.get('/login', (req, res) => {
   res.sendFile(path.join(__dirname,'views','login.html'))
 }) 

//ruta registro
app.get('/register', (req, res) => {
   res.sendFile(path.join(__dirname,'views','register.html'))
 })

 //ruta carrito
/*app.get('/MisCompras', (req, res) => {
  res.sendFile(path.join(__dirname,'views','productCart.html'))
}) */

 //ruta carrito otro
 app.get('/MisCompras', (req, res) => {
  res.sendFile(path.join(__dirname,'views','carrito.html'))
}) 

app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`)
})
