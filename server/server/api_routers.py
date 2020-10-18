# -*- coding: utf-8 -*-
from app.views import RegisterUserViewSet, CurrentUserViewSet
from rest_framework.routers import DefaultRouter

api_router = DefaultRouter()

api_router.register('register', RegisterUserViewSet, basename='register')
api_router.register('current_user', CurrentUserViewSet, basename='current_user')


