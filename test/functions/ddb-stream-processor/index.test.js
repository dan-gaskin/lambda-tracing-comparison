import {handler} from '../../../src/functions/ddb-stream-processor';
import S3Service from '../../../src/lib/S3Service';
const sinon = require('sinon');
const AWS = require('aws-sdk');

describe('ddb-stream-processor function', () => {
    beforeEach(() => {
        sinon.restore();
    })
    it('should return success if all calls successful', async () => {
        const testObj = { ETag: 'abc'}
        sinon.stub(S3Service.prototype, "upload").resolves(testObj)
        const result = await handler();
        expect(result).toBe('success');
    })
    it('should return s3 failure if s3 call fails', async () => {
        sinon.stub(S3Service.prototype, "upload").throws(new Error('s3 error'))
        try {
            await handler();
        } catch (result) {
            expect(result).toStrictEqual(new Error('s3 error'));
        }
    })
})
