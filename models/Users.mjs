import mongoose from 'mongoose';

const UsersSchema = new mongoose.Schema({
  Username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
    minlength: 8,
  },
  product: {
    type: String,
    required: true,
  },
  purchase: {
    type: Number,
    min: 2000,
    max: new Date().getFullYear() + 1,
  },
});

UsersSchema.index({Username: 1}, { unique: true });

const Users = mongoose.model('Users', UsersSchema);

export default Users;
