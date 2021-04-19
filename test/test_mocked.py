import os
import sys
import unittest
import unittest.mock as mock
from unittest.mock import patch
from flask import Flask
from flask_sqlalchemy import SQLAlchemy

sys.path.append(os.path.abspath('../'))
import models
import app

username = "username"
email = "email"
KEY_INPUT = "input"
KEY_EXPECTED = "expected"
INITIAL_EMAIL = 'user1@stuff.com'

class AddPersonTestCase(unittest.TestCase):
    def setUp(self):
        self.success_test_params = [
            {
                KEY_INPUT: 'naman@stuff.com',
                KEY_EXPECTED: [ 
                    {
                        email: INITIAL_EMAIL,
                        username: 'use200',
                        
                    },
                    {
                        email: 'naman@stuff.com',
                        username: 'nam200',
                        
                    }
                    ],
            },
            {
                KEY_INPUT: 'ranfis@stuff.com',
                KEY_EXPECTED: [ 
                    {
                        email: INITIAL_EMAIL,
                        username: 'use200',
                        
                    },
                    {
                        email: 'naman@stuff.com',
                        username: 'nam200',
                        
                    },
                    {
                        email: 'ranfis@stuff.com',
                        username: 'ran200',
                        
                    },
                    ],
            },
            {
                KEY_INPUT: 'Dre@stuff.com',
                KEY_EXPECTED: [ 
                    {
                        email: INITIAL_EMAIL,
                        username: 'use200',
                        
                    },
                    {
                        email: 'naman@stuff.com',
                        username: 'nam200',
                        
                    },
                    {
                        email: 'ranfis@stuff.com',
                        username: 'ran200',
                        
                    },
                    {
                        email: 'Dre@stuff.com',
                        username: 'Dre200',
                        
                    },
                    ],
            },
            {
                KEY_INPUT: 'Ibrahim@stuff.com',
                KEY_EXPECTED: [ 
                    {
                        email: INITIAL_EMAIL,
                        username: 'use200',
                        
                    },
                    {
                        email: 'naman@stuff.com',
                        username: 'nam200',
                        
                    },
                    {
                        email: 'ranfis@stuff.com',
                        username: 'ran200',
                        
                    },
                    {
                        email: 'Dre@stuff.com',
                        username: 'Dre200',
                        
                    },
                    {
                        email: 'Ibrahim@stuff.com',
                        username: 'Ibr200',
                        
                    },
                    ],
            },
        ]
        '''Setup variables'''
        self.app = Flask(__name__, static_folder='./build/static')
        self.app.config['SQLALCHEMY_DATABASE_URI'] = os.getenv('DATABASE_URL')
        # Gets rid of a warning
        self.app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
        self.database = SQLAlchemy(self.app)
        self.Person = models.define_person_class(self.database)

        initial_person = self.Person(email=INITIAL_EMAIL, username='{0}200'.format(INITIAL_EMAIL[:3]), joinDate='2021-04-17 14:49:00.304388+00')
        self.initial_db_mock = [initial_person]

    def mocked_db_add_person(self, email):
        self.initial_db_mock.append(email)

    def mocked_db_session_commit(self):
        pass

    def mocked_person_query_all(self):
        return self.initial_db_mock

    def rand_number(self, a, b):
        return 200

    def test_success(self):
        for test in self.success_test_params:
            with mock.patch('random.randint', self.rand_number):
                with patch('app.DB.session.add', self.mocked_db_add_person):
                    with patch('app.DB.session.commit', self.mocked_db_session_commit):
                        with patch('app.Person.query') as mocked_query:
                            mocked_query.all = self.mocked_person_query_all
                            # Calling function to test
                            actual_result = app.add_person(test[KEY_INPUT])
                            expected_result = test[KEY_EXPECTED]
                            # Comparing actual and expected output
                            self.assertEqual(len(actual_result[-1].username), len(expected_result[-1]['username']))
                            self.assertEqual(actual_result[-1].username, expected_result[-1]['username'])
                            self.assertEqual(actual_result[-1].email, expected_result[-1]['email'])

