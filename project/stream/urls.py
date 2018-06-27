from django.conf.urls import url,include
from django.contrib import admin
from . import views


urlpatterns = [
        url(r'^$',views.home),
        url(r'^register/$',views.register),
        url(r'^login/$',views.login,{'template_name': 'stream/login.html'},name='login'),
        url(r'^api/users/(?P<username>\w+)/', views.user_detail),
        url(r'^api/users/', views.all_Users),
        url(r'^stream/$',views.check), 
]        

