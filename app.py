'''Module to run server side of app.'''

import os
import random
from urllib.parse import unquote
from dotenv import load_dotenv, find_dotenv
from flask import Flask, send_from_directory, json, request, Response
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
Watchlist = models.define_watchlist_class(DB)
Watchitem = models.define_watchitem_class(DB, Watchlist)
DB.create_all()

CORS_VAR = CORS(APP, resources={r"/*": {"origins": "*"}})

SOCKETIO = SocketIO(
    APP,
    cors_allowed_origins="*",
    json=json,
    manage_session=False,
)

def get_person_by_email(email):
    '''Retrieve a person from the database'''

    query = Person.query.filter_by(email=email).first()
    return query

def is_person(email):
    '''Returns True is email is in Person, False otherwise'''

    query = get_person_by_email(email)
    if query is None:
        return False
    return True

def add_person(email, username=None):
    '''Inserts new Person into database.
    Makes no assumptions about whether or not the user is in the database already.
    Will create an error if the email is already in the database
    Username is generated with first 3 letters of email and a random number'''

    if username is None:
        username = email[:3] + str(random.randint(0, 1000))

    new_user = Person(email=email, username=username)
    DB.session.add(new_user)
    DB.session.commit()

def get_all_users():
    '''Returns all person from the Database.'''
    all_people = Person.query.all()
    users = []
    for person in all_people:
        users.append(person)
    return users

def is_favorite(email, media):
    '''Checks whether the given media is a favorite for that person.'''

    query = Favorite.query.filter_by(email=email, media=media).first()
    if query is None:
        return False
    return True

def add_favorite(email, media):
    '''Make given media a favorite for the user'''

    new_fav = Favorite(email=email, media=media)
    DB.session.add(new_fav)
    DB.session.commit()

def remove_favorite(email, media):
    '''Unfavorite given media for given user.'''

    Favorite.query.filter_by(email=email, media=media).delete()
    DB.session.commit()

def get_all_favorites(email):
    '''Returns all favorites for that person.'''
    all_fav = Favorite.query.filter_by(email=email).all()
    return all_fav

def add_comment(email, media, message):
    '''Add a comment. Timestamp automatically generated.'''

    new_comment = Comment(email=email, message=message, media=media)
    DB.session.add(new_comment)
    DB.session.commit()

def get_comments_for_media(media):
    '''Get all comments for a media, ordered by time.'''

    return Comment.query.filter_by(media=media).order_by(Comment.timestamp).all()

def is_watchlist(email, list_name):
    ''' Returns whether the user has a list with that name '''

    query = Watchlist.query.filter_by(email=email, listName=list_name).first()
    if query is None:
        return False
    return True

def add_watchlist(email, list_name):
    ''' Creates new watchlist. Makes no assumptions about existing lists '''

    new_list = Watchlist(email=email, listName=list_name)
    DB.session.add(new_list)
    DB.session.commit()

def remove_watchlist(email, list_name):
    '''Remove a watchlist'''
    remove_all_watchitems_from_watchlist(email, list_name)
    Watchlist.query.filter_by(email=email, listName=list_name).delete()
    DB.session.commit()

def get_all_watchlists(email):
    ''' Get all watchlists for a person '''

    all_lists = Watchlist.query.filter_by(email=email).all()
    return all_lists

def is_watchitem_on_watchlist(email, list_name, media):
    ''' Returns whether given item is in the watch list list_name for user '''

    query = Watchitem.query.filter_by(email=email, listName=list_name, media=media).first()
    if query is None:
        return False
    return True

def add_watchitem_to_watchlist(email, list_name, media):
    ''' Add media to watchlist for user '''
    new_item = Watchitem(email=email, listName=list_name, media=media)
    DB.session.add(new_item)
    DB.session.commit()

def remove_watchitem_from_watchlist(email, list_name, media):
    ''' Remove item from watchlist for user '''

    Watchitem.query.filter_by(email=email, listName=list_name, media=media).delete()
    DB.session.commit()

def remove_all_watchitems_from_watchlist(email, list_name):
    ''' Remove all items from a list '''

    Watchitem.query.filter_by(email=email, listName=list_name).delete()
    DB.session.commit()

def get_all_watchitems_on_watchlist(email, list_name):
    ''' Get all watchitems on a watchlist '''

    all_items = Watchitem.query.filter_by(email=email, listName=list_name).all()
    return all_items


@APP.route('/', defaults={"filename": "index.html"})
@APP.route('/<path:filename>')
def index(filename):
    '''Returns index.'''
    return send_from_directory('./build', filename)

@APP.route('/api/v1/test', methods=['GET', 'POST'])
def test_endpoint():
    '''Returns success response'''

    print("Endpoint Reached")
    return {'success': True} # Return success status if it worked

@APP.route('/api/v1/person', methods=['GET', 'POST'])
def endpoint_person():
    '''Endpoint for Person class interactions.'''

    print("----------\nPerson Endpoint Reached")
    print(request)

    if request.method == 'GET':
        # Return a Person's data
        print("Got GET from person")
        email = unquote(request.args.get('email', ''))

        if email != '':
            person = get_person_by_email(email)
            print(person)
            return {
                'email' : person.email,
                'username' : person.username,
                'joinDate': person.joinDate
            }

    elif request.method == 'POST':
        # Notifies server of user log in.
        # Creates new user if needed.
        # Returns success and whether or not the user is new

        print("Got POST from person")
        request_data = request.get_json()
        email = unquote(request_data['email'])
        print(email)

        if is_person(email):
            print("Person already in DB")
            return {'success': True, 'newUser': False}

        print("Person not in DB")
        add_person(email)
        return {'success': True, 'newUser': True}

    return Response("Error: Unknown", status=400)

