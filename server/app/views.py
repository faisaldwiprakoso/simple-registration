# -*- coding: utf-8 -*-
from django.shortcuts import get_object_or_404
from rest_framework.response import Response
from rest_framework import viewsets
from rest_framework.decorators import action
from rest_framework import status
from rest_framework.filters import OrderingFilter,SearchFilter

from .models import User
from .serializers import UserRegisterSerializer, UserSerializer


class CurrentUserViewSet(viewsets.ModelViewSet):
    """
    Api current user
    """
    serializer_class = UserSerializer
    queryset = User.objects.all()

    def retrieve(self, request, pk=None):
        return Response(serializer_class.data)

class RegisterUserViewSet(viewsets.ModelViewSet):
    """api for register user"""

    authentication_classes = ()
    permission_classes = ()
    serializer_class = UserRegisterSerializer
    queryset = User.objects.all()

    def create(self, request):
        serializer_class = UserRegisterSerializer(data=request.data)
        if serializer_class.is_valid():
            serializer_class .save()
            return Response(serializer_class.data, status=status.HTTP_200_OK)
        print(serializer_class.errors)
        return Response(serializer_class.errors, status=status.HTTP_400_BAD_REQUEST)






