from django.shortcuts import render, redirect
from django.contrib.auth.models import User
from django.contrib.auth.forms import UserCreationForm
from django.contrib import messages
from django.contrib.auth import views as auth_views
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
