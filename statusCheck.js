var https = require('https');



const statusCheckRequest = function (url) {

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
    let message = '';
    const req = https.get(url, res => {
        let code = res.statusCode;

        switch(code) {
            case 200:
            case 201:
            case 202:
                message = "Okay";
                break;
            case 204:
            case 205:
            case 206:
                message = "Partial or no content";
                break;
            case 300:
            case 301:
            case 302:
                message = `Peramnent Redirect to ${res.headers.location}`;
                break;
            case 303:
            case 304:
            case 305:
            case 306:
            case 307:
                break;
            case 308:
                message = `Peramnent Redirect to ${res.headers.location}`;
                break;
            case 400:
                message = "Bad request";
                break;
            case 401:
                message = "unauthorized";
                break;
            case 403:
                message = "forbidden";
                break;
            case 404:
                message = "Not Found";
                break;
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
                message = "is Down";
                break;
        }
    });

};

module.exports = statusCheckRequest;

