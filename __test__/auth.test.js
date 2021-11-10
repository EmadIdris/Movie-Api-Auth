'use strict';

process.env.SECRET = "testingAuth";
const supertest = require('supertest');
const server = require('../src/server').server;
const { db } = require('../src/models/index');
const mockRequest = supertest(server);
let users = {
    admin: { username: 'admin', password: 'password', role: 'admin' },
    editor: { username: 'editor', password: 'password', role: 'editor' },
    writer: { username: 'writer', password: 'password', role: 'writer' },
    user: { username: 'user', password: 'password', role: 'user' },
};

beforeAll(async () => {
    await db.sync();
});
afterAll(async () => {
    await db.drop();
});

describe('Auth Router', () => {
    Object.keys(users).forEach(userType => {
        // << Checking happy scenarios (hopefully) >>:
        describe(`${userType} users`, () => {
            it('can create one', async () => {
                const response = await mockRequest.post('/signUp').send(users[userType]);
                const userObject = response.body;
                expect(response.status).toBe(201);
                expect(userObject.token).toBeDefined();
                expect(userObject.user.id).toBeDefined();
                expect(userObject.user.username).toEqual(users[userType].username);
                expect(userObject.user.role).toEqual(users[userType].role);
            });

            it('can sign-in with basic header', async () => {
                const response = await mockRequest.post('/signIn').auth(users[userType].username, users[userType].password);
                const userObject = response.body;
                expect(response.status).toBe(200);
                expect(userObject.token).toBeDefined();
                expect(userObject.user.id).toBeDefined();
                expect(userObject.user.username).toEqual(users[userType].username);
                expect(userObject.user.role).toEqual(users[userType].role);
            });

            it('can sign-in with bearer headers', async () => {
                // First, sign in to get a token
                const response = await mockRequest.post('/signIn').auth(users[userType].username, users[userType].password);
                const token = response.body.token;
                // Now check the token by trying to reach a point that requires it
                const bearerResponse = await mockRequest.get('/secret').set('Authorization', `Bearer ${token}`)
                expect(bearerResponse.status).toBe(200);
            });
        });
    });
    describe('bad logins', () => {
        it('Bad Auth scenario 1 - signing in using incorrect password (Basic Auth)', async () => {
            const response = await mockRequest.post('/signIn').auth('admin', 'xyz')
            const userObject = response.body;
            expect(response.status).toBe(405);
            expect(userObject.user).not.toBeDefined();
            expect(userObject.token).not.toBeDefined();
        });
        it('Bad Auth scenario 2 - signing in with unknown user (Basic Auth)', async () => {
            const response = await mockRequest.post('/signIn').auth('nobody', 'xyz')
            const userObject = response.body;
            expect(response.status).toBe(405);
            expect(userObject.user).not.toBeDefined();
            expect(userObject.token).not.toBeDefined();
        });
        it('Bad Auth scenario 3 - bearer fails with an invalid token (Bearer Auth)', async () => {
            const bearerResponse = await mockRequest.get('/secret').set('Authorization', 'Bearer foobar');
            expect(bearerResponse.status).not.toBe(200);
        });
    });

});