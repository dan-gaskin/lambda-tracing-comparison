import DynamoService from '../../lib/DynamoService';
import HttpService from '../../lib/HttpService';

export default class Lumigo {
    public async worker() {
        console.log('Lumigo.worker starts')
        const payload = await new HttpService().get();
        if (!payload) {
            return 'http failure'
        };
        const dDbRes = await new DynamoService().putItem('lumigo', payload);
        console.log('Lumigo.worker completes')
        if (!dDbRes) {
            return 'ddb failure';
        };
        return 'success';
    }
}

exports.handler = async (event, context) => {
    console.log('incoming event: ', event);
    console.log('handler starts')
    const res = await new Lumigo().worker();
    console.log('handler completes')
    return res;
};