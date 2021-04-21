Sprint1 Heroku URL: https://thawing-meadow-87139.herokuapp.com/


Sprint2 Heroku URL: https://ancient-coast-64911.herokuapp.com/

### Logging In
If the Google login does not work, try clearing your cached images and files in your browser settings

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
1. In a .env add variable REACT_APP_GOOGLE_CLIENT_KEY='YOURKEY'
2. Try clearing cache if google login fails

### Python Linting

The warning "invalid-envvar-default" has been disabled.
The warning too-few-public-methods has been disabled.
The warning no-members has been disabled since it would return false positives

