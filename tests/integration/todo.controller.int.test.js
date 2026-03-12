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
    it("should return error 500 on malformed data with POST" + endpointUrl, async () => {
        const response = await request(app)
            .post(endpointUrl)
            .send({title: "missing done property"});
        expect(response.statusCode).toBe(500);
        expect(response.body).toStrictEqual(expect.objectContaining({
            message: "Todo validation failed: done: Path `done` is required."
        }));
    });
    afterAll(async () => {
        await mongodb.disconnect();
    });
});
