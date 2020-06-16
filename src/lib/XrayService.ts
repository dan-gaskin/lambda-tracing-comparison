import https from 'https';
import * as awsXray from 'aws-xray-sdk';
import AWS from 'aws-sdk';

awsXray.captureHTTPsGlobal(https, false);
export default awsXray.captureAWS(AWS);