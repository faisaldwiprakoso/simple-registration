# Generated by Django 3.1.2 on 2020-10-17 04:11

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('app', '0016_auto_20201017_1104'),
    ]

    operations = [
        migrations.AlterField(
            model_name='user',
            name='birthdate',
            field=models.DateField(blank=True, null=True, verbose_name='birthdate'),
        ),
    ]