## Demo  

[Posifocus Web](https://posifocus.surge.sh)  

## Motivation  
[Posifocus](https://posifocus.com/) is a mentality supported by an iOS app.  

[Posifocus Web](https://posifocus.surge.sh) is a Progressive Web Application implemented with React, aiming to expa

## Todo  

Global  
  - [ ] Establish shared Object formats so that we can share Cloud storage across web/ios.  
  - [X] Separate CloudSync and non-Sync related Settings

Security  
  - [X] Ensure no keys are exposed? {key, firebase, auth}
  - [X] Teardown alternate deployments

Registration  
  - [X] ~~Save full name~~ Remove full name from Sign Up
  - [ ] Enable Password Forgot
  - [ ] Enable Password Change

List  
  - [ ] Enable list-item edit  
  - [ ] Enable create/edit without route change (should help fix item animations)  

UI  
  - [ ] Find appropriate colors  
  - [ ] Switch all icons to SVG  
  - [ ] Revisit background graphic implementation
  - [ ] Finish animating Settings
  - [X] Revisit Settings layout
  - [X] Revisit background colorimplementation
  - [X] Move Reset Data to Settings  
  - [X] Date off-center in New Contact on iOS

## Development  

Create a .env file in your project root with the following variables configured with your Firebase configuration values.  
```
REACT_APP_FIREBASE_KEY = "YOUR_VALUE_HERE"
REACT_APP_FIREBASE_DOMAIN = "YOUR_VALUE_HERE"
REACT_APP_FIREBASE_DATABASE = "YOUR_VALUE_HERE"
REACT_APP_FIREBASE_PROJECT_ID = "YOUR_VALUE_HERE"
REACT_APP_FIREBASE_STORAGE_BUCKET = "YOUR_VALUE_HERE"
REACT_APP_FIREBASE_SENDER_ID = "YOUR_VALUE_HERE"
```  
