const mongoose = require('mongoose');

async function connectDB() {
    const environment = process.env.NODE_ENV || 'development';
    let mongoDBURI;

    if (environment === 'development' ) {
        mongoDBURI = process.env.DEV_DB;
    } else {
        mongoDBURI = process.env.PROD_DB;
    }
    try {
        await mongoose.connect(mongoDBURI, { dbName: 'auth-basics'});
        const dbConn = mongoose.connection;
        console.log('mongodb connection successful');
        dbConn.on('error', console.error.bind(console, 'Mongo connection error.'));
    } catch (error) {
        console.log(error);
    }
}

module.exports = connectDB;