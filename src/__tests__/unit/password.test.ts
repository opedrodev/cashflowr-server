import chai from 'chai';

import Password from '../../helpers/Password';

const { expect } = chai;

describe('Password', () => {

    describe('hash', () => {
        it('should hash a password', () => {
            const password = 'password';
            const hashedPassword = Password.hash(password);
            expect(hashedPassword).to.not.equal(password);
        });
    });

    describe('compare', () => {
        it('should compare a password with a hashed password', () => {
            const password = 'password';
            const hashedPassword = Password.hash(password);
            const isMatch = Password.compare(password, hashedPassword);
            expect(isMatch).to.equal(true);
        });
    });

});
