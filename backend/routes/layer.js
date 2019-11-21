const router = require('express').Router();
let Layer = require('../models/layer.model');

router.route('/').get((req, res) => {
    Layer.find()
    .then(layers => res.json(layers))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/add').post((req, res) => {
  const layername = req.body.layername;

  const newLayer = new Layer ({layername});

  newLayer.save()
    .then(() => res.json('Layer added!'))
    .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;