from django.core.files import File
from rest_framework import serializers

from mycloud.models import FileModel, User
from mycloud.generate_file_name import generate_file_name
from mycloud.download_link import generate_download_link
from mycloud.validators import patchValidator


class FileSerializer(serializers.ModelSerializer):

    file = serializers.FileField(allow_empty_file=True, required=False)

    class Meta:
        model = FileModel
        fields = ['file', 'comment']

    def create(self, **kwargs):

        file = File(self.validated_data['file'])

        native_file_name = file.name

        file.name = generate_file_name(file.name)

        user = User.objects.filter(id=kwargs['user_id']).first()

        data = {
            'user': user,
            'storage_file_name': file.name,
            'native_file_name': native_file_name,
            'size': file.size,
            'comment': self.validated_data['comment'],
            'public_download_id': generate_download_link(20),
            'file': file,
        }
        
        try:
            file_model = FileModel.objects.create(**data)

            return file_model

        except Exception as e:
            error = {
                'message': ', '.join(e.args) if len(e.args) > 0 else 'Unknown Error'
            }
            
            raise serializers.ValidationError(error)


    def patch(self, **kwargs):

        validated_data = patchValidator(self.initial_data)

        if kwargs['user'].is_staff:
            file = FileModel.objects.filter(id=validated_data['id']).first()
        else:
            file = FileModel.objects.filter(user_id=kwargs['user'].id).filter(id=validated_data['id']).first()

        if file:
            file.native_file_name = validated_data['native_file_name']
            file.comment = validated_data['comment']

            return file.save()