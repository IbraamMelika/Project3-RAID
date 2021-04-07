'''Defines classes used in database.'''

def define_person_class(db):
    '''Returns class definition using database instance.'''
    class Person(db.Model):
        '''Class for User data model'''
        email = db.Column(db.String(80), primary_key=True)
        username = db.Column(db.String(80))
        joinDate = db.Column(db.String(30))

        def __repr__(self):
            return '<User %r Score {}>'.format(self.score) % self.username

    return Person
    
def define_favorite_class(db):
    '''Returns class definition of Favorite model using database instance.'''
    class Favorite(db.Model):
        email = db.Column(db.String, db.ForeignKey('person.email'), primary_key=True)
        media = db.Column(db.String(80), primary_key=True)
        
        def __repr__(self):
            return '<Favorite Instance: User %r Media {}>'.format(self.email) % self.media
            
    return Favorite
            
def define_chat_class(db):
    
    class Chat(db.Model):
        
        email = db.Column(db.String, db.ForeignKey('person.email'), primary_key=True)
        message = db.Column(db.String)
        media = db.Column(db.String(10000))
        timestamp = db.Column(db.DateTime(), primary_key=True)
        
        def __repr__(self):
            return '<Chat Instance: email {} media {} timestamp {}>'.format(self.email, self.media, self.timestamp)
        
    return Chat