const request = require('supertest');
const app = require('../../app');
const newTodo = require('../mock-data/new-todo.json');
const mongodb = require('../../mongodb/mongodb.connect');
require ('dotenv').config();

const endpointUrl = '/todos/';

describe(endpointUrl, () => {
    beforeAll(async () => {
        await mongodb.connect();
    });
    it("POST " + endpointUrl, async () => {
        const response = await request(app)
            .post(endpointUrl)
            .send(newTodo);
        expect(response.statusCode).toBe(201);
        expect(response.body.title).toBe(newTodo.title);
        expect(response.body.done).toBe(newTodo.done);
    });
    afterAll(async () => {
        await mongodb.disconnect();
    });
});
