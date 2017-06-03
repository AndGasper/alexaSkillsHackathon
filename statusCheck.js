var https = require('https');



const statusCheckRequest = function (baseurl, url, callback) {

    // GET is a web service request that is fully defined by a URL string
    // Try GET in your browser:
    // https://cp6gckjt97.execute-api.us-east-1.amazonaws.com/prod/stateresource?usstate=New%20Jersey
    // // Update these options with the details of the web service you would like to call
    // var options = {
    //     host: url,
    //     port: 443,
    //     path: '/',
    //     method: 'GET',
    //
    //     // if x509 certs are required:
    //     // key: fs.readFileSync('certs/my-key.pem'),
    //     // cert: fs.readFileSync('certs/my-cert.pem')
    // };
    const req = https.get(url, res => {
        let code = res.statusCode;
        let message = baseurl;

        switch(code) {
            case 200:
            case 201:
            case 202:
                message += ' is up and running';
                break;
            case 204:
            case 205:
            case 206:
                message += ` has partial or no content`;
                break;
            case 300:
            case 301:
                message += ` is permanently moved to ${res.headers.location}`;
                break;
            case 302:
            case 308:
                message += ` permanently redirects to ${res.headers.location}`;
                break;
            case 303:
            case 304:
            case 305:
            case 306:
            case 307:
                message += ` has been redirected to another location`;
                break;
            case 400:
                message = `That was a bad request`;
                break;
            case 401:
                message = `I am unauthorized to access this site without proper authentication`;
                break;
            case 403:
                message = `I am forbidden from access this site`;
                break;
            case 404:
                message = `I can not find that site`;
                break;
            case 418:
                message = `I'm a little teapot, short and stout.  Here is my handle, here is my spout.`;
            case 500:
            case 501:
            case 502:
            case 503:
            case 504:
            case 505:
            case 506:
            case 507:
            case 508:
            case 510:
            case 511:
                message += ` is down right now`;
                break;
            default:
                message = `Unknown status code ${code}`
        }
        callback(message);
    });
};

module.exports = statusCheckRequest;

