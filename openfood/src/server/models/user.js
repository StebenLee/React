import mongoose, { Schema } from 'mongoose';
//setitng up mongoose models and pass it 
export default mongoose.model('User', new Schema({
  id: Number,
  username: String,
  email: String,
  password: String,
  admin: Boolean
})); 