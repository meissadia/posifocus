## Demo  

[Posifocus Web](https://posifocus.surge.sh)  

## Motivation  
[Posifocus](https://posifocus.com/) is a mentality supported by an iOS app.  

[Posifocus Web](https://posifocus.surge.sh) \(this repo) is a Progressive Web Application implemented with React, aiming to expand the reach of Posifocus beyond iOS devices. 

## Progress  
- [Retrospective #1](./artifacts/retrospective_01.md)  

## Development  

Create a .env file in your project root with the following variables configured with your Firebase configuration values.  
`Sorry, these are poorly named variables.  I'll update these soon to make the mapping obvious.`
```
# /.env
REACT_APP_FIREBASE_KEY = "YOUR_VALUE_HERE"
REACT_APP_FIREBASE_DOMAIN = "YOUR_VALUE_HERE"
REACT_APP_FIREBASE_DATABASE = "YOUR_VALUE_HERE"
REACT_APP_FIREBASE_PROJECT_ID = "YOUR_VALUE_HERE"
REACT_APP_FIREBASE_STORAGE_BUCKET = "YOUR_VALUE_HERE"
REACT_APP_FIREBASE_SENDER_ID = "YOUR_VALUE_HERE"
```  

Install dependecies
```
nvm use
npm install
brew update && brew bundle
```
