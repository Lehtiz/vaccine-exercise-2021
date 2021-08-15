/* eslint-disable no-undef */
const request = require('supertest');
const mongoose = require('mongoose');
const app = require('../server');

beforeAll(async () => {
  // Connect to a Mongo DB
});

describe('API Endpoints', () => {
  it('should get anwser of orders root', async () => {
    const res = await request(app).get('/orders');
    expect(res.statusCode).toEqual(200);
    expect(res.body).toEqual('Orders root');
  });
  it('should get anwser of vaccinations root', async () => {
    const res = await request(app).get('/vaccinations');
    expect(res.statusCode).toEqual(200);
    expect(res.body).toEqual('Vaccinations root');
  });
});

afterAll(async () => {
  mongoose.connection.close();
});
