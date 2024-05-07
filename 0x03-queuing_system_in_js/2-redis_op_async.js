import { createClient, print } from "redis";
import { promisify } from "util";

const client = createClient()
  .on("connect", () => console.log("Redis client connected to the server"))
  .on("error", (err) =>
    console.log(`Redis client not connected to the server: ${err}`)
  );

function setNewSchool(schoolName, value) {
  client.set(schoolName, value, (_err, reply) => {
    print(`Reply: ${reply}`);
  });
}

async function displaySchoolValue(schoolName) {
    const getAsync = promisify(client.get).bind(client);
    try {
        const value = await getAsync(schoolName);
        console.log(value);
    } catch (err) {
        return
    }
}

displaySchoolValue("Holberton");
setNewSchool("HolbertonSanFrancisco", "100");
displaySchoolValue("HolbertonSanFrancisco");
