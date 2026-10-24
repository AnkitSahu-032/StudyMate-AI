// Alexa custom skill AWS Lambda handler (ASK SDK v2).
// This is a conventional Alexa skill sample; it does NOT by itself establish Alexa+ track eligibility.
const Alexa=require('ask-sdk-core');
const Launch={canHandle:i=>Alexa.getRequestType(i.requestEnvelope)==='LaunchRequest',handle:i=>i.responseBuilder.speak('Welcome to Study Mate. Say give me a study tip, or start a quiz.').reprompt('Say study tip or start quiz.').getResponse()};
const Tip={canHandle:i=>Alexa.getIntentName(i.requestEnvelope)==='StudyTipIntent',handle:i=>i.responseBuilder.speak('Try active recall. Read a concept, close your notes, and explain it in your own words.').getResponse()};
const Quiz={canHandle:i=>Alexa.getIntentName(i.requestEnvelope)==='StudyQuizIntent',handle:i=>i.responseBuilder.speak('Quick quiz. What does CPU stand for? The answer is Central Processing Unit.').getResponse()};
const Help={canHandle:i=>Alexa.getIntentName(i.requestEnvelope)==='AMAZON.HelpIntent',handle:i=>i.responseBuilder.speak('Say study tip, or start quiz.').reprompt('What would you like?').getResponse()};
const Exit={canHandle:i=>['AMAZON.StopIntent','AMAZON.CancelIntent'].includes(Alexa.getIntentName(i.requestEnvelope)),handle:i=>i.responseBuilder.speak('Happy studying!').getResponse()};
const Fallback={canHandle:()=>true,handle:i=>i.responseBuilder.speak('Please say study tip or start quiz.').reprompt('What would you like?').getResponse()};
exports.handler=Alexa.SkillBuilders.custom().addRequestHandlers(Launch,Tip,Quiz,Help,Exit,Fallback).lambda();
