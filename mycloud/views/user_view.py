from django.http import JsonResponse
from django.db.models import Sum, Count
from rest_framework import status
from rest_framework.response import Response
from rest_framework.generics import CreateAPIView
from rest_framework.permissions import AllowAny, IsAdminUser
from rest_framework.decorators import api_view, permission_classes
from rest_framework.decorators import api_view

from mycloud.models import User
from mycloud.serializers.user_serializer import RegisterUserSerializer


class RegisterUserView(CreateAPIView):
    queryset = User.objects.all()

    serializer_class = RegisterUserSerializer

    permission_classes = [AllowAny]

    def post(self, request):
        serializer = RegisterUserSerializer(data = request.data)

        data = {}

        if serializer.is_valid():
            serializer.save()

            data['response'] = True

            return Response(data, status=status.HTTP_200_OK)
        
        else:
            data = serializer.errors

            return Response(data, status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET'])
@permission_classes([IsAdminUser])
def get_detail_user_list(request):
    result = User.objects.annotate(size=Sum('filemodel__size'), count=Count('filemodel__id')).values(
        'id', 'username', 'first_name', 'last_name', 'email', 'count', 'size', 'is_staff')

    if result:
        return Response(result, status=status.HTTP_200_OK)

    return Response(status=status.HTTP_404_NOT_FOUND)


@api_view(['DELETE'])
@permission_classes([IsAdminUser])
def delete_user(request, user_id):
    user = User.objects.get(id=user_id)

    if user:
        user.delete()

        return JsonResponse({
            "message": "success",
        })
    
    return JsonResponse({
        "message": 'Пользователь не найден',
    }, status=404)
