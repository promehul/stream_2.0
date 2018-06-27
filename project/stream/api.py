from .models import Song
from rest_framework import viewsets
from .serializers import SongSerializer

class SongViewSet(viewsets.ModelViewSet):
    queryset = Song.objects.get(id=1)
    serializer_class = SongSerializer
