const mongoose = require('mongoose');
const dburl = "mongodb://gaurav:vodafone8053@ds233541.mlab.com:33541/road-safety";

const mongoAtlasUrl = "mongodb+srv://gaurav:vodafone8053@road-safety-cluster-x5pys.mongodb.net/test?retryWrites=true"

mongoose.connect(mongoAtlasUrl, { useNewUrlParser: true });

//CONNECTION EVENTS
mongoose.connection.on('connected', 
    () => console.log('Mongoose Connected to ' + mongoAtlasUrl));

mongoose.connection.on('disconnected',
    () => console.log('Mongoose Disconnected'));

mongoose.connection.on('error', 
    err => console.log('Mongoose Connection error: ' + err));

//CAPTURE APP TERMINATION / RESTRART EVENTS
 //To be called when process is restarted pr terminated
 function gracefulShutdown(msg, callback) {
    mongoose.connection.close(() => {
        console.log('Mongoose disconnected through ' + msg);
        callback();
    });
}

//For nodemon restarts
process.once('SIGUSR2', () => {
    gracefulShutdown('nodemon restart', 
    () => process.kill(process.pid, 'SIGUSR2') );
});

//For app termination
process.on('SIGINT', () => {
    gracefulShutdown('App termination (SIGINT)',
   () => process.exit(0));
});

//For Heroku app termination
process.on('SIGTERM', () => {
    gracefulShutdown('App termination (SIGTERM)',
   () => process.exit(0));
});