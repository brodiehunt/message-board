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

describe('GET /users/sign-up', () => {
    test ('get 200 ok response', async () => {

        const response = await request(app).get('/users/sign-up');
        expect(response.statusCode).toBe(200);
    }) 
})
