import jwt from "jsonwebtoken";
import { NextFunction, Request, Response } from "express";
import { ErrorType } from "./errorHandler";

export interface CustomRequest extends Request {
    user?: jwt.JwtPayload;
}

export const verifyAuthentication = async (
    req: CustomRequest,
    res: Response,
    next: NextFunction
): Promise<any> => {
    try {
        const authorization = req.headers.authorization;
        if (!authorization) {
            return res.status(401).json({
                error: { message: "Unauthorized" },
            });
        }

        const token = authorization.replace("Bearer ", "");
        const secretKey = process.env.ACCESS_TOKEN_SECRET as string;

        jwt.verify(token, secretKey, (err, decoded) => {
            if (err) {
                return res.status(401).json({
                    error: { message: "Invalid or expired token" },
                });
            }
            req.user = decoded as jwt.JwtPayload
            next();
        });
    } catch (error) {
        const err: ErrorType = new Error("Something went wrong");
        err.status = 400;
        next(err);
    }
};
