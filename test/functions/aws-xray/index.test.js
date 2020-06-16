import {handler} from '../../../src/functions/aws-xray';
import request from 'request-promise-native';
const AWSMock = require('aws-sdk-mock');
import AWS from 'aws-sdk';
AWSMock.setSDKInstance(AWS);

describe('aws-xray function', () => {
    beforeEach(() => {
        AWSMock.restore('DynamoDB.DocumentClient');
    })
    it('should return success if all calls successful', async () => {
        jest.spyOn(request, 'get').mockReturnValueOnce(
            {
                "statusCode": 200,
                "body": {
                    "foo": "bar"
                }
            }
        );
        AWSMock.mock('DynamoDB.DocumentClient', 'put', function(params, callback) {
            callback(null, 'success')
        })
        const result = await handler()
        expect(result).toBe('success')
    })
    it('should return http failure if http call not 200', async () => {
        jest.spyOn(request, 'get').mockReturnValueOnce(
            {
                "statusCode": 503
            }
        );
        AWSMock.mock('DynamoDB.DocumentClient', 'put', function(params, callback) {
            callback(() => {throw new Error()}, null)
        })
        const result = await handler()
        expect(result).toBe('http failure')
    })
    it('should return http failure if dynamodb call fails', async () => {
        jest.spyOn(request, 'get').mockReturnValueOnce(
            {
                "statusCode": 200,
                "body": {
                    "foo": "bar"
                }
            }
        );
        AWSMock.mock('DynamoDB.DocumentClient', 'put', function(params, callback) {
            callback(() => {throw new Error()}, null)
        })
        const result = await handler()
        expect(result).toBe('ddb failure')
    })
})