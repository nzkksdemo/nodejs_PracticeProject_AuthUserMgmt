const express = require('express');

const router = express.Router();

let friends = {
  'johnsmith@gamil.com': { firstName: 'John', lastName: 'Doe', DOB: '22-12-1990' },
  'annasmith@gamil.com': { firstName: 'Anna', lastName: 'smith', DOB: '02-07-1983' },
  'peterjones@gamil.com': { firstName: 'Peter', lastName: 'Jones', DOB: '21-03-1989' }
};

// GET request: Retrieve all friends
router.get('/', (req, res) => {
  res.send(JSON.stringify(friends, null, 4));
});

// GET by specific ID request: Retrieve a single friend with email ID
router.get('/:email', (req, res) => {
  const email = req.params.email;

  if (email) {
    res.send(friends[email]);
  } else {
    res.send('Unable to find friend!');
  }
});

// POST request: Add a new friend
router.post('/', (req, res) => {
  if (req.body.email) {
    friends[req.body.email] = {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      DOB: req.body.DOB
    };
  }

  res.send(`The friend ${req.body.firstName} has been added`);
});

// PUT request: Update the details of a friend with email id
router.put('/:email', (req, res) => {
  let friend = friends[req.params.email];

  if (friend) {
    if (req.body.firstName) {
      friend.firstName = req.body.firstName;
    }

    if (req.body.lastName) {
      friend.lastName = req.body.lastName;
    }

    if (req.body.DOB) {
      friend.DOB = req.body.DOB;
    }

    res.send(`The friend (${req.params.email})'s details has been updated`);
  } else {
    res.send('Unable to find friend!');
  }
});

// DELETE request: Delete a friend by email id
router.delete('/:email', (req, res) => {
  if (req.params.email) {
    delete friends[req.params.email];
    res.send(`The friend (${req.params.email})'s details has been deleted`);
  } else {
    res.send('Unable to find friend!');
  }
});

module.exports = router;
