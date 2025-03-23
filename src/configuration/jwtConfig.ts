import jwt from 'jsonwebtoken';
import { JwtPayload } from 'jsonwebtoken';
import { v4 as uuidv4 } from 'uuid';

const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET as string;
const REFRESH_TOKEN_SECRET = process.env.REFRESH_TOKEN_SECRET as string;
const ACCESS_TOKEN_EXPIRES_IN = "15m";
// const REFRESH_TOKEN_EXPIRES_IN = "7d"; 

export const generateAccessToken = (payload: JwtPayload): string => {
    return jwt.sign(payload, ACCESS_TOKEN_SECRET, { expiresIn: ACCESS_TOKEN_EXPIRES_IN });
};

export const generateRefreshToken = (): string => {
    return uuidv4();
};
