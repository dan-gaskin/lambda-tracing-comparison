import S3Service from '../../lib/S3Service';
import awsXray from '../../lib/XrayService';

export default class Processor {
    public async worker() {
        console.log('Processor.worker starts');
        await new S3Service().upload('ddbupdate', {});
        console.log('Processor.worker completes');
        return 'success';
    }
}

exports.handler = async (event, context) => {
    console.log('incoming event', event);
    console.log('handler starts, tracing enabled ', awsXray);
    const response = await new Processor().worker();
    console.log('handler completes');
    return response;
};