import awsXray from '../../lib/XrayService';
import DynamoService from '../../lib/DynamoService';
import HttpService from '../../lib/HttpService';

export default class Xray {
    public async worker() {
        console.log('Xray.worker starts');
        const payload = await new HttpService().get();
        await new DynamoService().putItem('xray', payload);
        console.log('Xray.worker completes');
        return 'success';
    }
}

exports.handler = async (event, context) => {
    console.log('incoming event: ', event);
    console.log('handler starts, tracing enabled ', awsXray);
    const response = await new Xray().worker();
    console.log('handler completes');
    return response;
};