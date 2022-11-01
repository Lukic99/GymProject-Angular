var express = require('express')
var router = express.Router();
var jwt = require('jsonwebtoken');

let clients = [
  {
    id: 1,
    name: 'Milan Damjanović',
    imageUrl: 'https://xsport.rs/gym/images/cms/milan%20mala.jpg',
    age: 29,
    trainingLog: 'Big plates and AC/DC',
    specialization : 'Bodybuilding'
  },
  {
    id: 2,
    name: 'Stanimir Novakovic',
    imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSh3cMqLpgeBRrGyRSY0RDrPKktO4rg4ifD2Q&usqp=CAU',
    age: 27,
    trainingLog: 'Signed up: 19.08.2022. \nHigh squat potential',
    specialization : 'Powerlifter'
  },
  {
    id: 3,
    name: 'Nikola Markovic',
    imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcReIl5vZPQRNLo6XVQNyMJF1hNUyyVLWkTcpQ&usqp=CAU',
    age: 22,
    trainingLog: 'Signed up: 19.08.2022.\nCrazy good at pushing exercises',
    specialization : 'Bodybuilding'
  },
  {//////
    id: 4,
    name: 'Nikolina Ivkovic',
    imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQuXE_vHUF3hd0eq0DX1-gkL2H_Iow-6TPpzQ&usqp=CAU',
    age: 29,
    trainingLog: 'Signed up: 12.07.2022.\nRomboids are a bit stiff, stretching exercizes are to be implemented atleas fout times a week',
    specialization : 'Strongman'
  },
  {
    id: 5,
    name: 'Ana Kikic',
    imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTNW83IsTWGdDXsCRulP_32EQ3MRIB6nu03vg&usqp=CAU',
    age: 26,
    trainingLog: 'Signed up: 18.06.2022.\nKnees caving in during moderate-heavy squats, core needs to be strengthened before moving to the next phase',
    specialization : 'Bodybuilding'
  },
  {
    id: 6,
    name: 'Milan Jokic',
    imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS7QSPPKjAtBL9a5Fl4NYlMURm7YNblP3pNoA&usqp=CAU',
    age: 24,
    trainingLog: 'Signed up: 18.06.2022.\nDude is a beast and knows what he is doing, just needs a spotter and sometimes an opionion on gym stuff.',
    specialization : 'Recreational lifter'
  }
];

var checkIfLoggedIn = (req, res, next) => {
  var token = req.get('X-AUTH-HEADER');
  var user = jwt.decode(token);
  if (user && user.user) {
    return next();
  }
  return res.status(403).json({msg: 'Please login to access this information'});
};

router.get('/', (req, res) => {
  var query = (req.query['q'] || '').toLowerCase();
  if (query) {
    const foundClients = clients.filter(
      (client) => client.name.toLowerCase().indexOf(query) != -1);
    return res.status(200).json(foundClients);
  }
  return res.status(200).json(clients);
});

router.get('/:id', (req, res) => {
  let clientId = req.params.id;
  const foundClient = clients.find((client) => client.id == clientId);
  if (foundClient) {
    res.json(foundClient);
  } else {
    return res.status(400).json({msg: 'client with id ' + clientId + ' not found.'})
  }
});

router.get('/delete/:id', (req, res) => {
  let clientId = req.params.id;
  let clientsBackup = clients.copyWithin(0,clients.length)
  clients = [];
  for(i=0; i<clientsBackup.length; i++){
    if(clientsBackup[i].id < clientId){
      clients[i]=clientsBackup[i]
    }else if(clientsBackup[i].id > clientId){
      clients[i-1]=clientsBackup[i]
      clients[i-1].id = i
    }
  }
  return res.status(200).json(clients)
});

router.post('/', (req, res) => {
  let client = req.body;

  if (client.id) {
    return res.status(400)
        .json({msg: 'Client seems to already have an id assigned'});
  }

  client.id = clients.length + 1;
  clients.push(client);
  return res.status(200).json(client);
});

// router.post('/', checkIfLoggedIn, (req, res) => {
//   let client = req.body;

//   if (client.id) {
//     return res.status(400)
//         .json({msg: 'Client seems to already have an id assigned'});
//   }

//   client.id = clients.length + 1;
//   client.quantityInCart = 0;
//   clients.push(client);
//   return res.status(200).json(client);
// });

//---------------------------------------------------------

// router.patch('/:id', checkIfLoggedIn, (req, res) => {
//   console.log('aaass')
//   let clientId = req.params.id;
//   const foundClient = clients.find((client) => client.id == clientId);
//   if (foundClient) {
//     let trainingLog = req.body.trainingLog;
//     foundClient.trainingLog += trainingLog;
//     return res.status(200).json({msg: 'Successfully updated'});
//   }
//   return res.status(400).json({msg: 'Client with id ' + clientId + ' not found.'});
// });

router.patch('/:id', (req, res) => {
  console.log('aaass')
  let clientId = req.params.id;
  const foundClient = clients.find((client) => client.id == clientId);
  if (foundClient) {
    let trainingLog = req.body.trainingLog;
    foundClient.trainingLog = trainingLog;
    return res.status(200).json({msg: 'Successfully updated'});
  }
  return res.status(400).json({msg: 'Client with id ' + clientId + ' not found.'});
});

module.exports = router;