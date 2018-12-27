from django.db import models

# Create your models here.

class Song(models.Model):
    url = models.CharField(max_length=500)
    volume = models.IntegerField()
    duration = models.CharField(max_length=30)
    seek = models.CharField(max_length=30)
    play = models.BooleanField(default=True)
    mute = models.BooleanField(default=False)
    dj = models.CharField(max_length=30) 
