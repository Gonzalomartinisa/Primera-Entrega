const express = require('express');

const app = express();

app.use(express.json())
app.use(express.urlencoded({extended:true}))

const PORT = process.env.PORT || 8080

const routerProducts = require('./router/productos.router')
const routerCarrito = require('./router/carrito.router')

app.use('/api/productos', routerProducts )
app.use('/api/carrito', routerCarrito)

app.use('/static', express.static('public'))

app.get('/', (req, res) =>{
     res.sendFile(__dirname + '/public/index.html')
});

const server = app.listen(PORT, () => {
     console.log(`Server runing...`)
})
server.on('error', e =>console.log(`Error en server`, e))