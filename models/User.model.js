const { Schema, model } = require("mongoose");

// TODO: Please make sure you edit the User model to whatever makes sense in this case
const userSchema = new Schema(
  {
    name: {
      type: String,
      //required: [true, 'Name is required.'],
      trim: true
    },
    email: {
      type: String,
      //required: [true, 'Email is required.'],
      unique: true,
      lowercase: true,
      trim: true
    },
    password: {
      type: String,
      //required: [true, 'Password is required.']
    },
    rents: [
      {
        type: Schema.Types.ObjectId,
        ref: "Rents"
      }
    ],
    role: {
      type: String,
      enum: ["USER", "ADMIN"],
      default: "USER"
    },
    friends: {
      type: [ Schema.Types.ObjectId], 
      ref: "User"
    }
  },
  {
    // this second object adds extra properties: `createdAt` and `updatedAt`    
    timestamps: true
  }
);

const User = model("User", userSchema);

module.exports = User;
