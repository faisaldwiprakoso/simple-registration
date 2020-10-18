from app.models import User
from app.serializers import UserSerializer


def my_jwt_response_handler(token, user=None, request=None):
    user = UserSerializer(user, context={'request': request}).data
    return_user = {
        'uuid': user.get('uuid'),
        'data': {
            'email': user.get('email'),
            'mobile_number': user.get('mobile_number'),
            'first_name': user.get('first_name'),
            'last_name': user.get('last_name'),
            'gender': user.get('gender'),
            'birthdate': user.get('birthdate')
        },
    }
    return {'token': token, 'user': return_user}
