import request from 'supertest';
import { app } from '../../../app';

describe('signinRouter', () => {
  it('fails when a email that does not exist is supplied', async () => {
    await request(app)
      .post('/api/users/signin')
      .send({
        email: 'test@test.com',
        password: 'password',
      })
      .expect(400);
  });

  it('fails when an incorrect password is supplied', async () => {
    await request(app)
      .post('/api/users/signup')
      .send({
        email: 'test@test.com',
        password: 'password',
      })
      .expect(201);

    // password length small than 4 or bigger than 15
    await request(app)
      .post('/api/users/signin')
      .send({
        email: 'test@test.com',
        password: 'p',
      })
      .expect(400);

    await request(app)
      .post('/api/users/signin')
      .send({
        email: 'test@test.com',
        password: 'pjhgkjhgkjgjhkjkgjkgjkgjkkjkkjl',
      })
      .expect(400);

    // password is not correct
    await request(app)
      .post('/api/users/signin')
      .send({
        email: 'test@test.com',
        password: 'jhkjgi',
      })
      .expect(400);
  });

  it('response with a cookie when give valid credentials', async () => {
    await request(app)
      .post('/api/users/signup')
      .send({
        email: 'test@test.com',
        password: 'password',
      })
      .expect(201);

    const res = await request(app)
      .post('/api/users/signin')
      .send({
        email: 'test@test.com',
        password: 'password',
      })
      .expect(200);

    expect(res.get('Set-Cookie')).toBeDefined();
  });
});
