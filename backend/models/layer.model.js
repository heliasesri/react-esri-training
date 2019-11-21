const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const layerSchema = new Schema({
  layername: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    minlength: 3
  },
}, {
  timestamps: true,
});

const Layer = mongoose.model('Layer', layerSchema);

module.exports = Layer;