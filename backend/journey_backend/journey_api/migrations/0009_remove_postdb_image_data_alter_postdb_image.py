# Generated by Django 4.1.7 on 2023-04-09 12:12

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('journey_api', '0008_postdb_image'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='postdb',
            name='image_data',
        ),
        migrations.AlterField(
            model_name='postdb',
            name='image',
            field=models.ImageField(upload_to='uploadPhotos'),
        ),
    ]
