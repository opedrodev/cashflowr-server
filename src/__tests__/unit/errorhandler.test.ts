import { Response } from 'express';

import chai from 'chai';

import ErrorHandler from '../../helpers/ErrorHandler';

const { expect } = chai;

describe('ErrorHandler', () => {

    describe('handle', () => {
        it('should handle an unknown error', () => {
            const error = new Error('UnknownError');
            const res = {
                status: (status: number) => ({
                    json: (json: unknown) => {
                        expect(status).to.equal(500);
                        expect(json).to.have.property('message', 'Internal server error');
                    },
                }),
            } as unknown as Response;
            ErrorHandler.handle(res, error);
        });
    });

});
