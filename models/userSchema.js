import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: false,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  password: {
    type: String,
    required: false,
  },
  profilePic: String,
  role: {
    type: String,
    enum: ['user', 'admin'],
    default: 'user',
  },
  verified: {
    type: Boolean,
    default: false,
  },
}, {
  timestamps: true,
});

// Giving a default User name if name is absent
userSchema.pre('save', async function (next) {
  if (!this.name) {
    const count = await mongoose.model('Users').countDocuments();
    this.name = `User#${(count + 1).toString().padStart(3, '0')}`;
  }
  next();
});

const Users = mongoose.model('Users', userSchema);

export default Users;
