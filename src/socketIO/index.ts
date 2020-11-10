import { Socket } from 'socket.io';
import * as redis from "redis";
import { io, redisClient } from "..";

export function ioLogic() {
    io.on('connection', (socket: Socket) => {
        socket.on('authorization', (user: iUser) => {
            console.log(user)
            redisClient.set(user.mail, user.name, redis.print)
            redisClient.get(user.mail, redis.print)
            // redisClient.save((err, reply) => { })
            io.emit('authorization', user);
        })
        socket.on('chat message', function (msg: string) {
            io.emit('chat message', msg);
        });
    });
}

interface iUser {
    name: string;
    mail: string;
}