import { describe, it, expect } from 'vitest';
import request from 'supertest';
import app from '#app.js';

describe('GET /api/hello', () => {
  it('should return a JSON file with Hello World', async () => {
    const response = await request(app).get('/api/hello');

    expect(response.status).toBe(200);
    expect(response.body).toEqual({ hello: 'world' });
    expect(response.body.hello).toBe('world');
  });
});
