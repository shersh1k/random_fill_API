import { redisClient } from "..";

export function redisLogic() {
  redisClient.on("connect", function () {
    console.log("You are now connected to heroku-redis");
  });
  redisClient.on("error", function (error) {
    console.error(error);
  });
}