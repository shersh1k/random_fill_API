import * as express from 'express';
import * as HTTP from 'http';
import * as asyncRedis from "async-redis";
import { Server } from 'socket.io';

import { ioPath, port, REDIS_URL } from './config';

import { appLogic } from "./app";
import { redisLogic } from "./redis";
import { ioLogic } from "./socketIO";
import { mongoDBLogic } from './mongoDB';
import { passportLogic } from './passport/passport';

export const app = express();
export const http = HTTP.createServer(app);
export const redisClient = asyncRedis.createClient(REDIS_URL)
export const io = new Server(http, { path: ioPath });

appLogic();
mongoDBLogic();
redisLogic();
ioLogic();
passportLogic();

http.listen(port, () => {
  console.log(`listening on: ${port}`);
});
