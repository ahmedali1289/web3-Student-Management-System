var mongoose=require('mongoose');
const userSchema = new mongoose.Schema({
  id:{
    type: Number,
    required: false
  },
  email:{
    type: String,
    required: true,
    unique: true
  },
  password:{
    type: String,
    required: true
  },
  role:{
    type: String,
    required: true
  }
})
module.exports=mongoose.models.users || mongoose.model('User',userSchema)