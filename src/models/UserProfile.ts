import mongoose, { Schema, Document, Types } from "mongoose";

export interface IUserProfile extends Document {
  userId: Types.ObjectId;
  bio?: string;
  phone?: string;
  address?: string;
  studentId?: string;
  dob?: Date;
  description?: string;
  createdAt: Date;
  updatedAt: Date;
}

const UserProfileSchema: Schema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      required: true,
      unique: true,
      ref: "User",
    },
    bio: { type: String },
    phone: { type: String },
    address: { type: String },
    studentId: { type: String },
    dob: { type: Date },
    description: { type: String },
  },
  {
    timestamps: true,
  }
);

const UserProfile = mongoose.model<IUserProfile>("UserProfile", UserProfileSchema);

export default UserProfile;
