import { NextFunction, Request, Response } from "express";

export const start = async(req: Request, res: Response, next: NextFunction) => {
    try {
        res.status(200).json({
            message: "FROM API SERVER STUSP - ACCESS SUCCESS!",
        })
    } catch (error) {
        next(error);
    }
}