from django.conf.urls import url,include
from django.urls import path
from django.contrib import admin
from . import views
from rest_framework.schemas import get_schema_view
from rest_framework_simplejwt.views import (
            TokenObtainPairView,
            TokenRefreshView,
        )

from .api import EchoView
urlpatterns = [
        url(r'^$',views.home),
        url(r'^register/$',views.register),
        url(r'^login/$',views.login,{'template_name': 'stream/login.html'},name='login'),
        path('api/', get_schema_view()),
        url(r'^api/users/(?P<username>\w+)/', views.user_detail),
        url(r'^api/users/', views.all_Users),
        url(r'^api/song', views.song_details),
        url(r'^stream/$',views.check), 
        path('api/auth/', include('rest_framework.urls', namespace='rest_framework')),
        path('api/auth/token/obtain/', TokenObtainPairView.as_view()),
        path('api/auth/token/refresh/', TokenRefreshView.as_view()),
        url(r'api/echo/$', EchoView.as_view()),
]        

