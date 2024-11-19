const express = require('express');
const { PrismaClient, Prisma } = require('@prisma/client')
const app = express();
app.use(express.json());
const prisma = new PrismaClient()


const port = process.env.PORT || 8080;


// Return All Users
app.get("/users", async (request, response) => {
    const users = await prisma.user.findMany()
    console.log(users)
    response.json(users)
});

// Return  User by ID
app.get("/users/:id", async (req, response) => {
    const userbyID = await prisma.user.findUnique({
        where: {
          id: +req.params.id
        },
      })
    console.log(userbyID)
    response.json(userbyID)
});

// Create User + return camps
app.post("/users", async (req, response) => {
    const newUser = await prisma.user.create({
        data:{
            email: req.body.email,
            name: req.body.name
        }
    })
    console.log(newUser)
    response.json(newUser)
});

// Update user by ID
app.patch("/users/:id", async (req, response) => {
    const updateUser = await prisma.user.update({
        where: {
            id: +req.params.id //+ transforms the string in Int
        },
        data: req.body
    })
    console.log(updateUser)
    response.json(updateUser)
});

// test update recipe by UserID                           Possiveis Updates Futuros apos solucionar o criar receitas
app.patch("/users/:id/recipe", async (req, response) => {
    const updateUserNotes = await prisma.user.update({
        where: {
            id: req.params.id
        },
        data:{
            title: req.body.title,
            ingredients: req.body.ingredients,
            category: req.body.category,
            notes: req.body.notes,
          },
    })
    console.log(updateUserNotes)
    response.json(updateUserNotes)
});

// Return all recipes
app.get("/recipe", async (request, response) => {
    const recipes = await prisma.recipe.findMany()
    console.log(recipes)
    response.json(recipes)
});

// testar Create Recipe + Return Camps
app.post("/recipe", async (req, response) => {
    const ingredientes = [1,2,3]
    const newRecipe = await prisma.recipe.create({
        data:{
            title: req.body.title,
            ingredients: null,
            category: req.body.category,
            notes: req.body.notes,
            author: 1
          },
    })
    const recipeId = newRecipe.id;

    for(const ing in ingredients) {
        const newIngredient = await prisma.recipeIngredient.create({
            data: {
                recipeId: recipeId,
                ingredientId: ing,
                quantity: req.body.ingredient.quantity
            }
        })
    }
    console.log(newRecipe)
    response.json(newRecipe)

});

// testar create recipe
app.post("/recipe", async (request, response) => {
    const recipes = await prisma.recipe.create({
        data: {
            title: 'Arroz',
            ingredients: 'Arroz, Chocolate, Banana',
        },
    })
    console.log(recipes)
    response.json(recipes)
});


app.listen(port, () => {
    console.log("Server Listening on PORT:", port);
});

