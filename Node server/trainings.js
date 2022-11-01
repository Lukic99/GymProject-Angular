var express = require('express')
var router = express.Router();
var jwt = require('jsonwebtoken');

let trainings = [
  {
    id: 1,
    trainerId: 1,
    athlete: 'Pera Detlic',
    date: '2022-09-21 @ 12:00'
  },
  {
    id: 2,
    trainerId: 1,
    athlete: 'Milovan',
    date: '2022-09-20 @ 13:00'
  },
  {
    id: 3,
    trainerId: 1,
    athlete: 'Aleksandar',
    date: '2022-09-20 @ 15:00'
  },
  {
    id: 4,
    trainerId: 2,
    athlete: 'Nikola',
    date: '2022-09-14 @ 12:00'
  },
  {
    id: 5,
    trainerId: 2,
    athlete: 'Negoslav',
    date: '2022-09-11 @ 13:00'
  },
  {
    id: 6,
    trainerId: 3,
    athlete: 'Ilija',
    date: '2022-09-12 @ 12:00'
  },
  {
    id: 7,
    trainerId: 3,
    athlete: 'Radenko',
    date: '2022-09-14 @ 12:00'
  },
  {
    id: 8,
    trainerId: 3,
    athlete: 'Negoslav',
    date: '2022-09-11 @ 13:00'
  },
  {
    id: 9,
    trainerId: 3,
    athlete: 'Milivoj',
    date: '2022-09-12 @ 12:00'
  }
];

var checkIfLoggedIn = (req, res, next) => {
  var token = req.get('X-AUTH-HEADER');
  var user = jwt.decode(token);
  if (user && user.user) {
    return next();
  }
  return res.status(403).json({ msg: 'Please login to access this information' });
};

router.get('/', (req, res) => {
  // console.log('aaaaa');
  var query = (req.query['q'] || '').toLowerCase();
  if (query) {
    const foundTrainings = trainings.filter(
      (training) => training.name.toLowerCase().indexOf(query) != -1);
    return res.status(200).json(foundTrainings);
  }
  return res.status(200).json(trainings);
});

router.get('/:id', (req, res) => {
  let trainingId = req.params.id;
  const foundtraining = trainings.find((training) => training.id == trainingId);
  if (foundtraining) {
    res.json(foundtraining);
  } else {
    return res.status(400).json({ msg: 'training with id ' + trainingId + ' not found.' })
  }
});

router.get('/name/:id', (req, res) => {
  let athleteName = req.params.id;
  const foundtraining = trainings.filter((training) => training.athlete == athleteName);
  if (foundtraining) {
    res.json(foundtraining);
  } else {
    return res.status(400).json({ msg: 'training with name ' + athleteName + ' not found.' })
  }
});

router.get('/trainer/:id', (req, res) => {
  let trainerID = req.params.id;
  // console.log('aaaaa');
  const foundtraining = trainings.filter((training) => training.trainerId == trainerID);
  if (foundtraining) {
    res.json(foundtraining);
  } else {
    return res.status(400).json({ msg: 'training with trainerID ' + trainerID + ' not found.' })
  }
});


router.get('/delete/:id', (req, res) => {
  let trainingId = req.params.id;
  let trainingsBackup = trainings.copyWithin(0, trainings.length)
  trainings = [];
  for (i = 0; i < trainingsBackup.length; i++) {
    if (trainingsBackup[i].id < trainingId) {
      trainings[i] = trainingsBackup[i]
    } else if (trainingsBackup[i].id > trainingId) {
      trainings[i - 1] = trainingsBackup[i]
      trainings[i - 1].id = i
    }
  }
  return res.status(200).json(trainings)
});

router.post('/', (req, res) => {
  console.log('aaaabb');
  let training = req.body;
  console.log(training)
  trainings.forEach(element => {
    if (element.id == training.id) {
      return res.status(400)
        .json({ msg: 'training seems to already have an id assigned' });
    }
  })
  // if () {
  //   return res.status(400)
  //       .json({msg: 'training seems to already have an id assigned'});
  // }

  training.id = trainings.length + 1;
  // training.quantityInCart = 0;
  trainings.push(training);
  return res.status(200).json(training);
});

// router.post('/', checkIfLoggedIn, (req, res) => {
//   let training = req.body;
//   console.log(training.id)
//   if (training.id) {
//     return res.status(400)
//         .json({msg: 'training seems to already have an id assigned'});
//   }

//   training.id = trainings.length + 1;
//   training.quantityInCart = 0;
//   trainings.push(training);
//   return res.status(200).json(training);
// });

router.patch('/:id', checkIfLoggedIn, (req, res) => {
  let trainingId = req.params.id;
  const foundtraining = trainings.find((training) => training.id == trainingId);
  if (foundtraining) {
    let changeInQuantity = req.body.changeInQuantity;
    foundtraining.quantityInCart += changeInQuantity;
    return res.status(200).json({ msg: 'Successfully updated' });
  }
  return res.status(400).json({ msg: 'training with id ' + trainingId + ' not found.' });
});

module.exports = router;