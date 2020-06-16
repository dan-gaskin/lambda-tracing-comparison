import awsXray from '../../lib/XrayService';
import DynamoService from '../../lib/DynamoService';
import HttpService from '../../lib/HttpService';

export default class Xray {
    public async worker() {
        console.log('Xray.worker starts')
        const payload = await new HttpService().get();
        if (!payload) {
            return 'http failure'
        };
        const dDbRes = await new DynamoService().putItem('xray', payload);
        console.log('Xray.worker completes')
        console.log(dDbRes)
        if (!dDbRes) {
            return 'ddb failure';
        };
        return 'success';
    }
}

exports.handler = async (event, context) => {
    console.log('incoming event: ', event)
    console.log('handler starts')
    const res = await new Xray().worker();
    console.log('handler completes')
    return res;
};