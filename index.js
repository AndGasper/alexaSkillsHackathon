/* eslint-disable  func-names */
/* eslint quote-props: [“error”, “consistent”]*/


'use strict';

const Alexa = require('alexa-sdk');
const https = require('https');

function normalizeURL(url) {
    let formattedURL = '';
    (url.slice(-4) === '.com') ? (formattedURL = url.slice(0,-4)) : (formattedURL = url); // if the .com domain suffix was present, remove it, else, assign the url to the formattedURL;
    (formattedURL.slice(0,4) === 'www.') ? (formattedURL = formattedURL.slice(4)) : (formattedURL = formattedURL); // redundant, but explicit;
    return formattedURL;
}
function httpsGet(url, callback) {
    // Only need the status code, so GET will suffice;
    // Update these options with the details of the web service you would like to call
    let formattedURL = normalizeURL(url); // normalizeURL returns just the
    const options = {
        host: `www.${formattedURL}.com`,
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
                message += ` tried to redirect me somewhere else...Not sure what to tell you about that`;
                break;
            case 302:
            case 308:
                message += ` tried to redirect me somewhere else...Not sure what to tell you about that`;
                break;
            case 303:
            case 304:
            case 305:
            case 306:
            case 307:
                message += ` has been redirected to another location`;
                break;
            case 400:
                message = `The site you have requested does not seem to want to take our request at this time.`;
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
        this.emit(':tell', "You can say things like, Ask status check: is facebook up?");
    },
    'CheckStatus': function () {
        let url = this.event.request.intent.slots.url.value;
        url = url.toLowerCase(); // toLowerCase fixes issue with netflix. For some reason, it was taking "Netflix" as the URL.
        let urlPotentialSuffix = url.slice(-4); // Store the last 4 characters of the passed url to a variable, so the value is not recomputed on each OR statement
        if (urlPotentialSuffix=== '.org' || urlPotentialSuffix === '.net' || urlPotentialSuffix === '.int' || urlPotentialSuffix === '.edu' || urlPotentialSuffix === '.gov' || urlPotentialSuffix === '.mil') {
            this.emit(':tell', "Site Status Check currently only supports dot com domains");
        } else {
            let test = `You said: <say-as interpret-as="spell-out">${url}</say-as>`;
            httpsGet(url,  (message) => {
                this.emit(':tell', message);
            });
        }
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