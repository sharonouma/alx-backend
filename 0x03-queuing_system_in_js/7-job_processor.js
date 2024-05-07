const kue = require('kue');
const queue = kue.createQueue();

const blacklistedNumbers = ["4153518780", "4153518781"];

// Create a function to send notifications
function sendNotification(phoneNumber, message, job, done) {
    // Track progress of the job (0%)
    job.progress(0, 100);

    if (blacklistedNumbers.includes(phoneNumber)) {
        return done(Error(`Phone number ${phoneNumber} is blacklisted`));
    }

    // Track progress to 50%
    job.progress(50, 100);

    // Log the notification message
    console.log(`Sending notification to ${phoneNumber}, with message: ${message}`);

    // Job is successful, complete the job
    done();
}

// Process jobs in the 'push_notification_code_2' queue with concurrency of 2
queue.process('push_notification_code_2', 2, (job, done) => {
    const { phoneNumber, message } = job.data;

    // Call the sendNotification function with job data
    sendNotification(phoneNumber, message, job, done);
});
