var UserSchema = new Schema({  
    name: String,
    pass: String    
});

var exports = module.exports = User = mongoose.model('User', UserSchema);