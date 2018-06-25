from django.shortcuts import render, redirect
from django.contrib.auth.models import User
from django.contrib.auth.forms import UserCreationForm
from django.contrib import messages
from django.contrib.auth import views as auth_views
from django.contrib.auth.decorators import login_required


from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from  stream.serializers import UserSerializer
# Create your views here.

def home(request):
    if not request.user.is_authenticated:
        return redirect('login')
    
    return render(request, 'stream/home.html')

def login(request, **kwargs):
    if request.user.is_authenticated:
        return redirect('/')
    else:
        return auth_views.login(request, **kwargs)

def register(request):
    if request.method == 'POST':
        form = UserCreationForm(request.POST)
        if form.is_valid():
            form.save()
            messages.success(request, 'Account created successfully')
            username = form.cleaned_data.get('username')
            user = User.objects.get(username = username)
            user.is_active = False
            user.save()
            return  redirect('/login')

            
    else:
        form = UserCreationForm()
    
    return render(request, 'stream/register.html', {'form': form})

@api_view(['GET'])
def all_Users(request):
    if request.method == 'GET':
        djs = User.objects.all()
        serializer = UserSerializer(djs, many=True)
        return Response(serializer.data)
    
@login_required(login_url='/login')
@api_view(['GET','PUT','DELETE'])
def user_detail(request, username):
    try:
        user = User.objects.get(username = username)
    except User.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)
    
    if request.method == 'GET':
        serializer = UserSerializer(user)
        return Response(serializer.data)
    elif request.method == 'PUT':
        serializer = UserSerializer(user, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    elif request.method == 'DELETE':
        user.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
    else:
        redirect('/')

