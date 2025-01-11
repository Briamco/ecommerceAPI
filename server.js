const express = require('express')

const PORT = 3000
const app = express()

const products = []

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
        id: new Date(),
        title,
        price: `$${price}` || '$0.00',
    }
})

app.listen(PORT, () => {
    console.log(`Run on port ${PORT}`);
} )