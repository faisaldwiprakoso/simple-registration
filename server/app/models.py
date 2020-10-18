from __future__ import unicode_literals

import uuid
from django.utils import timezone

from django.contrib.auth.base_user import AbstractBaseUser
from django.contrib.auth.models import PermissionsMixin
from django.db import models
from django.utils.translation import ugettext_lazy as _

from .managers import UserManager

items = uuid.uuid4
user_id = str(items)


class User(AbstractBaseUser, PermissionsMixin):
    uuid = models.CharField(max_length=100, blank=True, unique=True, default=uuid.uuid4)
    email = models.EmailField(_('email address'), unique=True)
    mobile_number = models.CharField(_('mobile number'),max_length=20, unique=True)
    first_name = models.CharField(_('first name'), blank=False,max_length=255)
    last_name = models.CharField(_('last name'), blank=False,max_length=255)
    gender = models.CharField(_('gender'),max_length=128,blank=True, null=True)
    birthdate = models.DateField(_('birthdate'), blank=True, null=True)
    is_staff = models.BooleanField(_('staff status'), default=True)
    objects = UserManager()

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = []

    class Meta:
        verbose_name = _('user')
        verbose_name_plural = _('users')
