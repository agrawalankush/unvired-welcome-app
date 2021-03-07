const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    email: {
        type: String,
        unique: true,
        required: true
      },
    hash: String,
    salt: String,
    createdDate: { type: Date, default: Date.now },
    role: { type: String, default: 'User' }
});

mongoose.model('User', UserSchema);
