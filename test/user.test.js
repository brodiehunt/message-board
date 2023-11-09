const app = require('../app');
const {connectDB, disconnectDB} = require('../config/dbcon');

const request = require('supertest');
// Open handle from mongostore -- how to fix? 
beforeAll(async () => {
    await connectDB();
});


afterAll(async () => {
    await disconnectDB();
});

describe('test the test', () => {
    test ('Should work', () => {
        expect('test to work user').toBe('test to work user');
    })
    
})