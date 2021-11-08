"""NoCodeBot URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/3.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path
from django.conf.urls import url
# from NoCodeBot.app.views import verify_bot_name
from app import views

urlpatterns = [
    url(r'^admin/', admin.site.urls),
    url(r'^makebot/', views.make_bot),
    url(r'^registerbot/', views.verify_bot_name),
    url(r'^commutebot/', views.communicate_bot),
    url(r'^getbot/', views.get_bot),
    url(r'^updatebot/', views.update_bot),
    url(r'^getfiles/', views.get_db_file),
    url(r'^db_files/', views.db_files),
    url(r'^del_db_files/', views.delete_files),
    url(r'^register/', views.register),
    url(r'^login/', views.login),
    url(r'^botnames/', views.get_bot_names),
    url(r'^getchatlogs/', views.get_chat_logs),
]
