var express = require('express');
var jwt = require('jsonwebtoken');
var router = express.Router();

const trainers = [
  {
    id: 1,
    username: 'milan',
    password: 'milan',
    name: 'Milan Damjanović',
    imageUrl: 'https://xsport.rs/gym/images/cms/milan%20mala.jpg',
    age: 29,
    description: 'Big plates and AC/DC',
    specialization: 'Bodybuilding'
  },
  {
    id: 2,
    username: 'vuk',
    password: 'vuk',
    name: 'Vuk Todorovic',
    imageUrl: 'https://xsport.rs/gym/images/cms/vuk%20mala.jpg',
    age: 31,
    description: 'Eat big get big',
    specialization: 'Powerlifter'
  },
  {
    id: 3,
    username: 'edi',
    password: 'edi',
    name: 'Edvard Hall',
    imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSwHFSpTdS5APgZEHnUNSkVuV_LYbShzj27pg&usqp=CAU',
    age: 34,
    description: 'Breakfast is the most important meal of the day; this is where most people will make their first big mistake if they are trying to lose weight.',
    specialization: 'Strongman'
  }
];

router.post('/login', (req, res) => {
  var trainer = req.body;
  found = false;
  id = -1
  trainerName =''
  for (let index = 0; index < trainers.length; index++) {
    if (trainers[index].username == trainer.username) {
      if (trainers[index].password == trainer.password) {
        found = true;
        id = trainers[index].id
        trainerName = trainers[index].name
      }
    }
  }
  if (found) {
    res.json({
      msg: 'Successfully logged in',
      id: id,
      name: trainerName,
      token: jwt.sign({ trainer: trainer.username }, 'SECRET')
    });
  } else {
    res.status(400).json({ msg: 'Invalid username or password' });
  }
  // if (trainers[trainer.username] && trainers[trainer.username] === trainer.password) {
  //   res.json({
  //     msg: 'Successfully logged in',
  //     token: jwt.sign({trainer: trainer.username}, 'SECRET')
  //   });
  // } else {
  //   res.status(400).json({msg: 'Invalid username or password'});
  // }
});


////        OVO CISTO ZA PROVERU
// router.get('/', (req, res) => {
//   var query = (req.query['q'] || '').toLowerCase();
//   if (query) {
//     const foundClients = trainers.filter(
//       (client) => client.name.toLowerCase().indexOf(query) != -1);
//     return res.status(200).json(foundClients);
//   }
//   return res.status(200).json(trainers);
// });

router.post('/register', (req, res) => {
  var trainer = req.body;
  if (trainers[trainer.username]) {
    res.status(400).json({ msg: 'Trainer already exists, please login.' });
  } else {
    trainers[trainer.username] = trainer.password;
    res.json({
      msg: 'Successfully created trainer, please login'
    });
  }
});

module.exports = router;