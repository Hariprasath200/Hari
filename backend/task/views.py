from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import AllowAny,IsAuthenticated
from rest_framework import status
from .serializers import *


class RegisterView(APIView):
    permission_classes=[AllowAny]
    def post(self,request):
        serializer=RegisterSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response({'res':"Registration Successfully"},status=status.HTTP_201_CREATED)
        return Response(serializer.errors,status=status.HTTP_400_BAD_REQUEST)
    

class LoginView(APIView):
    permission_classes=[AllowAny]
    def post(self,request):
        serializer=LoginSerializer(data=request.data)
        if serializer.is_valid()    :
            return Response({"res":"Login Successfully",
                             'accesstoken':serializer.validated_data['accesstoken'],
                             'refreshtoken':serializer.validated_data['refreshtoken'],
                             'user':serializer.validated_data['user']},status=status.HTTP_200_OK)
        return Response(serializer.errors,status=status.HTTP_400_BAD_REQUEST)



#This function Will check if username and subject exists or not, 
# if exists, it will update otherwise it will create new record

class CreateorUpdateView(APIView):
    permission_classes=[AllowAny]
    def post(self,request):
        user=request.user.id
        
        data=request.data.copy()
        data['teacher']=request.user.id
        name=data['name']
        subject=data['subject']
        marks=data['marks']
        try:
            user=Data.objects.get(name=name,subject=subject,teacher=user)
            user.marks=marks
            user.save()
            return Response({"res":"Data Updated Sucessfully"},status=status.HTTP_200_OK)
        except Data.DoesNotExist:
            serializer=DetailSerializer(data=data)
            if serializer.is_valid():
                serializer.save()
                return Response({"res":"Data Created Successfully"},status=status.HTTP_201_CREATED)    
            
            return Response(serializer.errors,status=status.HTTP_400_BAD_REQUEST)
        

class ViewData(APIView):
    permission_classes=[IsAuthenticated]
    def get(self,request):
        user=request.user.id
        data=Data.objects.filter(teacher=user)
        serializer=DetailSerializer(data,many=True)
        if serializer:
            return Response({"res":"Data Fetched Successfully",'data':serializer.data},status=status.HTTP_200_OK)
        return Response(serializer.errors,status=status.HTTP_400_BAD_REQUEST)
    
class DeleteData(APIView):
    permission_classes=[IsAuthenticated]
    def delete(self,request):
        id=request.data
        ids=id.get('id')
        if not id:
            return Response({"error:'Id is Required To Delete Data"},status=status.HTTP_400_BAD_REQUEST)
        try:
            data=Data.objects.get(id=ids,teacher=request.user.id)
            data.delete()
            return Response({"res":"Data Deleted Successfully"},status=status.HTTP_200_OK)
        except Data.DoesNotExist:
            return Response({"error":"Data not Found"},status=status.HTTP_404_NOT_FOUND)
        
class UpdateDataview(APIView):
    permission_classes=[IsAuthenticated]
    def patch(self,request):
        id=request.data.get('id')
        print(id,'ddddddddddddddddddddd')
        data=Data.objects.get(id=id)
        serializer=DetailSerializer(data,data=request.data,partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response({"res":"Updated Successfully"},status=status.HTTP_200_OK)
        return Response(serializer.errors,status=status.HTTP_400_BAD_REQUEST)