from django.contrib.auth.models import User
from .models import Song
from rest_framework import serializers

class UserSerializer(serializers.HyperlinkedModelSerializer):

    class Meta:
        model = User
        fields = ('username','is_active',)

class SongSerializer(serializers.ModelSerializer):

    class Meta:
        model = Song
        fields = ('url', 'volume', 'duration', 'mute', 'seek', 'play', 'dj')

class MessageSerializer(serializers.Serializer):
    message = serializers.CharField()
