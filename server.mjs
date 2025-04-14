import express from 'express';
import Alexa, { SkillBuilders } from 'ask-sdk-core';
import morgan from 'morgan';
import { ExpressAdapter } from 'ask-sdk-express-adapter';

const app = express();
 app.use(morgan('dev'));
 const PORT = process.env.PORT || 3000;
 

 const LaunchRequestHandler = {
   canHandle(handlerInput) {
       return Alexa.getRequestType(handlerInput.requestEnvelope) === 'LaunchRequest';
   },
   handle(handlerInput) {
       const speakOutput = 'this is custom alexa skill endpoint testing'
       return handlerInput.responseBuilder
           .speak(speakOutput)
           .reprompt(speakOutput)
           .getResponse();
   }
};

const HelloWorldIntentHandler = {
   canHandle(handlerInput) {
       return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
           && Alexa.getIntentName(handlerInput.requestEnvelope) === 'HelloWorldIntent';
   },
   handle(handlerInput) {
       const speakOutput = 'Hello World!';

       return handlerInput.responseBuilder
           .speak(speakOutput)
           //.reprompt('add a reprompt if you want to keep the session open for the user to respond')
           .getResponse();
   }
};
const ErrorHandler = {
   canHandle() {
       return true;
   },
   handle(handlerInput, error) {
       const speakOutput = 'Sorry, I had trouble doing what you asked. Please try again.';
       console.log(`~~~~ Error handled: ${JSON.stringify(error)}`);

       return handlerInput.responseBuilder
           .speak(speakOutput)
           .reprompt(speakOutput)
           .getResponse();
   }
};

   
 const SkillBuilder = SkillBuilders.custom()
 .addRequestHandlers(
    LaunchRequestHandler,
    HelloWorldIntentHandler,
 ).addErrorHandlers(
    ErrorHandler,
 )

 const skill = SkillBuilder.create();
 const adapter = new ExpressAdapter(skill, false, false);

 app.post('/alexa', adapter.getRequestHandlers());

 app.use(express.json());

 app.listen(PORT, () => {
     console.log(`Server is running on port ${PORT}`);
 });