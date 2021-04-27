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
no-else-return was disabled as it worsened readability in some places

### Server Unit Testing

In case database is wiped, run the following code somewhere in app.py to reinitialize the database to pass the unit tests
test_em = [('naman@stuff.com', 'nam61'), ('user1@stuff.com', 'use200'), ('ranfis@stuff.com', 'ran200'), ('Dre@stuff.com', 'Dre200'), ('Ibrahim@stuff.com', 'Ibr200'), ('newuser@network.com', 'DefaultUsername'), ('test@network.com', 'tes845'), ('andre07087@gmail.com', 'and114') ]

for pair in test_em:
    email = pair[0]
    username = pair[1]
    if not is_person(email):
        add_person(email, username)