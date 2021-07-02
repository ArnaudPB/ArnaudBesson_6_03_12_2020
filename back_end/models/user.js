const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

var userSchema = mongoose.Schema({
    email: { type: String, required: true, unique: true },
    password: { type: String, rquired: true, unique: true }
});
// userSchema.pre('save', function() {
//     console.log('save', this.registry);
// })

userSchema.plugin(uniqueValidator);

module.exports = mongoose.model('User', userSchema);