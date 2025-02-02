import express from 'express'

const app = express()
const port = 3000
app.use(express.json())

const investmentData = []
let nextId = 1
app.post('/invest-money', (req, res) => {
    const { asset, investment } = req.body;
    const newInvestment = { id: nextId++, asset, investment }
    investmentData.push(newInvestment)
    res.status(200).send(newInvestment)
})

app.get('/invest-money', (req, res) => {
    res.status(200).send(investmentData)
})

app.get('/invest-money/:id', (req, res) => {
    const id = req.params.id;
    const investment = investmentData.find(i => i.id = id)
    if (investment) {
        res.status(200).send(investment)
    } else {
        res.status(404).send("No investment found!!")
    }
})

app.put('/invest-money/:id', (req, res) => {
    const id = req.params.id;
    const { asset, investment } = req.body;
    const oldInvestment = investmentData.find(i => i.id = id)
    if (oldInvestment) {
        oldInvestment.asset = asset
        oldInvestment.investment = investment
        res.status(200).send("Update Successful")
    } else {
        res.status(404).send("No investment found!!")
    }
})

app.delete('/invest-money/:id', (req, res) => {
    const id = req.params.id;
    const index = investmentData.findIndex(i => i.id === parseInt(id))
    if (index !== -1) {
        investmentData.splice(index, 1)
        res.status(200).send("Investment deleted")
    } else {
        res.status(404).send("No investment found!!")
    }
})

app.listen(port, () => {
    console.log("Server is running at port ", port);
})