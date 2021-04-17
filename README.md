Current Heroku URL: https://thawing-meadow-87139.herokuapp.com/

### Requirements
1. npm install axios
2. npm i react-google-login
3. npm install --save isomorphic-fetch
4. npm i react-youtube
5. npm i movie-trailer

### Postgre Database Connection

Go to the Heroku app. Under settings, look at config vars and copy the DATABASE_URL.
In the terminal, enter 
export DATABASE_URL='url goes here'
Alternatively, put the line
DATABASE_URL='url goes here'
in a .env file in the same folder as app.py

### Google Login
In a .env add variable REACT_APP_GOOGLE_CLIENT_KEY='YOURKEY'

### Python Linting

The warning "invalid-envvar-default" has been disabled.
The warning too-few-public-methods has been disabled.
The warning no-members has been disabled since it would return false positives

