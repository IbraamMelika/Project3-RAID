'''Module to run server side of app.'''

import os
from dotenv import load_dotenv, find_dotenv
from flask import Flask, send_from_directory, json
from flask_socketio import SocketIO
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy
import models

APP = Flask(__name__, static_folder='./build/static')

load_dotenv(find_dotenv())

# Point SQLAlchemy to your Heroku database.
# Replace fixes old url being depreciated.
APP.config['SQLALCHEMY_DATABASE_URI'] = os.getenv('DATABASE_URL').replace(
    "postgres://", "postgresql://", 1)
# Gets rid of a warning
APP.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

DB = SQLAlchemy(APP)

# Setup models that will be used to query the database
Person = models.define_person_class(DB)
Favorite = models.define_favorite_class(DB)
Comment = models.define_comment_class(DB)
DB.create_all()

CORS_VAR = CORS(APP, resources={r"/*": {"origins": "*"}})

SOCKETIO = SocketIO(
    APP,
    cors_allowed_origins="*",
    json=json,
    manage_session=False,
)

def email_in_person(email):
    '''Returns True is email is in Person, False otherwise'''
    query = Person.query.filter_by(email=email).first()
    print(query)
    if query is None:
        return False
    return True

def insert_person(email, username=None):
    '''Inserts new Person into database.
    Makes no assumptions about whether or not the user is in the database already.
    Will create an error if the email is already in the database'''

    new_user = Person(email=email, username=username)
    DB.session.add(new_user)
    DB.session.commit()

@APP.route('/', defaults={"filename": "index.html"})
@APP.route('/<path:filename>')
def index(filename):
    '''Returns index.'''
    return send_from_directory('./build', filename)

@APP.route('/api/v1/test', methods=['GET'])
def test_route():
    '''Returns success response'''
    return {'success': True, "statusText": "Got Response"}

APP.run(
    host=os.getenv('IP', '0.0.0.0'),
    port=8081 if os.getenv('C9_PORT') else int(os.getenv('PORT', 8080)),
)
