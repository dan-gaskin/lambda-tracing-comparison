import DynamoService from '../../lib/DynamoService';
import HttpService from '../../lib/HttpService';

export default class Lumigo {
    public async worker() {
        console.log('Lumigo.worker starts')
        const payload = await new HttpService().get();
        await new DynamoService().putItem('lumigo', payload);
        console.log('Lumigo.worker completes')
        return 'success';
    }
}

exports.handler = async (event, context) => {
    console.log('incoming event: ', event);
    console.log('handler starts')
    const response = await new Lumigo().worker();
    console.log('handler completes')
    return response;
};