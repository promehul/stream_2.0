from django.conf.urls import url,include
from django.contrib import admin
from . import views


urlpatterns = [
        url(r'^$',views.home),
        url(r'^register/$',views.register),
        url(r'^login/$',views.login,{'template_name': 'stream/login.html'},name='login'),
 
]        

