'''Defines classes used in database.'''

def define_user_class(db):
    '''Returns class definition using database instance.'''
    class User(db.Model):
        '''Class for User data model'''
        email = db.Column(db.String(80), primary_key=True)
        username = db.Column(db.String(80))
        joinDate = db.Column(db.String(30))

        def __repr__(self):
            return '<User %r Score {}>'.format(self.score) % self.username

    return User
    
def define_favorite_class(db):
    '''Returns class definition of Favorite model using database instance.'''
    class Favorite(db.Model):
        email = db.Column(db.String(80), db.ForeignKey('User.email'), primary_key=True)
        media = db.Column(db.String(80), primary_key=True)
        
        def __repr__(self):
            return '<Favorite Instance: User %r Media {}>'.format(self.email) % self.media