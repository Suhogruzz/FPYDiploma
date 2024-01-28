import json
from django.contrib.auth import authenticate, login, logout
from django.views.decorators.http import require_POST
from django.views.decorators.csrf import ensure_csrf_cookie
from django.http import JsonResponse


@ensure_csrf_cookie
def get_csrf_token(request):
    return JsonResponse({
        "message": "csrf cookies are ready"
        })

@require_POST
def login_view(request):
    data = json.loads(request.body)
    email = data.get('email')
    password = data.get('password')

    if email is None or password is None:
        return JsonResponse({
            "message": "Пожайлуста, введите логин и пароль"
        }, status=400)

    user = authenticate(email=email, password=password)

    if user is not None:
        login(request, user)

        return JsonResponse({
            "message": "success",
        })
    
    return JsonResponse(
        {
        "message": "Данные введены неверно"
        }, status=400
    )

@require_POST
def logout_view(request):
    logout(request)
    
    return JsonResponse({
        "message": 'logout',
    })


def me_view(request):
    data = request.user

    return JsonResponse({
        "username": data.username,
        "isAdmin": data.is_staff,
    })
