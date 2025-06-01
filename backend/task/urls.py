from django.urls import path
from .views import *

urlpatterns = [
    path('register/',RegisterView.as_view(),name='register'),
    path('login/',LoginView.as_view(),name='login'),
    path('createorupdate/',CreateorUpdateView.as_view(),name='createorupdate'),
    path('viewdata/',ViewData.as_view(),name='viewdata'),
    path('deletedata/',DeleteData.as_view(),name='deletedata'),
    path('update/',UpdateDataview.as_view(),name='update')
]
