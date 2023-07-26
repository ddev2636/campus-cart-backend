import mongoose from "mongoose";
import validator from "validator";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "please provide a name"],
    minlength: 3,
    trim: true,
  },

  email: {
    type: String,
    required: [true, "please provide a email"],
    validate: {
      validator: validator.isEmail,
      message: "please provide a valid email",
    },
    unique: true,
  },

  password: {
    type: String,
    required: [true, "please provide a password"],
    minlength: 6,
    trim: true,
    select: false,
  },
});

UserSchema.pre("save", async function () {
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

// UserSchema.methods.createJWT = function () {
//   return jwt.sign({ userId: this._id }, process.env.JWT_SECRET, {
//     expiresIn: process.env.JWT_LIFETIME,
//   });
//   console.log(this);
// };

UserSchema.methods.comparePassword = async function (candidatePassword) {
  const isMatch = await bcrypt.compare(candidatePassword, this.password);
  return isMatch;
};

export default mongoose.model("User", UserSchema);
