import * as jwt from "express-jwt";
import * as express from "express";
import { secret } from "../config";

const isToken = (auth?: string) => auth && auth.split(" ")[0] === "Token";
const isBearer = (auth?: string) => auth && auth.split(" ")[0] === "Bearer";
const token = (auth?: string) => auth && auth.split(" ")[1];

function getTokenFromHeader(req: express.Request) {
    const auth = req.headers.authorization;
    if (isToken(auth) || isBearer(auth)) return token(auth);
    return null;
}

export const auth = {
    required: jwt({
        secret: secret,
        userProperty: "user",
        algorithms: ['RS256'],
        getToken: getTokenFromHeader
    })
};