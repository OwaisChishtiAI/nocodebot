from django.db import models

# Create your models here.
class BotNames(models.Model):
    class Meta:
        db_table = "bot_names"

    username = models.TextField()
    bot_name = models.TextField(null=False)

# return (question, question_id, answers, answers_id, question_type, media)
class BotDetails(models.Model):
    class Meta:
        db_table = "bot_details"
    
    bot_name = models.TextField()
    question  = models.TextField()
    question_id  = models.TextField()
    answers  = models.TextField()
    answers_id  = models.TextField()
    question_type  = models.TextField()
    qmedia  = models.TextField()
    amedia  = models.TextField()
    first_question  = models.TextField()

class Login(models.Model):
    class Meta:
        db_table = "login"

    username = models.TextField()
    password = models.TextField()

class ChatLogs(models.Model):
    class Meta:
        db_table = "chat_logs"

    session_id = models.TextField()
    timestamp = models.TextField()
    botname = models.TextField()
    username = models.TextField()
    questions = models.TextField()
    answers = models.TextField()

class DataBaseFiles(models.Model):
    class Meta:
        db_table = "database_files"

    username = models.TextField()
    db_file_name = models.TextField()