from django.shortcuts import render
from django.http import Http404
from rest_framework.views import APIView
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from django.http import JsonResponse, HttpResponse
from django.core import serializers
from django.conf import settings
import json

# Create your views here.

@api_view(["POST"])
def make_bot(data):
    bot_data = json.loads(data.body)
    print(bot_data)
    response = json.dumps({'status' : 'botmade'})
    return HttpResponse(response, content_type='application/json')