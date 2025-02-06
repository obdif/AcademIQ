from django.urls import path, include
from .views import generateTopic, generateQuestions



urlpatterns = [
    path('', generateTopic, name='generateTopic'),
    # path('generatequestions/', generateQuestions, name='generateQuestions'),

]
