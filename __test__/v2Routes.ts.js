// 'use strict';

// process.env.SECRET = "testingAuth";
// const supertest = require('supertest');
// const server = require('../src/server').server;
// const { db } = require('../src/models/index');
// const mockRequest = supertest(server);
// let users = {
//     admin: { username: 'admin', password: 'password', role: 'admin' },
//     editor: { username: 'editor', password: 'password', role: 'editor' },
//     writer: { username: 'writer', password: 'password', role: 'writer' },
//     user: { username: 'user', password: 'password', role: 'user' },
// };

// beforeAll(async () => {
//     await db.sync();
// });
// afterAll(async () => {
//     await db.drop();
// });

// xdescribe('V2 Route Testing', () => {
//     Object.keys(users).forEach(userType => {
//         describe(`${userType} users`, () => {
//             it('can create new records', async () => {
//                 const signRes = await mockRequest.post('/signUp').send(users[userType]);
//                 const token = signRes.body.token;
//                 const response = await mockRequest.post("/v2/movies").send({
//                         name: 'test movie 1',
//                         year: 2021,
//                         Category: "8",
//                         rateing:5
//                     }).set("Authorization", `Bearer ${token}`);
//                 if (userType === 'user') {
//                     expect(response.status).not.toBe(201);
//                 } else {
//                     expect(response.status).toBe(201);
//                 }
//             });

//             xit('can update with put', async () => {
//                 const signRes = await mockRequest.post('/signIn').auth(users[userType].username, users[userType].password);
//                 const token = signRes.body.token;
//                 const response = await mockRequest.put('/v2/movies/1').send({
//                     name: 'test movie 2',
//                         year: 2021,
//                         Category: "8",
//                         rateing:5
//                 }).set('Authorization', `Bearer ${token}`);
//                 if (users[userType].role === 'user' || users[userType].role === 'writer') {
//                     expect(response.status).not.toBe(201);
//                 } else {
//                     expect(response.status).toBe(201);
//                 }
//             });
//             xit('can update with patch', async () => {
//                 const signRes = await mockRequest.post('/signIn').auth(users[userType].username, users[userType].password);
//                 const token = signRes.body.token;
//                 const response = await mockRequest.patch('/v2/movies/1').send({
//                     name: 'test movie 3'
//                 }).set('Authorization', `Bearer ${token}`);
//                 if (users[userType].role === 'user' || users[userType].role === 'writer') {
//                     expect(response.status).not.toBe(201);
//                 } else {
//                     expect(response.status).toBe(201);
//                 }
//             });
//             // get all
//             xit('can get all records', async () => {
//                 const signRes = await mockRequest.post('/signIn').auth(users[userType].username, users[userType].password);
//                 const token = signRes.body.token;
//                 await mockRequest.put('/v2/movies/1').send({
//                     name: 'movie 1',
//                         year: 2021,
//                         Category: "8",
//                         rateing:5
//                 }).set('Authorization', `Bearer admin`);
//                 const response = await mockRequest.get('/v2/movies').set('Authorization', `Bearer ${token}`);
//                 expect(response.status).toBe(200);
//             });
//             xit('can get a single record by id', async () => {
//                 const signRes = await mockRequest.post('/signIn').auth(users[userType].username, users[userType].password);
//                 const token = signRes.body.token;
//                 const response = await mockRequest.get('/v2/movies/1').set('Authorization', `Bearer ${token}`);
//                 expect(response.status).toBe(200);
//             });
//             if('can delete a record -- admin only', async () => {
//                 const signRes = await mockRequest.post('/signIn').auth(users[userType].username, users[userType].password);
//                 const token = signRes.body.token;
//                 const response = await mockRequest.put('/v2/movies/2').set('Authorization', `Bearer ${token}`);
//                 if (users[userType].role === 'admin') {
//                     expect(response.status).toBe(204);
//                 } else {
//                     expect(response.status).not.toBe(204);
//                 }
//             });
//         });
//     });
// });