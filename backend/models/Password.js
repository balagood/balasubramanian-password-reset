import mongoose from "mongoose"
const passwordSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  reset_token: { type: String, default: null },
  reset_expiry: { type: Date, default: null }
});


export default mongoose.models.User || mongoose.model('Password',passwordSchema)
//export default mongoose.model("Password", passwordSchema);
