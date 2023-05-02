import chai from 'chai';
import sinon from 'sinon';

import { Model } from 'mongoose';
import CustomError from '../../helpers/CustomError';
import Wallet from '../../helpers/Wallet';
import WalletMocks from '../mocks/wallet.mock';

const { expect } = chai;

describe('Wallet', () => {
    afterEach(() => sinon.restore());

    it('should calculate wallet', async () => {
        sinon.stub(Model, 'findById').resolves(WalletMocks.USER);
        await Wallet.update('123');
        expect(WalletMocks.USER.wallet).to.be.deep.equal(WalletMocks.WALLET_RESULT);
    });

    it('should throw error when user not found', async () => {
        sinon.stub(Model, 'findById').resolves(null);
        try {
            await Wallet.update('123');
        } catch (error) {
            expect((error as CustomError).message).to.be.equal('User not found');
            expect((error as CustomError).status).to.be.equal(404);
        }
    });
});
