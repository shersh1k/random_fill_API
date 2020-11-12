import { Socket } from 'socket.io';
import { io } from "..";
import * as cookie from "cookie";

interface iUserSockets {
    [mail: string]: {
        name: string;
        email: string;
        socket: Socket;
    }
}

export function ioLogic() {
    // const userSockets: { email: string, name: string, socket: Socket }[] = []
    const userSockets: iUserSockets/* { [string]: string } */ = {}
    io.on('connection', (socket: Socket) => {
        socket.on('login', async (user: iUser) => {
            userSockets[user.mail] = { email: user.mail, name: user.name, socket }
            // Хер пойми эта редиска нахер надо
            // await redisClient.set(user.mail, user.name);
            // redisClient.keys('*', async (err, keys) => {
            //     if (err) console.log(err);
            //     await Promise.all([keys.map(item =>
            //         redisClient.get(item, (err, reply) => {
            //             if (reply) onlineUsers.push({ name: reply, mail: item })
            //         }))
            //     ])
            // });
            const usersOnline = Object.values(userSockets).map((item) => ({ name: item.name, mail: item.email }))
            socket.emit('login', usersOnline);
            socket.broadcast.emit('newUser', user);
        })

        socket.on('newUser', (user: iUser) => {
            // redisClient.set(user.mail, user.name);
            io.emit('newUser', user);
        })

        socket.on('logout', (user: iUser) => {
            // redisClient.del(user.mail);
            delete userSockets[user.mail];
            io.emit('logout', user.mail);
        });

        socket.on('disconnect', () => {
            const headers: any = socket.handshake.headers
            const cookies = cookie.parse(headers.cookie)
            // redisClient.del(cookies.UserEmail);
            delete userSockets[cookies.UserEmail];
            io.emit('logout', cookies.UserEmail);
        });

        socket.on('letsPlay', (mailTo: string) => {
            try {
                const headers: any = socket.handshake.headers;
                if (headers.cookie) {
                    const cookies = cookie.parse(headers.cookie);
                    const mailFrom = cookies.UserEmail;
                    socket.broadcast.to((userSockets[mailTo].socket as Socket).id).emit('letsPlay', mailFrom);
                }
            } catch (error) {
                socket.emit('userLostConnection')
            }
        })
    });
}

interface iUser {
    name: string;
    mail: string;
}

// redisClient.keys('*', (err, keys) => {
//     console.log(keys)
// });