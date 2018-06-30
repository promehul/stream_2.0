from .models import Song
from rest_framework import viewsets
from .serializers import SongSerializer, MessageSerializer
from rest_framework import views, status
from rest_framework.response import Response

class SongViewSet(viewsets.ModelViewSet):
    queryset = Song.objects.get(id=1)
    serializer_class = SongSerializer

class EchoView(views.APIView):
    def post(self, request, *args, **kwargs):
        serializer = MessageSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        return Response(serializer.data, status=status.HTTP_201_CREATED)    
