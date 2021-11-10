'use strict';

const supertest = require('supertest');
const server = require('../src/server').server;
const { db } = require('../src/models/index');
const mockRequest = supertest(server);

beforeAll(async () => {
    await db.sync();
});
afterAll(async () => {
    await db.drop();
});

describe('Testing v1 Unauthenticated API Routes', () => {
    it('Can create a new record in the database', async () => {
        const response = await mockRequest.post('/v1/movies').send({
            name: 'test movie 1',
            year: 2021,
            Category: "8",
            rateing: 5
        });
        const userObject = response.body;
        expect(response.status).toBe(201);
        expect(response.body).toBeDefined();
        expect(response.body.rating).toBe(0);
    });

    it('Can return a list of all :model items', async () => {
        const response = await mockRequest.get('/v1/movies');
        expect(response.status).toBe(200);
    });

    it('Can return a single item by ID', async () => {
        const response = await mockRequest.get('/v1/movies/1');
        expect(response.status).toBe(200);
    });
    it('Can return a single updated item by ID', async () => {
        const response = await mockRequest.put('/v1/movies/1').send({
            name: 'test movie 1',
            year: 2021,
            Category: "8",
            rateing: 5
        });
        expect(response.status).toBe(201);
        expect(response.body).toBeDefined();
        expect(response.body.rating).toBe(2);
    });
    it('Can delete a record and returns an empty object after', async () => {
        const response = await mockRequest.delete('/v1/movies/1');
        expect(response.status).toBe(204);
        console.log(response.body)
        expect(response.body).toBeNull;
    });
});