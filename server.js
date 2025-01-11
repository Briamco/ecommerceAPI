const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')

const PORT = 3000
const app = express()

const products = []

app.use(bodyParser.json())
app.use(cors())

app.get('/api/products', (req, res) => {
    res.json(products)
})

app.post('/api/products', (req, res) => {
    const { title, price } = req.body

    const formatPrice = Number(price)

    if (!title) {
        return res.status(400).json({ error: "El titulo es obligatorio" })
    }

    if (!price) {
        return res.status(400).json({ error: "El price es obligatorio" })
    } else if (isNaN(price)) {
        return res.status(400).json({ error: "El price debe ser un numero" })
    } else if (price <= 0) {
        res.status(400).json({ error: "El price debe ser mayor a 0" })
    }

    const newProdcut = {
        id: products.length + 1,
        title,
        price: `$${price}` || '$0.00',
    }

    products.push(newProdcut)
    res.status(201).json(newProdcut)
})

app.delete('/api/products/:id', (req, res) => {
    const { id } = req.body
    const prodIndex = products.findIndex(prod => prod.id === id)

    if (prodIndex === -1) {
        return res.status(404).json({ error: "Este producto no existe" })
    }

    products.slice(prodIndex, 1)
    res.status(204).json({ message: `El produncto con la id: ${id} fue eliminado` })
})

app.listen(PORT, () => {
    console.log(`Run on port ${PORT}`);
} )