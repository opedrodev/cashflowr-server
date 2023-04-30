import chai from 'chai';
import chaiHttp from 'chai-http';
import sinon from 'sinon';

import { Model } from 'mongoose';
import App from '../../App';
import TransactionMocks from '../mocks/transaction.mock';

const { app } = new App();
const { expect } = chai;
chai.use(chaiHttp);

describe('Transaction', () => {
    describe('GET /transactions/:id', () => {
        afterEach(() => sinon.restore());

        it('should return all transactions from a user', async () => {
            sinon.stub(Model, 'findById').resolves(TransactionMocks.USER);

            const res = await chai
                .request(app)
                .get('/transactions/123');

            expect(res.status).to.equal(200);
            expect(res.body).to.be.an('array');
            expect(res.body).to.have.lengthOf(1);
            expect(res.body[0]).to.be.deep.equal(TransactionMocks.TRANSACTION);
        });

        it('should throw an error when user not found', async () => {
            sinon.stub(Model, 'findById').resolves(null);

            const res = await chai
                .request(app)
                .get('/transactions/123');

            expect(res.status).to.equal(404);
            expect(res.body).to.have.property('message');
            expect(res.body.message).to.be.equal('User not found');
        });
    });

    describe('POST /transactions/:id', () => {
        afterEach(() => sinon.restore());

        it('should create a new income transaction', async () => {
            sinon.stub(Model, 'findByIdAndUpdate').resolves(TransactionMocks.USER);

            const res = await chai
                .request(app)
                .post('/transactions/123')
                .send(TransactionMocks.TRANSACTION_INCOME);

            expect(res.status).to.equal(201);
            expect(res.body).to.have.property('message');
            expect(res.body.message).to.be.equal('Transaction created successfully');
        });

        it('should create a new outcome transaction', async () => {
            sinon.stub(Model, 'findByIdAndUpdate').resolves(TransactionMocks.USER);

            const res = await chai
                .request(app)
                .post('/transactions/123')
                .send(TransactionMocks.TRANSACTION_OUTCOME);

            expect(res.status).to.equal(201);
            expect(res.body).to.have.property('message');
            expect(res.body.message).to.be.equal('Transaction created successfully');
        });

        it('should throw an error when user not found', async () => {
            sinon.stub(Model, 'findByIdAndUpdate').resolves(null);

            const res = await chai
                .request(app)
                .post('/transactions/123')
                .send(TransactionMocks.TRANSACTION_OUTCOME);

            expect(res.status).to.equal(404);
            expect(res.body).to.have.property('message');
            expect(res.body.message).to.be.equal('User not found');
        });

        it('should throw an error if called with invalid data', async () => {
            sinon.stub(Model, 'findByIdAndUpdate').resolves(null);

            const res = await chai
                .request(app)
                .post('/transactions/123')
                .send(TransactionMocks.INVALID_TRANSACTION);

            expect(res.status).to.equal(422);
            expect(res.body).to.have.property('message');
        });
    });
});
