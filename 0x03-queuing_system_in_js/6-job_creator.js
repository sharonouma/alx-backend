const kue = require("kue");
const push_notification_code = kue.createQueue();

const job = push_notification_code
  .create("push_notification_code", {
    phoneNumber: "0712345678",
    message: "Hello world",
  })
  .save((err) => {
    if (!err) {
      console.log(`Notification job created: ${job.id}`);
    }
  });

job.on("complete", () => {
  console.log("Notification job completed");
});

// Listen for job failure event
job.on("failed", (err) => {
  console.error("Notification job failed");
});
