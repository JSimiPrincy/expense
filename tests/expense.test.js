const request = require('supertest');
const app = require('../server'); // Assuming your server.js exports the Express app

describe('Expense API', () => {
    let token;
    beforeAll(async () => {
        const res = await request(app)
            .post('/api/users/login')
            .send({
                email: 'test@example.com',
                password: 'password123'
            });
        token = res.body.token;
    });

    it('should add a new expense', async () => {
        const res = await request(app)
            .post('/api/expenses')
            .set('Authorization', `Bearer ${token}`)
            .send({
                amount: 100,
                description: 'Test Expense',
                paidBy: 'user_id',
                splitType: 'equal',
                participants: [
                    { user: 'user_id', amount: 50 },
                    { user: 'user_id_2', amount: 50 }
                ]
            });
        expect(res.statusCode).toEqual(201);
        expect(res.body).toHaveProperty('_id');
    });
});
