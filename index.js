/* eslint-disable  func-names */
/* eslint quote-props: ["error", "consistent"]*/


'use strict';

const statusCheck = require('./statusCheck');

const Alexa = require('alexa-sdk');
const https = require('https');


const APP_ID = undefined;  // TODO replace with your app ID (OPTIONAL).

const languageStrings = {
    'en': {
        translation: {
            SITE_LIST: {
                // List of sites go here
            },
            SKILL_NAME: 'Is It Down',
            GET_FACT_MESSAGE: "Here's your fact: ",
            HELP_MESSAGE: 'You can say tell me a space fact, or, you can say exit... What can I help you with?',
            HELP_REPROMPT: 'What can I help you with?',
            STOP_MESSAGE: 'Goodbye!',
            STATUS_MESSAGE: "That site is"
        },
    },
    'en-US': {
        translation: {
           SITELIST: {
               //TODO Put sites here
           },
            SKILL_NAME: 'American Space Facts',
        },
    }
};
const handlers = {
    'LaunchRequest': function () {
        this.emit('GetFact');
    },
    'CheckStatus': function () {
        const requestInfo = this.event.request.intent.slots;
        const website = requestInfo.url;
        console.log("website");
        this.emit(':tell', 'BLAH!');

    'statusCheck': function(){

        statusCheck(baseurl, url, (result) => {
            console.log("payload:",baseurl);
            console.log("sent:",url);
            console.log("received:",result);

            this.emit(':tell',result);
        });
    },
    'AMAZON.HelpIntent': function () {
        const speechOutput = this.t('HELP_MESSAGE');
        const reprompt = this.t('HELP_MESSAGE');
        this.emit(':ask', speechOutput, reprompt);
    },
    'AMAZON.CancelIntent': function () {
        this.emit(':tell', this.t('STOP_MESSAGE'));
    },
    'AMAZON.StopIntent': function () {
        this.emit(':tell', this.t('STOP_MESSAGE'));
    },
};

exports.handler = function (event, context) {
    const alexa = Alexa.handler(event, context);

    // To enable string internationalization (i18n) features, set a resources object.
    alexa.registerHandlers(handlers);
    alexa.execute();
};