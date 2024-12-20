const express = require('express')
const {getIngredients, createIngredients} = require('../controllers/ingredientsControllers')
const ingredientsRouter = express.Router()

ingredientsRouter.get('/ingredients', getIngredients)
ingredientsRouter.post('/ingredients', createIngredients)


module.exports = {
    ingredientsRouter
}