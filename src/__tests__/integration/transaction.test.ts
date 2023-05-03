import chai from 'chai';
import chaiHttp from 'chai-http';
import sinon from 'sinon';

import jwt from 'jsonwebtoken';
import { Model } from 'mongoose';
import App from '../../App';
import TransactionMocks from '../mocks/transaction.mock';

const { app } = new App();
const { expect } = chai;
chai.use(chaiHttp);

describe('Transaction', () => {
    describe('GET /transactions', () => {
        beforeEach(() => sinon.stub(jwt, 'verify').resolves({ id: '123' }));
        afterEach(() => sinon.restore());

        it('should return all transactions from a user', async () => {
            sinon.stub(Model, 'findById').resolves(TransactionMocks.USER);

            const res = await chai
                .request(app)
                .get('/transactions')
                .set('Authorization', '123');

            expect(res.status).to.equal(200);
            expect(res.body).to.be.an('array');
            expect(res.body).to.have.lengthOf(1);
            expect(res.body[0]).to.be.deep.equal(TransactionMocks.TRANSACTION);
        });

        it('should throw an error when user not found', async () => {
            sinon.stub(Model, 'findById').resolves(null);

            const res = await chai
                .request(app)
                .get('/transactions')
                .set('Authorization', '123');

            expect(res.status).to.equal(404);
            expect(res.body).to.have.property('message');
            expect(res.body.message).to.be.equal('User not found');
        });

        it('should throw an error if token is not provided', async () => {
            const res = await chai
                .request(app)
                .get('/transactions');

            expect(res.status).to.equal(404);
            expect(res.body).to.have.property('message');
            expect(res.body.message).to.be.equal('Token not found');
        });

        it('should throw an error if token is invalid', async () => {
            sinon.restore();
            sinon.stub(jwt, 'verify').throws();

            const res = await chai
                .request(app)
                .get('/transactions')
                .set('Authorization', '123');

            expect(res.status).to.equal(401);
            expect(res.body).to.have.property('message');
            expect(res.body.message).to.be.equal('Invalid token');
        });
    });

    describe('POST /transactions', () => {
        beforeEach(() => sinon.stub(jwt, 'verify').resolves({ id: '123' }));
        afterEach(() => sinon.restore());

        it('should create a new income transaction', async () => {
            sinon.stub(Model, 'findByIdAndUpdate').resolves(TransactionMocks.USER);

            const res = await chai
                .request(app)
                .post('/transactions')
                .send(TransactionMocks.TRANSACTION_INCOME)
                .set('Authorization', '123');

            expect(res.status).to.equal(201);
            expect(res.body).to.have.property('message');
            expect(res.body.message).to.be.equal('Transaction created successfully');
        });

        it('should create a new outcome transaction', async () => {
            sinon.stub(Model, 'findByIdAndUpdate').resolves(TransactionMocks.USER);

            const res = await chai
                .request(app)
                .post('/transactions')
                .send(TransactionMocks.TRANSACTION_OUTCOME)
                .set('Authorization', '123');

            expect(res.status).to.equal(201);
            expect(res.body).to.have.property('message');
            expect(res.body.message).to.be.equal('Transaction created successfully');
        });

        it('should throw an error when user not found', async () => {
            sinon.stub(Model, 'findByIdAndUpdate').resolves(null);

            const res = await chai
                .request(app)
                .post('/transactions')
                .send(TransactionMocks.TRANSACTION_OUTCOME)
                .set('Authorization', '123');

            expect(res.status).to.equal(404);
            expect(res.body).to.have.property('message');
            expect(res.body.message).to.be.equal('User not found');
        });

        it('should throw an error if called with invalid data', async () => {
            sinon.stub(Model, 'findByIdAndUpdate').resolves(null);

            const res = await chai
                .request(app)
                .post('/transactions')
                .send(TransactionMocks.INVALID_TRANSACTION)
                .set('Authorization', '123');

            expect(res.status).to.equal(422);
            expect(res.body).to.have.property('message');
        });

        it('should throw an error if token is not provided', async () => {
            const res = await chai
                .request(app)
                .get('/transactions');

            expect(res.status).to.equal(404);
            expect(res.body).to.have.property('message');
            expect(res.body.message).to.be.equal('Token not found');
        });

        it('should throw an error if token is invalid', async () => {
            sinon.restore();
            sinon.stub(jwt, 'verify').throws();

            const res = await chai
                .request(app)
                .get('/transactions')
                .set('Authorization', '123');

            expect(res.status).to.equal(401);
            expect(res.body).to.have.property('message');
            expect(res.body.message).to.be.equal('Invalid token');
        });
    });

    describe('DELETE /transactions/:id', () => {
        beforeEach(() => sinon.stub(jwt, 'verify').resolves({ id: '123' }));
        afterEach(() => sinon.restore());

        it('should throw an error when transaction not found', async () => {
            sinon.stub(Model, 'findById').resolves(TransactionMocks.USER);
            sinon.stub(Array.prototype, 'findIndex').returns(-1);
            const { transactions } = TransactionMocks.USER.wallet;

            const res = await chai
                .request(app)
                .delete('/transactions/124')
                .set('Authorization', '123');

            expect(res.status).to.equal(404);
            expect(res.body).to.have.property('message');
            expect(res.body.message).to.be.equal('Transaction not found');
            expect(transactions).to.have.lengthOf(1);
        });

        it('should throw an error when user not found', async () => {
            sinon.stub(Model, 'findById').resolves(null);

            const res = await chai
                .request(app)
                .delete('/transactions/123')
                .set('Authorization', '123');

            expect(res.status).to.equal(404);
            expect(res.body).to.have.property('message');
            expect(res.body.message).to.be.equal('User not found');
        });

        it('should delete a transaction', async () => {
            sinon.stub(Model, 'findById').resolves(TransactionMocks.USER);
            const { transactions } = TransactionMocks.USER.wallet;

            const res = await chai
                .request(app)
                .delete('/transactions/123')
                .set('Authorization', '123');

            expect(res.status).to.equal(200);
            expect(res.body).to.have.property('message');
            expect(res.body.message).to.be.equal('Transaction deleted successfully');
            expect(transactions).to.have.lengthOf(0);
        });
    });
});
