from django.db import models
from django.contrib.auth.models import AbstractUser

class Customuser(AbstractUser):
    pass

class Data(models.Model):
    teacher=models.ForeignKey(Customuser,on_delete=models.CASCADE,related_name='teacher')
    name=models.CharField(max_length=150,db_index=True)
    subject=models.CharField(max_length=250,db_index=True)
    marks=models.IntegerField()
    created_at=models.DateTimeField(auto_now_add=True)
    updated_at=models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"The Student Name is {self.name} added by {self.teacher.username} "  