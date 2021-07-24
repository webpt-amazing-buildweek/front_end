const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const port = 5000;
const app = express();
const token =
  'esfeyJ1c2VySWQiOiJiMDhmODZhZi0zNWRhLTQ4ZjItOGZhYi1jZWYzOTA0NUIhkufemQifQ';

let nextId = 7;

let items = [
  {
    id:0,
    item_name:"something 0",
    location:"somewhere 0",
    quantity:0,
    price:0,
    description:"some text 0",
    user_id:0
  },
  {
    id:1,
    item_name:"something 1",
    location:"somewhere 1",
    quantity:1,
    price:1,
    description:"some text 1",
    user_id:1
  },
  {
    id:2,
    item_name:"something 2",
    location:"somewhere 2",
    quantity:2,
    price:2,
    description:"some text 2",
    user_id:2
  },
  {
    id:3,
    item_name:"something 3",
    location:"somewhere 3",
    quantity:3,
    price:3,
    description:"some text 3",
    user_id:3
  },
  {
    id:4,
    item_name:"something 4",
    location:"somewhere 4",
    quantity:4,
    price:4,
    description:"some text 4",
    user_id:4
  },

];

app.use(bodyParser.json());

app.use(cors());

function authenticator(req, res, next) {
  const { authorization } = req.headers;
  if (authorization === token) {
    next();
  } else {
    res.status(403).json({ error: 'User must be logged in to do that.' });
  }
}
app.get('/',(req, res)=>{
  res.status(200).json({
    payload:"api is working"
  });
});

// endpoints
// Users
//     [POST] https://saudi-market-app.herokuapp.com/api/auth/register
//         returns user object
//     [POST] https://saudi-market-app.herokuapp.com/api/auth/login
//         returns token, user object
//     Items
//     [GET]   ALL ITEMS: https://saudi-market-app.herokuapp.com/api/items
//         returns array of all items
//     [GET]   ITEMS BY ID: https://saudi-market-app.herokuapp.com/api/items/:id
//         returns item object
//     [POST]  ITEM NEW ITEM: https://saudi-market-app.herokuapp.com/api/items
//         returns item object
//     [PUT]   UPDATE ITEM: https://saudi-market-app.herokuapp.com/api/items/:id
//         returns item object
//     [DELETE]DELETE ITEM: https://saudi-market-app.herokuapp.com/api/items/:id
//         returns delete message



app.post('/api/auth/register', (req, res) => {
  const { username, password, email, isOwner } = req.body;
  res.status(200).json(
    {
      id:0,
      username,
      password,
      email,
      isOwner
    }
  );
});

app.post('/api/auth/login', (req, res) => {
  const { username, password } = req.body;
  if (username === 'lambda' && password === 'school') {
    req.loggedIn = true;
    res.status(200).json({
      token,
      user:{
        id:0,
        username,
        password,
        email:"cool@gmail.com",
        isOwner:true
      }
    });
  } else {
    res
      .status(403)
      .json({ error: 'Username or Password incorrect. Please see Readme' });
  }
});


app.get('/api/items', (req, res) => {

  res.send(items);
});

app.post('/api/items', (req, res) => {
  const item = { id: getNextId(), ...req.body };

  items = [...items, item];

  res.send(item);
});


app.get('/api/items/:id', (req, res) => {
  const item = items.find(f => f.id == req.params.id);

  if (item) {
    res.status(200).json(item);
  } else {
    res.status(404).send({ msg: 'item not found' });
  }
});


app.put('/api/items/:id', (req, res) => {
  const { id } = req.params;

  const itemIndex = items.findIndex(f => f.id == id);

  if (itemIndex > -1) {
    const item = { ...items[itemIndex], ...req.body };

    items = [
      ...items.slice(0, itemIndex),
      item,
      ...items.slice(itemIndex + 1)
    ];
    res.send(item);
  } else {
    res.status(404).send({ msg: 'item not found' });
  }
});

app.delete('/api/items/:id', (req, res) => {
  const { id } = req.params;

  items = items.filter(f => f.id !== Number(id));

  res.send(`item ${id} deleted`);
});

function getNextId() {
  return nextId++;
}

app.listen(port, () => {
  console.log(`server listening on port ${port}`);
});
