import rpn from 'request-promise-native';

export default class HttpService {
    public async get() {
        console.log('HttpService.get starts')
        const request = rpn.defaults({
            json: true,
            resolveWithFullResponse: true,
            strictSSL: false
        });
        const response = await request.get(process.env.requestGetUrl);
        console.log('HttpService.get completes');
        if (response.statusCode === 200) {
            return response.body;
        } else {
            throw new Error(`HttpService.get: ${response.statusCode}`);
        }
    }
}