import * as express from 'express';
import * as HTTP from 'http';
import * as redis from "redis";
import { Server } from 'socket.io';

import { ioPath,  port, REDIS_URL } from './config';

import { appLogic } from "./app";
import { redisLogic } from "./redis";
import { ioLogic } from "./socketIO";
import { mongoDBLogic } from './mongoDB';

export const app = express();
export const http = HTTP.createServer(app);
export const redisClient = redis.createClient(REDIS_URL)
export const io = new Server(http, { path: ioPath });

appLogic();
mongoDBLogic();
redisLogic();
ioLogic();

http.listen(port, () => {
  console.log(`listening on: ${port}`);
});
