from django.http.response import FileResponse
from django.shortcuts import render
from django.http import Http404
from rest_framework.views import APIView
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from django.http import JsonResponse, HttpResponse
from django.core import serializers
from django.conf import settings
from django.core.files.storage import default_storage
from app.models import BotNames, BotDetails, Login, ChatLogs, DataBaseFiles
from app.chatbot import ChatBot
from datetime import datetime
import json
import os
import ast

# Create your views here.

@api_view(["POST"])
def make_bot(data):
    bot_data = json.loads(data.body)
    # print(bot_data)
    processed_data = process_details(bot_data)
    # print(processed_data)
    response = json.dumps({'status' : 'botmade'})
    return HttpResponse(response, content_type='application/json')

# question': '', 'question_id': '', 'answers': [''], 'answers_id': [''], 'question_type': 'sq', 'media': ''
def process_details(data):
    question, question_id, answers, answers_id, question_type, qmedia, amedia = [], [], [], [], [], [], []
    for each in data['details']:
        question.append(each['question'])
        question_id.append(each['question_id'])
        answers.append(each['answers'])
        answers_id.append(each['answers_id'])
        question_type.append(each['question_type'])
        qmedia.append(each['qmedia'])
        amedia.append(each['amedia'])

    BotDetails.objects.create(bot_name=data['botname'],\
        question=question,question_id=question_id,\
            answers=answers,answers_id=answers_id,
            question_type=question_type, qmedia=qmedia, amedia=amedia,\
                first_question=data['first_question'])

    return (question, question_id, answers, answers_id, question_type, qmedia, amedia, data['botname'])

@api_view(["POST"])
def update_bot(data):
    bot_data = json.loads(data.body)
    print(bot_data)
    processed_data = update_details(bot_data)
    print(processed_data)
    response = json.dumps({'status' : 'botmade'})
    return HttpResponse(response, content_type='application/json')

# question': '', 'question_id': '', 'answers': [''], 'answers_id': [''], 'question_type': 'sq', 'media': ''
def update_details(data):
    question, question_id, answers, answers_id, question_type, qmedia, amedia = [], [], [], [], [], [], []
    for each in data['details']:
        question.append(each['question'])
        question_id.append(each['question_id'])
        answers.append(each['answers'])
        answers_id.append(each['answers_id'])
        question_type.append(each['question_type'])
        qmedia.append(each['qmedia'])
        amedia.append(each['amedia'])

    BotDetails.objects.filter(bot_name=data['botname']).update(question=question,question_id=question_id,\
            answers=answers,answers_id=answers_id,
            question_type=question_type, qmedia=qmedia, amedia=amedia)

    return (question, question_id, answers, answers_id, question_type, qmedia, amedia, data['botname'])

@api_view(['POST'])
def verify_bot_name(bot_name):
    name = json.loads(bot_name.body)['botname']
    username = json.loads(bot_name.body)['username']
    print("verify_bot_name input: ", name)
    in_db = list(BotNames.objects.filter(bot_name=name))
    # print("DB EXISTS NAME: ", in_db[0].username)
    if not in_db:
        BotNames.objects.create(bot_name=name, username=username)
    # else:
    #     in_db = [x.bot_name for x in in_db]
    # in_db = 0 if in_db else 1
    if in_db:
        if in_db[0].username != username:
            res = 2
        else:
            res = 0
    else:
        res = 1
    
    response = json.dumps({'status' : res})
    return HttpResponse(response, content_type='application/json')

