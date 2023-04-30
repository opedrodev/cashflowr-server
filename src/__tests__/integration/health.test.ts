import chai from 'chai';
import chaiHttp from 'chai-http';

import App from '../../App';

const { app } = new App();
const { expect } = chai;
chai.use(chaiHttp);

describe('Health', () => {
    describe('GET /health', () => {
        it('should return OK', async () => {
            const res = await chai.request(app).get('/health');

            expect(res.status).to.equal(200);
            expect(res.body).to.deep.equal({ message: 'OK' });
        });
    });
});
