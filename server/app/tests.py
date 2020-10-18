import json
from http import HTTPStatus

from django.test import TestCase, RequestFactory
from .models import User

from rest_framework.test import APIClient


class c(TestCase):
    def setUp(self):
        self.factory = RequestFactory()
        self.user = User.objects.create_superuser(
            email='fdw20@mailinator.com',
            password='test123',
        )

    ### Test for CREATE/POST ###
    def test_register(self):
        data = json.dumps({
            "email": "fdw21@mailinator.com",
            "password": "test123",
            "mobile_number": "08144778899",
            "first_name": "fdw",
            "last_name": "tes",
            "gender": "male",
            "birthdate": "1992-04-05",
        })
        client = APIClient()
        response = client.post('/api/v1/register/', data=data, content_type='application/json')
        print(response)
        # Check if you get a 200 back:
        self.assertEqual(response.status_code, HTTPStatus.OK._value_)
        # Check to see if Wishbone was created
        self.assertEqual(response.data['email'], 'fdw21@mailinator.com')
