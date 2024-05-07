import { createClient } from "redis";

const subscriber = createClient()
    .on("connect", () => console.log("Redis client connected to the server"))
    .on("error", (err) => console.log(`Redis client not connected to the server: ${err}`))
    .on("message", (channel, message) => {
        console.log(message);
        if (message === "KILL_SERVER") {
            subscriber.unsubscribe("holberton school channel");
            subscriber.quit();
        }
    });

subscriber.subscribe("holberton school channel");