@APP.route('/api/v1/favorite', methods=['GET', 'POST'])
def endpoint_favorite():
    '''Endpoint for Favorite class interactions.'''

    print("----------\nFavorite Endpoint Reached")
    print(request)

    if request.method == 'GET':
        # Get whether or not the given media is a favorite for the given user.

        print("Got GET from Favorite")
        email = unquote(request.args.get('email', ''))
        media = unquote(request.args.get('media', ''))

        if email == '':
            return Response("Failed to provide email", status=400)

        if media != '':
            return {'isFavorite': is_favorite(email, media)}

        all_favs = get_all_favorites(email)
        name_list = [fav.media for fav in all_favs]
        return {'allFavorites': name_list}

    elif request.method == 'POST':
        # Change whether or not something is favorited

        print("Got POST from Favorite")
        request_data = request.get_json()
        email = unquote(request_data['email'])
        media = unquote(request_data['media'])
        will_be_favorite = request_data['willBeFavorite']

        is_fav = is_favorite(email, media)
        print(will_be_favorite, is_fav, email)

        if will_be_favorite:
            if not is_fav:
                add_favorite(email, media)
                return {'success': True}
        else:
            if is_fav:
                remove_favorite(email, media)
                return {'success': True}

    return Response("Unknown Error", status=400)

@APP.route('/api/v1/comment', methods=['GET', 'POST'])
def endpoint_comment():
    '''Endpoint for Comment class interactions.'''

    print("----------\nComment Endpoint Reached")
    print(request)

    if request.method == 'GET':
        print("Got GET from Comment")
        media = unquote(request.args.get('media', ''))

        if media == '':
            return Response("Media argument empty or invalid", status=400)

        all_comments = get_comments_for_media(media)
        return_list = {"comments": \
        [{'message' : comment.message, "email": comment.email, "timestamp": comment.timestamp}\
        for comment in all_comments]}

        return return_list

    elif request.method == 'POST':
        print("Got POST from Comment")
        request_data = request.get_json()
        email = unquote(request_data['email'])
        media = unquote(request_data['media'])
        message = unquote(request_data['message'])

        add_comment(email, media, message)
        return {'success': True}

    return Response("Unknown Error", status=400)

@APP.route('/api/v1/watchlist', methods=['GET', 'POST'])
def endpoint_watchlist():
    '''Endpoint for Watchlist class interactions.'''

    print("----------\nWatchlist Endpoint Reached")
    print(request)

    if request.method == 'GET':
        # Get existing watchlists for a user
        print("Got GET from Watchlist")
        email = unquote(request.args.get('email', ''))

        if email != '':
            watch_lists = get_all_watchlists(email)
            name_list = {"watchlists": \
            [{"listName": thing.listName, "dateCreated": thing.dateCreated}\
            for thing in watch_lists]}
            return {'watchLists': name_list}

        return Response("Email argument empty or invalid", status=400)

    elif request.method == 'POST':
        # Add or remove a watchlist for a user
        print("Got POST from Watchlist")
        request_data = request.get_json()
        email = unquote(request_data['email'])
        list_name = unquote(request_data['listName'])
        add_or_remove = request_data['addOrRemove'] # if TRUE, add, if FALSE, delete

        if add_or_remove and not is_watchlist(email, list_name):
            add_watchlist(email, list_name)
            print('watchLists', get_all_watchlists(email))
            return {'success': True}
        elif not add_or_remove and is_watchlist(email, list_name):
            remove_watchlist(email, list_name)
            return {'success': True}

        print("POST error")
        return Response(
            "Mismatch between adding/deleting and whether it already exists or not.", status=400)

    return Response("Unknown Error", status=400)

@APP.route('/api/v1/watchitem', methods=['GET', 'POST'])
def endpoint_watchitem():
    ''' Endpoint for Watchitem class interactions '''
    print("----------\nWatchitem Endpoint Reached")
    print(request)

    if request.method == 'GET':
        # Get existing watchitems on a watchlist for a user
        print("Got GET from Watchitem")
        email = unquote(request.args.get('email', ''))
        list_name = unquote(request.args.get('listName', ''))

        if email == '' or list_name == '':
            return Response('Failed to pass a parameter', status=400)

        items = get_all_watchitems_on_watchlist(email, list_name)
        return_item = {"watchItems" : \
        [{'media': item.media, 'dateAdded': item.dateAdded} for item in items]}

        return return_item

    elif request.method == 'POST':
        print("Got POST from Watchitem")
        request_data = request.get_json()
        email = unquote(request_data['email'])
        list_name = unquote(request_data['listName'])
        media = unquote(request_data['media'])
        add_or_remove = request_data['addOrRemove'] # if TRUE, add, if FALSE, delete

        if add_or_remove and not is_watchitem_on_watchlist(email, list_name, media):
            add_watchitem_to_watchlist(email, list_name, media)
            return {'success': True}
        elif not add_or_remove and is_watchitem_on_watchlist(email, list_name, media):
            remove_watchitem_from_watchlist(email, list_name, media)
            return {'success': True}

        print("POST error")
        return Response(
            "Mismatch between adding/deleting and whether it already exists or not.", status=400)

    return Response("Unknown Error", status=400)

if __name__ == "__main__":
    APP.run(
        host=os.getenv('IP', '0.0.0.0'),
        port=8081 if os.getenv('C9_PORT') else int(os.getenv('PORT', 8080)),
    )