media='media' 
KEY_INPUT1='KEY_INPUT1'
KEY_INPUT2='KEY_INPUT2'
class AddFavroiteTestCase(unittest.TestCase):
    def setUp(self):
        self.success_test_params = [
            {
                KEY_INPUT1: 'naman@stuff.com',
                KEY_INPUT2: '69444',
                KEY_EXPECTED: [ 
                    {
                        email: INITIAL_EMAIL,
                        media: '153444',
                    },
                    {
                        email: 'naman@stuff.com',
                        media: [ '5414314351', '69444',],
                    },
                ],
            },
            {
                KEY_INPUT1: 'akul@stuff.com',
                KEY_INPUT2: '78666',
                KEY_EXPECTED: [ 
                    {
                        email: INITIAL_EMAIL,
                        media: '153444',
                    },
                    {
                        email: 'naman@stuff.com',
                        media: [ '5414314351', '69444',],
                    },
                    {
                        email: 'akul@stuff.com',
                        media: [ '33356486', '00000', '78666'],
                    },
                ],
            },
            {
                KEY_INPUT1: 'jod@stuff.com',
                KEY_INPUT2: '1111',
                KEY_EXPECTED: [ 
                    {
                        email: INITIAL_EMAIL,
                        media: '153444',
                    },
                    {
                        email: 'naman@stuff.com',
                        media: [ '5414314351', '69444',],
                    },
                    {
                        email: 'akul@stuff.com',
                        media: [ '33356486', '00000', '78666'],
                    },
                    {
                        email: 'jod@stuff.com',
                        media: [ '1111'],
                    },
                ],
            },
            {
                KEY_INPUT1: 'beg4mercy@stuff.com',
                KEY_INPUT2: '69069',
                KEY_EXPECTED: [ 
                    {
                        email: INITIAL_EMAIL,
                        media: '153444',
                    },
                    {
                        email: 'naman@stuff.com',
                        media: [ '5414314351', '69444',],
                    },
                    {
                        email: 'akul@stuff.com',
                        media: [ '33356486', '00000', '78666'],
                    },
                    {
                        email: 'jod@stuff.com',
                        media: [ '1111'],
                    },
                    {
                        email: 'beg4mercy@stuff.com',
                        media: [ '1111', '69069'],
                    },
                ],
            },
        ]
        '''Setup variables'''
        self.app = Flask(__name__, static_folder='./build/static')
        self.app.config['SQLALCHEMY_DATABASE_URI'] = os.getenv('DATABASE_URL')
        # Gets rid of a warning
        self.app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
        self.database = SQLAlchemy(self.app)
        self.Favorite = models.define_favorite_class(self.database)
        initial_movie = self.Favorite(email=INITIAL_EMAIL, media='153444')
        self.initial_db_mock = [initial_movie]

    def mocked_db_add_favorite(self, email):
        self.initial_db_mock.append(email)

    def mocked_db_session_commit(self):
        pass

    def mocked_get_all_favorites(self):
        return self.initial_db_mock

    def test_success(self):
        for test in self.success_test_params:
            with patch('app.DB.session.add', self.mocked_db_add_favorite):
                with patch('app.DB.session.commit', self.mocked_db_session_commit):
                    with patch('app.Favorite.query') as mocked_query:
                        mocked_query.filter_by(email = 'user1@stuff.com').all = self.mocked_get_all_favorites
                        # Calling function to test
                        actual_result = app.add_favorite(test[KEY_INPUT1], test[KEY_INPUT2])
                        expected_result = test[KEY_EXPECTED]
                        #Comparing actual and expected output
                        self.assertEqual(len(actual_result[-1].media), len(expected_result[-1]['media'][-1]))
                        self.assertEqual(actual_result[-1].media, expected_result[-1]['media'][-1])
                        self.assertEqual(actual_result[-1].media, expected_result[-1]['media'][-1])

class RemoveFavroiteTestCase(unittest.TestCase):
    def setUp(self):
        self.success_test_params = [
            {
                KEY_INPUT1: 'naman@stuff.com',
                KEY_INPUT2: 69444,
                KEY_EXPECTED: {'naman@stuff.com' : [10,20,30],'C2@stuff.com' : [20,30,40, 69444]},
            },
            {
                KEY_INPUT1: 'Akul@stuff.com',
                KEY_INPUT2: 0000,
                KEY_EXPECTED: {'naman@stuff.com' : [10,20,30],'C2@stuff.com' : [20,30,40, 69444], 'Akul@stuff.com': [ 1111, 3464]},
            },
            {
                KEY_INPUT1: 'C2@stuff.com',
                KEY_INPUT2: 20,
                KEY_EXPECTED: {'naman@stuff.com' : [10,20,30],'C2@stuff.com' : [ 30, 40, 69444], 'Akul@stuff.com': [ 1111, 3464]},
            },
            {
                KEY_INPUT1: 'zz@stuff.com',
                KEY_INPUT2: 546321,
                KEY_EXPECTED: {'naman@stuff.com' : [10,20,30],'C2@stuff.com' : [ 30, 40, 69444], 'Akul@stuff.com': [ 1111, 3464], 'zz@stuff.com':[29999, 465046, 321303]},
            },
        ]
        '''Setup variables'''
        self.app = Flask(__name__, static_folder='./build/static')
        self.app.config['SQLALCHEMY_DATABASE_URI'] = os.getenv('DATABASE_URL')
        # Gets rid of a warning
        self.app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
        self.database = SQLAlchemy(self.app)
        self.Favorite = models.define_favorite_class(self.database)

        # initial_movie = self.Favorite(email=INITIAL_EMAIL, media='153444')
        # initial_movie2 = self.Favorite(email=INITIAL_EMAIL, media='69')
        self.initial_db_mock = {'naman@stuff.com' : [10,20,30, 69444],'C2@stuff.com' : [20,30,40,69444], 'Akul@stuff.com': [0000,1111,3464], 'zz@stuff.com':[29999, 546321, 465046, 321303]}

    def mocked_db_remove_favorite(self, email, media):
        self.initial_db_mock[email].remove(int(media))

    def mocked_db_session_commit(self):
        pass

    def mocked_get_all_favorites(self):
        # print(self.initial_db_mock[email])
        return self.initial_db_mock

    def test_success(self):
        for test in self.success_test_params:
            # with patch('app.DB.session.add', self.mocked_db_add_favorite):
            with patch('app.Favorite.query') as mocked_query:
                mocked_query.filter_by(email=email, media=media).delete = self.mocked_db_remove_favorite(test[KEY_INPUT1], test[KEY_INPUT2])
                with patch('app.DB.session.commit', self.mocked_db_session_commit):
                        with patch('app.Favorite.query') as mocked_query2:
                            mocked_query2.filter_by(email=email).all = self.mocked_get_all_favorites
                            # Calling function to test
                            actual_result = app.remove_favorite(test[KEY_INPUT1], test[KEY_INPUT2])
                            expected_result = test[KEY_EXPECTED]
                            #Comparing actual and expected output
                            self.assertEqual(len(actual_result[test[KEY_INPUT1]]), len(expected_result[test[KEY_INPUT1]]))
                            self.assertEqual(actual_result[test[KEY_INPUT1]], expected_result[test[KEY_INPUT1]])
                            self.assertEqual(actual_result[test[KEY_INPUT1]][-1], expected_result[test[KEY_INPUT1]][-1])


if __name__ == '__main__':
    unittest.main()
