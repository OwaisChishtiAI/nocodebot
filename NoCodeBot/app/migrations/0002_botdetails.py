# Generated by Django 3.2.8 on 2021-10-31 09:45

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('app', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='BotDetails',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('bot_name', models.TextField()),
                ('question', models.TextField()),
                ('question_id', models.TextField()),
                ('answers', models.TextField()),
                ('answers_id', models.TextField()),
                ('question_type', models.TextField()),
                ('media', models.TextField()),
            ],
            options={
                'db_table': 'bot_details',
            },
        ),
    ]
