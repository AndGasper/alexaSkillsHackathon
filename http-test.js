const  https = require('https');
export default function statusCheck(url) {
    https.get(url, function (res) {
        let code = res.statusCode;
        let message;

        switch (code) {
            case 200:
            case 201:
            case 202:
                return message = "Okay";
                break;
            case 204:
            case 205:
            case 206:
                return message = "Partial or no content";
                break;
            case 300:
            case 301:
            case 302:
                return message = `Peramnent Redirect to ${res.headers.location}`;
                break;
            case 303:
            case 304:
            case 305:
            case 306:
            case 307:
                break;
            case 308:
                return message = `Peramnent Redirect to ${res.headers.location}`;
                break;
            case 400:
                return message = "Bad request";
                break;
            case 401:
                return message = "unauthorized";
                break;
            case 403:
                return message = "forbidden";
                break;
            case 404:
                return message = "Not Found";
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
        console.log(message);
    }).on('error', function (e) {
        console.error(e);
    })
};