/* eslint-disable  func-names */
/* eslint quote-props: [“error”, “consistent”]*/


'use strict';

const Alexa = require('alexa-sdk');
const https = require('https');

// Or statement for the cases?
function httpsGet(url, callback) {

    // GET is a web service request that is fully defined by a URL string
    // Try GET in your browser:
    // https://cp6gckjt97.execute-api.us-east-1.amazonaws.com/prod/stateresource?usstate=New%20Jersey


    // Update these options with the details of the web service you would like to call
    const options = {
        host: `www.${url}.com`,
        port: 443,
        path: '/',
        method: 'GET'
    };

    const req = https.request(options, res => {
        res.setEncoding('utf8');
        var returnData = '';
        let code = res.statusCode;
        let message = url;

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

        res.on('data', chunk => {
            // returnData = returnData + chunk;
        });

        res.on('end', () => {
            callback(message);  // this will execute whatever function the caller defined, with one argument

        });

    });
    req.end();

}
const handlers = {
    'LaunchRequest': function () {
        this.emit('GetFact');
    },
    'CheckStatus': function () {
        const url = this.event.request.intent.slots.url.value;
        httpsGet(url,  (message) => {
                this.emit(':tell', message);
            }
        );

    },
    'AMAZON.HelpIntent': function () {
        const speechOutput = "You can say things like: 'Is facebook down?' or 'is google broken'";
        this.emit(':tell', speechOutput);
    },
    'AMAZON.CancelIntent': function () {
        this.emit(':tell', "Goodbye");
    },
    'AMAZON.StopIntent': function () {
        this.emit(':tell', "Goodbye");
    },
};

exports.handler = function (event, context) {
    const alexa = Alexa.handler(event, context);
    alexa.registerHandlers(handlers);
    alexa.execute();
};