import S3 from 'aws-sdk/clients/s3';

export default class S3Service {
    private s3Client: S3;
    constructor() {
        this.s3Client = new S3({region: 'eu-west-1'});
    }

    public async upload(s3Key: string, res: object) {
        console.log('S3Service.upload starts');
        try {
            const result = await this.s3Client.putObject(
                {
                    Bucket: process.env.s3BucketName,
                    Key: s3Key,
                    Body: JSON.stringify(res)
                }).promise();
            console.log('S3Service.upload completes');
            return result;
        } catch (err) {
            throw new Error(`Error: S3Service.upload: ${err}`);
        }
    }
}