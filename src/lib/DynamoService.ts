import DynamoDb from 'aws-sdk/clients/dynamodb';

export default class DynamoService {
    private docClient: DynamoDb.DocumentClient;
    constructor() {
        this.docClient = new DynamoDb.DocumentClient({region: 'eu-west-1'});
    }

    public async putItem(funcName: string, res: object) {
        console.log('DynamoService.putItem starts')
        try {
            const result = await this.docClient.put(
                {
                    TableName: process.env.DynamoTableName,
                    Item: {
                        function_name: funcName,
                        function_result: res,
                        timestamp: Date.now()
                    }
                }).promise();
            console.log('DynamoService.putItem completes')
            return result;
        } catch (err) {
            throw new Error(`DynamoService.putItem: ${err}`)
        }
    }
}