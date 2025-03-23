import mongoose, { Schema, Document } from 'mongoose';
import bcrypt from 'bcrypt-ts';
export interface IUser extends Document {
  fullname: string;
  username: string;
  email: string;
  password: string;
  avatar?: string;
  role: 'user' | 'admin';
  createdAt: Date;
  updatedAt: Date;
}

const UserSchema: Schema = new Schema(
  {
    fullname: { type: String, required: true, trim: true },
    username: { type: String, required: true, unique: true, trim: true, lowercase: true },
    email: { type: String, required: true, unique: true, trim: true, lowercase: true },
    password: { type: String, required: true },
    avatar: { type: String, default: '' },
    role: { type: String, enum: ['user', 'admin'], default: 'user' },
  },
  {
    timestamps: true, 
  }
);

UserSchema.pre("save", async function(next) {
    if (!this.isModified("password")) return next();
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password as string, salt);
    next();
  });

// Create the User model
const User = mongoose.model<IUser>('User', UserSchema);

export default User;
