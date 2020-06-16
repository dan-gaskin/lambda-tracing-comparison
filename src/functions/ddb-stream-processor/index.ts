import S3Service from '../../lib/S3Service';

export default class Processor {
    public async worker() {
        console.log('Processor.worker starts');
        const s3Res = await new S3Service().upload('ddbupdate', {});
        console.log('Processor.worker completes');
        if (!s3Res) {
            return 's3 failure';
        }
        return 'success';
    }
}

exports.handler = async (event, context) => {
    console.log('incoming event', event);
    console.log('handler starts');
    const res = await new Processor().worker();
    console.log('handler completes');
    return res;
};