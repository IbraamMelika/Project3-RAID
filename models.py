from sqlalchemy.sql import func

'''
Defines classes used in database.
Each function takes the database connection and returns a class.
In the main file, declare each class like:
Person = models.define_person_class(DB) where DB is your database created from SQLAlchemy
'''

def define_person_class(db):
    '''Returns class definition using database instance.'''
    class Person(db.Model):
        '''Class for Person data model'''
        email = db.Column(db.String(80), primary_key=True)
        username = db.Column(db.String(80), default="DefaultUsername")
        joinDate = db.Column(db.DateTime(timezone=True), default=func.now())

        def __repr__(self):
            return '<Email: {} username: {} joinDate: {}>'.format(self.email, self.username, self.joinDate)

    return Person
    
def define_favorite_class(db):
    '''Returns class definition of Favorite model using database instance.'''
    class Favorite(db.Model):
        '''Class for Favorite data model'''
        email = db.Column(db.String, db.ForeignKey('person.email'), primary_key=True)
        media = db.Column(db.String(80), primary_key=True)
        
        def __repr__(self):
            return '<Favorite Instance: User %r Media {}>'.format(self.email) % self.media
            
    return Favorite
            
def define_comment_class(db):
    '''Returns class definition of Chat model using database instance.'''
    class Comment(db.Model):
        '''Class for Chat data model'''
        email = db.Column(db.String, db.ForeignKey('person.email'), primary_key=True)
        message = db.Column(db.String, nullable=False)
        media = db.Column(db.String(80), nullable=False)
        timestamp = db.Column(db.DateTime(timezone=True), default=func.now())
        
        def __repr__(self):
            return '<Comment Instance: email {} media {} timestamp {}>'.format(self.email, self.media, self.timestamp)
        
    return Comment