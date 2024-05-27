const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const TodoModel = require('./Models/Todo')
require('dotenv').config()

const app = express()
const PORT = process.env.PORT || 3001

app.use(cors())
app.use(express.json())

mongoose.connect(process.env.MONGODB_URL)

app.get('/get', (req, res) => {
    TodoModel.find()
        .then(result => res.json(result))
        .catch(error => console.log(error))

})

app.put('/check/:id', async (req, res) => {
    const {id} = req.params
     const isDone = await TodoModel.find({_id: id}).then((result) => result[0].isDone)

    TodoModel.findByIdAndUpdate({_id: id}, {isDone: !isDone})
        .then(result => res.json(result))
        .catch(error => console.log(error))
})

app.post('/add', (req, res) => {
    const task = req.body.task
    TodoModel.create({
        task: task
    })
        .then(result=> res.json(result))
        .catch(error=> res.json(error))
})

app.delete('/delete/:id', (req, res) => {
    const {id} = req.params
    TodoModel.findByIdAndDelete({_id: id})
        .then(result=> res.json(result))
        .catch(error=> res.json(error))
})

app.listen(PORT, ()=> {
    console.log('Server is running')
})

