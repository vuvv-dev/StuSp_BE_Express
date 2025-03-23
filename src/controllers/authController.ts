import { JwtPayload } from "jsonwebtoken";
import {
  generateAccessToken,
  generateRefreshToken,
} from "../configuration/jwtConfig";
import User from "../models/User";
import bcrypt from "bcrypt-ts";
import _ from "lodash";
export const Register = async (req: any, res: any) => {
  try {
    const { email, password, confirmPassword } = req.body;
    console.log(req.body);
    if (password !== confirmPassword) {
      return res.status(400).json({ message: "Passwords do not match" });
    }
    const user = new User({
      email,
      password,
      fullname: email,
      username: email,
    });

    await user.save();
    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error registering user" });
  }
};

export const SignIn = async (req: any, res: any) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    if (!bcrypt.compareSync(password, user.password)) {
      return res.status(401).json({ message: "Invalid password" });
    }
    const refreshToken = generateRefreshToken();

    const jwtClaim: JwtPayload = {
      sub: user._id as string,
      email: user.email,
      jti: refreshToken,
      role: user.role,
    };

    const accessToken = generateAccessToken(jwtClaim);

    return res.status(200).json({
      message: "User logged in successfully",
      user: _.pick(user.toObject(), ["_id", "fullname", "email", "role"]),
      accessToken,
    });
  } catch (error) {
    return res.status(500).json({ message: "Error logging in user" });
  }
};

export const SignInWithGoogle = async (req: any, res: any) => {
  try {
    const { email, username, displayName, picture } = req.body;
    let user = await User.findOne({ email });
    if (!user) {
      user = await User.create({
        fullname: displayName,
        username: username,
        email: email,
        avatar: picture,
        password: email,
      });
    }
    const refreshToken = generateRefreshToken();

    const jwtClaim: JwtPayload = {
      sub: user._id as string,
      email: user.email,
      jti: refreshToken,
      role: user.role,
    };

    const accessToken = generateAccessToken(jwtClaim);

    return res.status(200).json({
      message: "User logged in successfully",
      user: _.pick(user.toObject(), ["_id", "fullname", "email", "role"]),
      accessToken,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Error logging in user" });
  }
};

export const refreshAcessToken = async (req: any, res: any) => {
  try {
    const refreshToken = req.user.jti;
    if (!refreshToken) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    const user = await User.findOne({ _id: req.user.sub });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    //missing check refresh token aint belong to acess or not and check refresh token expired or not
    
    const newRefreshToken = generateRefreshToken();
    const jwtClaim: JwtPayload = {
      sub: user._id as string,
      email: user.email,
      jti: newRefreshToken,
      role: user.role,
    };
    const accessToken = generateAccessToken(jwtClaim);
  } catch (error) {
    return res.status(500).json({ message: "Error refresh new access" });
  }
};
export const SignOut = async (req: any, res: any) => {};
