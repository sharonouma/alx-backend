import { createClient, print } from "redis";

const client = createClient()
  .on("connect", () => console.log("Redis client connected to the server"))
  .on("error", (err) =>
    console.log(`Redis client not connected to the server: ${err}`)
  );

function setNewSchool(key, field, value) {
  client.hset(key, field, value, print);
}

function displaySchoolValue(schoolName) {
  client.hgetall(schoolName, (_err, result) => {
    console.log(result);
  });
}

setNewSchool("HolbertonSchools", "Portland", "50");
setNewSchool("HolbertonSchools", "Seattle", "80");
setNewSchool("HolbertonSchools", "New York", "20");
setNewSchool("HolbertonSchools", "Bogota", "20");
setNewSchool("HolbertonSchools", "Cali", "40");
setNewSchool("HolbertonSchools", "Paris", "2");
displaySchoolValue("HolbertonSchools");
