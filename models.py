'''
Defines classes used in database.
Each function takes the database connection and returns a class.
In the main file, declare each class like:
Person = models.define_person_class(DB) where DB is your database created from SQLAlchemy
'''

from sqlalchemy.sql import func

def define_person_class(database):
    '''Returns class definition using database instance.'''

    class Person(database.Model):
        '''Class for Person data model'''

        email = database.Column(database.String(80), primary_key=True)
        username = database.Column(database.String(80), default="DefaultUsername", unique=True)
        joinDate = database.Column(database.DateTime(timezone=True), default=func.now())

        def __repr__(self):
            return '<Email: {} username: {} joinDate: {}>'.format(
                self.email, self.username, self.joinDate)

    return Person

def define_favorite_class(database):
    '''Returns class definition of Favorite model using database instance.'''

    class Favorite(database.Model):
        '''Class for Favorite data model'''

        email = database.Column(
            database.String, database.ForeignKey('person.email'), primary_key=True)
        media = database.Column(database.String(80), primary_key=True)

        def __repr__(self):
            return '<Favorite Instance: email {} media {}>'.format(self.email, self.media)

    return Favorite

def define_comment_class(database):
    '''Returns class definition of Chat model using database instance.'''

    class Comment(database.Model):
        '''Class for Chat data model'''

        email = database.Column(
            database.String, database.ForeignKey('person.email'), primary_key=True)
        message = database.Column(database.String, nullable=False)
        media = database.Column(database.String(80), nullable=False, primary_key=True)
        timestamp = database.Column(
            database.DateTime(timezone=True), default=func.now(), primary_key=True)

        def __repr__(self):
            return '<Comment Instance: email {} media {} timestamp {}>'.format(
                self.email, self.media, self.timestamp)

    return Comment

def define_watch_class(database):
    ''' Returns class definition of Watch model using database instance.'''

    class Watch(database.Model):
        '''Class for Watch data model'''

        email = database.Column(
            database.String, database.ForeignKey('person.email'), primary_key=True)
        media = database.Column(database.String(80), nullable=False, primary_key=True)
        timeAdded = database.Column(
            database.DateTime(timezone=True), default=func.now())
        season = database.Column(database.Integer, default=0)
        episode = database.Column(database.Integer, default=0)
        hour = database.Column(database.Integer, default=0)
        minute = database.Column(database.Integer, default=0)

        def __repr__(self):
            return '<Watch Instance: email {} media {} timeAdded {}\
            season {} episode {} hour {} minute {}>'.format(
                self.email, self.media, self.timeAdded,
                self.season, self.episode, self.hour, self.minute)

    return Watch
