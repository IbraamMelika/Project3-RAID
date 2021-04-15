Current Heroku URL: https://thawing-meadow-87139.herokuapp.com/

### Requirements
npm install axios
npm i react-google-login

### Postgre Database Connection

Go to the Heroku app. Under settings, look at config vars and copy the DATABASE_URL.
In the terminal, enter 
export DATABASE_URL='url goes here'
Alternatively, put the line
DATABASE_URL='url goes here'
in a .env file in the same folder as app.py

### NPM Requirements

npm install --save isomorphic-fetch

### Python Linting

The warning "invalid-envvar-default" has been disabled.
The warning too-few-public-methods has been disabled.
The warning no-members has been disabled since it would return false positives

### Google Login
In a .env add variable REACT_APP_GOOGLE_CLIENT_KEY='YOURKEY'