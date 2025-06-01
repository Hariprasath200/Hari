from rest_framework import serializers
from django.contrib.auth import get_user_model
from rest_framework_simplejwt.tokens import RefreshToken
from .models import *
from django.contrib.auth.password_validation import validate_password

User=get_user_model()


#This Function for Registration Serializer
class RegisterSerializer(serializers.ModelSerializer):
    password=serializers.CharField(write_only=True,validators=[validate_password])
    class Meta:
        model=User
        fields=['username','password','email']

    def validate(self,data):
        username=data.get('username')
        if User.objects.filter(username=username).exists():
            raise serializers.ValidationError("Username Alread Exists")
        return data
    
    def create(self,validated_data):
        user=User.objects.create_user(
            username=validated_data['username'],
            password=validated_data['password'],
            email=validated_data['email'],

        )
        return user
    




#This Function for Login Serializer
class LoginSerializer(serializers.Serializer):
    username=serializers.CharField()
    password=serializers.CharField(write_only=True)
    class Meta:
        model=User
        fields=['username','password']
    
    def validate(self,data):
        username=data.get('username')
        password=data.get('password')

        try:
            user=User.objects.get(username=username)
        except User.DoesNotExist:
            raise serializers.ValidationError('Invalid Username')
        
        if not user.check_password(password):
            raise serializers.ValidationError('Password Mismatch')
        
        refresh=RefreshToken.for_user(user)
        access_token=str(refresh.access_token)

        data['accesstoken']=access_token
        data['refreshtoken']=str(refresh)
        data['user']=user.id
        
        return data
    



#This Function for Create data Serializer

class DetailSerializer(serializers.ModelSerializer):
    class Meta:
        model=Data
        fields='__all__'
    
    def create(self,validated_data):
        data=Data.objects.create(
            teacher=validated_data.get('teacher'),
            name=validated_data.get('name'),
            subject=validated_data.get('subject'),
            marks=validated_data.get('marks')
        )
        return data