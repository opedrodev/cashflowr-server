import chai from 'chai';
import chaiHttp from 'chai-http';
import sinon from 'sinon';

import { Model } from 'mongoose';
import App from '../../App';
import ErrorType from '../../helpers/ErrorType';
import AuthMocks from '../mocks/auth.mock';

const { app } = new App();
const { expect } = chai;
chai.use(chaiHttp);

describe('Auth', () => {
    describe('POST /auth/signup', () => {
        afterEach(() => sinon.restore());

        it('should create a new user', async () => {
            sinon.stub(Model, 'create').resolves();

            const res = await chai
                .request(app)
                .post('/auth/signup')
                .send(AuthMocks.USER);

            expect(res.status).to.equal(201);
            expect(res.body).to.be.an('object');
            expect(res.body).to.have.property('message');
            expect(res.body.message).to.equal('User created successfully');
        });

        it('should return an error if user already exists', async () => {
            sinon.stub(Model, 'findOne').resolves(AuthMocks.USER);

            const res = await chai
                .request(app)
                .post('/auth/signup')
                .send(AuthMocks.USER);

            expect(res.status).to.equal(409);
            expect(res.body).to.be.an('object');
            expect(res.body).to.have.property('message');
            expect(res.body.message).to.equal('User already exists');
        });

        it('should return an error if name is too short', async () => {
            const res = await chai
                .request(app)
                .post('/auth/signup')
                .send(AuthMocks.USER_SHORT_NAME);

            expect(res.status).to.equal(422);
            expect(res.body).to.be.an('object');
            expect(res.body).to.have.property('message');
            expect(res.body.message).to.equal(ErrorType.NAME_MIN_LENGTH);
        });

        it('should return an error if email is invalid', async () => {
            const res = await chai
                .request(app)
                .post('/auth/signup')
                .send(AuthMocks.USER_INVALID_EMAIL);

            expect(res.status).to.equal(422);
            expect(res.body).to.be.an('object');
            expect(res.body).to.have.property('message');
            expect(res.body.message).to.equal(ErrorType.EMAIL_INVALID_FORMAT);
        });

        it('should return an error is password is too short', async () => {
            const res = await chai
                .request(app)
                .post('/auth/signup')
                .send(AuthMocks.USER_SHORT_PASSWORD);

            expect(res.status).to.equal(422);
            expect(res.body).to.be.an('object');
            expect(res.body).to.have.property('message');
            expect(res.body.message).to.equal(ErrorType.PASSWORD_MIN_LENGTH);
        });
    });
});
