import * as mongoose from 'mongoose';
import { MONGO_DB } from '../config';
import User from "./models/User";

export function mongoDBLogic() {
    User;
    mongoose.connect(MONGO_DB, { useUnifiedTopology: true }).then(() => {
        console.log("You are now connected to mongoDB");
    });
}