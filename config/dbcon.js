const mongoose = require('mongoose');

async function connectDB() {
    const environment = process.env.NODE_ENV || 'development';
    let mongoDBURI;

    if (environment === 'development' ) {
        mongoDBURI = process.env.DEV_DB;
    } else if (environment === 'test') {
        mongoDBURI = process.env.TEST_DB;
    } else {
        mongoDBURI = process.env.PROD_DB
    }
    try {
        await mongoose.connect(mongoDBURI);
        const dbConn = mongoose.connection;
        return dbConn;
        // console.log('mongodb connection successful');
        // dbConn.on('error', console.error.bind(console, 'Mongo connection error.'));
    } catch (error) {
        console.log(error);
    }
}

async function disconnectDB() {
    try {
        await mongoose.disconnect();
        // console.log('Disconnected from the database')
    } catch (error) {
        console.error('Error during disconnection', error)
    }
}



module.exports = {
    connectDB,
    disconnectDB
};