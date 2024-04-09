import mongoose from "mongoose";

const contactSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true,"name is required"]
  },
  email: {
    type: String,
    required: [true,"email is required"],
    unique: true
  },
  phoneNumber: {
    type: String,
    required: [true,"phone number is required"]
  },
  
}, {timestamps:true});

const Contact = mongoose.model('Contact', contactSchema);

export default Contact;
