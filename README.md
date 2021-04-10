Current Heroku URL: https://thawing-meadow-87139.herokuapp.com/

### Postgre Database Connection

Go to the Heroku app. Under settings, look at config vars and copy the DATABASE_URL.
In the terminal, enter 
export DATABASE_URL='url goes here'
Alternatively, put the line
DATABASE_URL='url goes here'
in a .env file in the same folder as app.py

### Python Linting

The warning "invalid-envvar-default" has been disabled.