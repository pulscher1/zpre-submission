const express = require('express');
const app = express();
const knex = require("knex")(require('./knexfile.js')['development'])
const cors = require('cors');
const session = require('express-session');
const bcrypt = require('bcryptjs');
const salty = 10 //why no pepper?
const port = 8081;

//Testing bycrypt

//End testing bcrypt

app.use(express.json());
app.use(
    cors({
        origin: 'http://localhost:3000',
        credentials: true,
    })
);

app.use(
    session({
        secret: 'test',
        resave: false,
        saveUninitialized: true,
    })
);

app.get('/', (req, res) => {
    res.send('My API works!!!!!!!!!!!!')
})

//GET inventory 
app.get('/inventory', (req, res) => {
    knex('item')
        .select('*')
        .then(data => res.status(200).json(data))
        .catch((err) => res.status(500).json(err));
});

//GET item by id 
app.get('/inventory/:id', (req, res) => {
    const id = req.params.id;
    knex('item')
        .where('id', id)
        .then(data => res.status(200).json(data))
        .catch((err) => res.status(500).json(err));
});

//GET item by id for user
app.get('/userInventory/:id', (req, res) => {
    const id = req.params.id;
    console.log('Requested ID:', id); // check if ID is what you expect
    knex('item')
        .where('id', id)
        .then(data => res.status(200).json(data))
        .catch((err) => res.status(500).json(err));
});

//GET item by user id  -- page after login
app.get('/user/:user_id', (req, res) => {
    const user_id = parseInt(req.params.user_id, 10);
    //console.log("Received user_id:", user_id);

    knex('item')
    .select('id', 'user_id', 'item_name', 'description', 'quantity') 
    .where('user_id', user_id)
    .then(data => res.status(200).json(data))
    .catch((err) => res.status(500).json(err));
});

//GET users
app.get('/users', (req, res) => {
    knex('user_table')
        .select('*')
        .then(data => res.status(200).json(data))
        .catch((err) => res.status(500).json(err));
});


//POST creating an account 
app.post('/createAccount', (req, res) => {
    const { first_name, last_name, username, password } = req.body;

    bcrypt.hash(password, salty)
        .then(hashedPassword => {
            const user = {
                first_name: first_name,
                last_name:last_name ,
                username: username,
                password: hashedPassword 
            };
            return knex('user_table').insert(user);
        })
        .then(data => res.status(200).json(data))
        .catch((err) => res.status(500).json(err));
});


//POST login
app.post('/login', (req, res) => {
    const { username, password } = req.body;
    knex('user_table')
        .where('username', username)
        .first()
        .then(user => {
            if (!user) {
                return res.status(400).json({ error: 'Incorrect username or password.' });
            }
            bcrypt.compare(password, user.password)
                .then(match => {
                    if (match) {
                        res.status(200).json({
                            message: 'Log In success!!',
                            user_id: user.id,       
                            username: user.username 
                        });
                    } 
                });
        })
        .catch((err) => res.status(500).json(err));
});


//POST add item
app.post('/addItem', (req, res) => {
    const { user_id, item_name, description, quantity } = req.body;
    knex('item')
        .insert({
            user_id: user_id,
            item_name: item_name,
            description: description,
            quantity: quantity
        })
        .then(() => res.status(201).json('A new item has been added.'))
        .catch((err) => res.status(500).json(err));
});

//DELETE item
app.delete('/delete/:id', (req, res) => {
    const id = req.params.id;
    knex('item')
        .where('id', id)
        .del()
        .then(() => res.json('Item has been deleted.'))
        .catch((err) => res.status(500).json(err));
});

//PATCH update item
app.patch('/edit/:id', async (req, res) => {
    const id = req.params.id;
    const updatedItem = req.body;
    knex('item')
        .where('id', id)
        .update(updatedItem)
        .returning('*')
        .then(() => res.json('Item has been updated.'))
        .catch((err) => res.status(500).json(err));
});



app.listen(port, () => console.log(`Express listening on port ${port}`))