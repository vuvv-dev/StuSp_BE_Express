import UserProfile from "../models/UserProfile";

export const UpdateUserProfile = async (req: any, res: any) => {
  try {
    const { bio, phone, address, studentId, dob, description } = req.body;
    //find user profile
    let userProfile = await UserProfile.findOne({ userId: req.user.sub });

    if (!userProfile) {
      userProfile = new UserProfile({ userId: req.user.sub });
    }
    userProfile.bio = bio;
    userProfile.phone = phone;
    userProfile.address = address;
    userProfile.studentId = studentId;
    userProfile.dob = dob;
    userProfile.description = description;

    await userProfile.save();
    
    return res
      .status(200)
      .json({ message: "User profile updated successfully", userProfile });
  } catch (error) {
    console.log(error)
    return res.status(500).json({ message: "Error updating user profile" });
  }
};
