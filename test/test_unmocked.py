import os
import sys
import unittest
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
media='media' 
KEY_INPUT1='KEY_INPUT1'
KEY_INPUT2='KEY_INPUT2'

class RemoveFavroiteTestCase(unittest.TestCase):
    def setUp(self):
        self.success_test_params_is_person = [
            {
                KEY_INPUT: 'naman@stuff.com',
                KEY_EXPECTED: True
            },
            {
                KEY_INPUT: 'newuser@network.com',
                KEY_EXPECTED: True
            },
            {
                KEY_INPUT: 'test@network.com',
                KEY_EXPECTED: True
            },
            {
                KEY_INPUT: 'admin@stuff.com',
                KEY_EXPECTED: False
            },
        ]
        self.success_test_params_get_person_by_email = [
            {
                KEY_INPUT: 'newuser@network.com',
                KEY_EXPECTED: [ 
                    {
                        email: 'newuser@network.com',
                        username: 'DefaultUsername',
                        
                    }
                    ],
            },
            {
                KEY_INPUT: 'test@network.com',
                KEY_EXPECTED: [ 
                    {
                        email: 'newuser@network.com',
                        username: 'DefaultUsername',
                        
                    },
                    {
                        email: 'test@network.com',
                        username: 'tes845',
                        
                    }
                    ],
            },
            {
                KEY_INPUT: 'andre07087@gmail.com',
                KEY_EXPECTED: [ 
                    {
                        email: 'newuser@network.com',
                        username: 'DefaultUsername',
                        
                    },
                    {
                        email: 'test@network.com',
                        username: 'tes845',
                        
                    },
                    {
                        email: 'andre07087@gmail.com',
                        username: 'and114',
                        
                    }
                    ],
            },
            {
                KEY_INPUT: 'naman@stuff.com',
                KEY_EXPECTED: [ 
                    {
                        email: 'newuser@network.com',
                        username: 'DefaultUsername',
                        
                    },
                    {
                        email: 'test@network.com',
                        username: 'tes845',
                        
                    },
                    {
                        email: 'andre07087@gmail.com',
                        username: 'and114',
                        
                    },
                    {
                        email: 'naman@stuff.com',
                        username: 'nam61',
                        
                    }
                    ],
            },
        ]
        self.success_test_params_is_favorite = [
                {
                    KEY_INPUT1: 'naman@stuff.com',
                    KEY_INPUT2: '699600036444411223344',
                    KEY_EXPECTED: False
                },
                {
                    KEY_INPUT1: 'newuser@network.com',
                    KEY_INPUT2: '699600036444411223344',
                    KEY_EXPECTED: False
                },
                {
                    KEY_INPUT1: 'test@network.com',
                    KEY_INPUT2: '699600036444411223344',
                    KEY_EXPECTED: False
                },
                {
                    KEY_INPUT1: 'admin@stuff.com',
                    KEY_INPUT2: '699600036444411223344',
                    KEY_EXPECTED: False
                },
        ]
    
    def testing_is_person(self):
        for test in self.success_test_params_is_person:
            # Calling function to test
            actual_result = app.is_person(test[KEY_INPUT])
            expected_result = test[KEY_EXPECTED]
            # Comparing actual and expected output
            self.assertEqual(actual_result, expected_result)
            self.assertEqual(bool(actual_result), bool(expected_result))
            self.assertIsNotNone(actual_result)

    def testing_get_person_by_email(self):
            for test in self.success_test_params_get_person_by_email:
                # Calling function to test
                actual_result = app.get_person_by_email(test[KEY_INPUT])
                expected_result = test[KEY_EXPECTED]
                # Comparing actual and expected output
                self.assertEqual(actual_result.email, expected_result[-1]['email'])
                self.assertEqual(actual_result.username, expected_result[-1]['username'])
                self.assertNotEqual(actual_result.email, expected_result[-1]['username'])

    def testing_is_favorite(self):
        for test in self.success_test_params_is_favorite:
            # Calling function to test
            actual_result = app.is_favorite(test[KEY_INPUT1], test[KEY_INPUT2])
            expected_result = test[KEY_EXPECTED]
            # Comparing actual and expected output
            self.assertEqual(actual_result, expected_result)
            self.assertEqual(bool(actual_result), bool(expected_result))
            self.assertIsNotNone(actual_result)

if __name__ == '__main__':
    unittest.main()