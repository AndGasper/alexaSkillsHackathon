# Amazon Alexa Hackathon (06/03/2017)
1. Sign in to the Amazon Developer Console and navigate to the "Alexa" development tab
2. "Building Alexa Skills with the Alexa Skills Kit -> Add a New Skill"  
Note: Prior to clicking "Submit for Certification", you will be able to navigate ***back*** to any of the previous form groups:  
(*Skill Information*, *Interaction Model*, *Configuration*, *Test*, *Publishing Information*)  
  
  ### _Skill Information_
  ---
    - *Skill Type*- Custom
    - *Language*- English (U.S.) (Pre-defined)
    - *Application id* - The id of the skill (Pre-defined)
    - *Name* - Name of the app
    - *Invocation Name*- This one is fairly important, so choose wisely. That being said, as long as it's before  
    submitting for certification, you will be able to change the invocation name as many times as you want/need 
    
  ### _Interaction Model_
  ---
  ***Intent Schema** - Abstract summary of actions availble to the skill  
  *Data format: *JSON*  
    (See _site_check_intent_schema_ for an example (***skeleton/incomplete***))  
  
      "intents": Array of Objects  
      -An example element of the intents array:  
      // Just to be clear:   
      // This is ***not*** the whole   
      // file/thing you would need to have in the \`Intent Schema \`    
      // textbox to get the skill to work  
      {  
        "intent": "CheckStatus",
        "slots": [  
          {  
            "name": "url",  
            "type": "LIST_OF_SITES"
          },
          {
            "name": "Date",
            "type": "AMAZON.DATE"
          }
        ]
      }
     

*Custom Slot Types
## Utterances: How can people actually _interact_ with your Alexa Skill?
**
  
-See Utterances.txt file 
-In the Developer Amazon 
