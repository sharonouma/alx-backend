const kue = require('kue');
const queue = kue.createQueue();

// Create a function to send notifications
function sendNotification(phoneNumber, message) {
    console.log(`Sending notification to ${phoneNumber}, with message: ${message}`);
}

// Process jobs in the 'push_notification_code' queue
queue.process('push_notification_code', (job, _done) => {
    const { phoneNumber, message } = job.data;
    
    // Call the sendNotification function with job data
    sendNotification(phoneNumber, message);
});