THIS_CHATBOT = None
@api_view(['POST'])
def communicate_bot(query):
    global THIS_CHATBOT
    query = json.loads(query.body)
    botname = query['botname']
    ask = query['ask']

    if THIS_CHATBOT == None:
        chatbot = ChatBot(botname)
        THIS_CHATBOT = chatbot
    
    if not ask:
        print("[INFO] Processing first time")
        chatbot = ChatBot(botname)
        THIS_CHATBOT = chatbot
        question = THIS_CHATBOT.first_question()
        create_log(query['session_id'], question["new_question"], [], botname, query['username'])
    else:
        print("[INFO] Processing not first time")
        if ask == "second":
            print("[INFO] Processing second time")
            question = THIS_CHATBOT.second_question()
            update_log(query['session_id'], question['new_question'][0], query['ask_orig'], botname, query['username'])
        else:
            print("[INFO] Processing Answer ", ask)
            question = THIS_CHATBOT.talk(ask)
            update_log(query['session_id'], question['new_question'][0], ask, botname, query['username'])
        

    response = json.dumps(question)
    return HttpResponse(response, content_type='application/json')

def create_log(session_id, q, a, botname, username):
    ChatLogs.objects.create(session_id=session_id, timestamp=str(datetime.now()), questions=json.dumps([q]), answers=json.dumps(a),\
        botname=botname, username=username)

def update_log(session_id, q, a, botname, username):
    logs = ChatLogs.objects.filter(session_id=session_id).values()[0]
    questions, answers = ast.literal_eval(logs['questions']), ast.literal_eval(logs['answers'])
    questions.append(q)
    answers.append(a)
    ChatLogs.objects.filter(session_id=session_id).update(questions=json.dumps(questions), answers=json.dumps(answers))

@api_view(['POST'])
def get_chat_logs(botname):
    logs = ChatLogs.objects.filter(botname=json.loads(botname.body)['botname'])
    if logs:
        print("[INFO] Logs Found")
        logs_li = []
        for each in logs.values():
            logs_li.append({'timestamp' : each['timestamp'], "questions" : ast.literal_eval(each['questions']),\
                "answers" : ast.literal_eval(each['answers'])})

    else:
        print("[INFO] Logs Not Found")
        logs_li = 404
    
    response = json.dumps(logs_li)
    return HttpResponse(response, content_type='application/json')

@api_view(['POST'])
def get_bot(botname):
    name = json.loads(botname.body)['botname']
    bot_data = ChatBot(name).get_bot_details()

    response = json.dumps(bot_data)
    return HttpResponse(response, content_type='application/json')

@api_view(['POST'])
def get_db_file(request):
    file = request.FILES['file']
    username = request.POST.get('username')
    print("#########", username)
    DataBaseFiles.objects.create(username=username, db_file_name=file.name)
    default_storage.save("db_files/"+file.name, file)

    response = json.dumps({"bot_data":""})
    return HttpResponse(response, content_type='application/json')

@api_view(['POST'])
def db_files(username):
    username = json.loads(username.body)['username']
    file_names = DataBaseFiles.objects.filter(username=username)
    if file_names:
        file_names = file_names.values()
        file_names = [x['db_file_name'] for x in file_names]

    # files = os.listdir('db_files')
    print("Files: ", file_names)
    response = json.dumps({"files":file_names})
    return HttpResponse(response, content_type='application/json')

@api_view(['POST'])
def delete_files(filename):
    print(filename)
    name = json.loads(filename.body)['filename']
    print("DEL Files: ", name)
    os.remove("db_files/"+name)
    response = json.dumps({"files":"deleted"})
    return HttpResponse(response, content_type='application/json')

@api_view(['POST'])
def register(data):
    username = json.loads(data.body)['username']
    password = json.loads(data.body)['password']
    Login.objects.create(username=username, password=password)
    response = json.dumps({"register":"success"})
    return HttpResponse(response, content_type='application/json')

@api_view(['POST'])
def login(data):
    username = json.loads(data.body)['username']
    password = json.loads(data.body)['password']
    login = Login.objects.filter(username=username, password=password)
    if login:
        response = json.dumps({"login":"success"})
    else:
        response = json.dumps({"login":"failed"})
    return HttpResponse(response, content_type='application/json')

@api_view(['POST'])
def get_bot_names(username):
    username = json.loads(username.body)['username']
    bot_names = list(BotNames.objects.values_list('bot_name', flat=True).filter(username=username))
    response = json.dumps({"bot_names":bot_names})
    return HttpResponse(response, content_type='application/json')