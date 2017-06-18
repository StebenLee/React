import mongoose, { Schema } from 'mongoose';

// setting up a mongoose model and pass it using module.exports
export default mongoose.model('Recipe', new Schema({
  id: String,
  name: String,
  description: String,
  imagePath: String,
  steps: Array,
  updatedAt: Date,
}));