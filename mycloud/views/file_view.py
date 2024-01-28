from django.http import FileResponse
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from datetime import date

from mycloud.serializers.files_serializer import FileSerializer
from mycloud.models import FileModel, file_system


class FileView(APIView):

    permission_classes = [IsAuthenticated]

    def get_queryset(self, user_id=None):

        if self.request.user.is_staff and user_id:
            return FileModel.objects.filter(user=user_id).all()

        return FileModel.objects.filter(user=self.request.user.id).all()

    def get(self, request):

        if 'id' not in request.query_params:
            user_id = None

            if 'user_id' in request.query_params:
                user_id = request.query_params['user_id']

            files = self.get_queryset(user_id).values('id', 'user__username', 'size', 'native_file_name', 'upload_date', 'last_download_date', 'comment')
            return Response(files)
        
        file = self.get_queryset().filter(id = request.query_params['id']).first()

        if file:
            file.last_download_date = date.today()
            file.save()
            return FileResponse(file.file, status.HTTP_200_OK, as_attachment=True)

        data = {
                'message': 'Файл не найден',
            }
        
        return Response(data, status=status.HTTP_404_NOT_FOUND)
    
    def post(self, request):
        serializer = FileSerializer(data=request.data)

        data = {}

        if serializer.is_valid():
            serializer.create(user_id=request.user.id, file=request.FILES['file'])

            data = self.get_queryset().values('id', 'user__username', 'size', 'native_file_name', 'upload_date', 'last_download_date', 'comment')
            
            return Response(data, status=status.HTTP_200_OK) 

        data = serializer.errors

        return Response(data)

    def patch(self, request):
        serializer = FileSerializer(data=request.data)

        data = {}

        if serializer.is_valid():
            user = request.user

            serializer.patch(
                user=user,
            )

            if 'user_storage_id' in request.query_params and user.is_staff:
                data = self.get_queryset(
                    user_id=request.query_params['user_storage_id']
                ).values(
                    'id',
                    'user__username',
                    'size',
                    'native_file_name',
                    'upload_date',
                    'last_download_date',
                    'comment',
                )
            else:
                data = self.get_queryset().values(
                    'id',
                    'user__username',
                    'size',
                    'native_file_name',
                    'upload_date',
                    'last_download_date',
                    'comment'
                )

            return Response(data)

        data = serializer.errors
        
        return Response(data)

    def delete(self, request):
        if request.user.is_staff:
            deleted_file = FileModel.objects.filter(
                id=int(request.query_params['id'])
            ).first()
        else:
            deleted_file = FileModel.objects.filter(
                user_id=request.user.id
            ).all().filter(
                id=int(request.query_params['id'])
            ).first()

        if deleted_file:
            file_system.delete(deleted_file.storage_file_name)

            deleted_file.delete()

            user = request.user

            if 'user_storage_id' in request.query_params and user.is_staff:
                data = self.get_queryset(
                    user_id=request.query_params['user_storage_id']
                ).values(
                    'id',
                    'user__username',
                    'size', 'native_file_name',
                    'upload_date', 'last_download_date',
                    'comment',
                )
            else:
                data = self.get_queryset().values(
                    'id',
                    'user__username',
                    'size', 'native_file_name',
                    'upload_date',
                    'last_download_date',
                    'comment',
                )
       
            return Response(data, status.HTTP_200_OK)

        data = {
            'message': 'Файл не найден',
        }
        
        return Response(data, status.HTTP_404_NOT_FOUND)