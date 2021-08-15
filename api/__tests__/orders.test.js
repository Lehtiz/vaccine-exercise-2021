/* eslint-disable no-undef */
const request = require('supertest');
const mongoose = require('mongoose');
const app = require('../server');

beforeAll(async () => {
  // Connect to a Mongo DB
});

describe('Test Orders API', () => {
  it('calls nonexistent page and expects error', async () => {
    const res = await request(app).get('/root');
    expect(res.statusCode).toEqual(404);
  });

  it('should get a count of orders', async () => {
    const res = await request(app).get('/orders/count/total');
    expect(res.statusCode).toEqual(200);
    expect(res.body).toEqual(5000);
  });

  it('should get a count of orders for Antiqua', async () => {
    const res = await request(app).get('/orders/count/orders/Antiqua');
    expect(res.statusCode).toEqual(200);
    expect(res.body).toEqual(1661);
  });

  it('should get an error about no results for Pfizer', async () => {
    const res = await request(app).get('/orders/count/orders/Pfizer');
    expect(res.statusCode).toEqual(500);
    expect(res.body).toEqual('No results found for Pfizer');
  });

  it('should get a count of vaccines total for Antiqua', async () => {
    const res = await request(app).get('/orders/count/vaccines/Antiqua');
    expect(res.statusCode).toEqual(200);
    expect(res.body).toEqual(6644);
  });
});

afterAll(async () => {
  mongoose.connection.close();
});
