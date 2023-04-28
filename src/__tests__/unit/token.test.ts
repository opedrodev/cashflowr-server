import chai from 'chai';

import Token from '../../helpers/Token';

const { expect } = chai;

describe('Token', () => {
    describe('create', () => {
        it('should return a token when created with rememberMe true', () => {
            const token = Token.create('id', true);
            expect(token).to.be.a('string');
        });

        it('should return a token hen created with rememberMe false', () => {
            const token = Token.create('id', false);
            expect(token).to.be.a('string');
        });
    });
});
