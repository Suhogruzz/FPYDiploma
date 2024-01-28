from rest_framework import serializers


def patchValidator(data):

    if 'id' not in data:
        raise serializers.ValidationError({
            'message': 'no id parameter provided',
        })

    if 'native_file_name' not in data:
        raise serializers.ValidationError({
            'message': 'no native_file_name parameter provided',
        })

    if 'comment' not in data:
        raise serializers.ValidationError({
            'message': 'no comment parameter provided',
        })
    
    return data