from django.db import models
from django.contrib.auth.models import BaseUserManager, AbstractBaseUser, PermissionsMixin
from django.core.files.storage import FileSystemStorage


file_system = FileSystemStorage(location='storage')


class UserManager(BaseUserManager):
    def _create_user(self, email, username, password, **extra_fields):
        if not email:
            raise ValueError('Укажите электронную почту')

        if not username:
            raise ValueError('Укажите имя пользователя')

        user = self.model(
            email = self.normalize_email(email),
            username = username,
            **extra_fields,
        )

        user.set_password(password)

        user.save(using=self._db)

        return user
    
    def create_user(self, email, username, password):
        return self._create_user(email, username, password)

    def create_superuser(self, email, username, password):
        return self._create_user(email, username, password, is_staff=True, is_superuser=True)


class User(AbstractBaseUser, PermissionsMixin):
    id = models.AutoField(primary_key=True, unique=True)
    username = models.CharField(max_length=50, unique=True)
    email = models.EmailField(max_length=100, unique=True)
    first_name = models.CharField(max_length=50, blank=True)
    last_name = models.CharField(max_length=50, blank=True)
    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False)

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['username']

    objects = UserManager()

    def __str__(self):
        return self.email


class FileModel(models.Model):
    id = models.AutoField(primary_key=True, unique=True)
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    storage_file_name = models.CharField(unique=True, max_length=50)
    native_file_name = models.CharField(max_length=50)
    size = models.IntegerField(null=True)
    upload_date = models.DateField(auto_now_add=True, null=True)
    last_download_date = models.DateField(null=True)
    comment = models.TextField(max_length=100, null=True, blank=True)
    public_download_id = models.CharField(unique=True, max_length=50)
    file = models.FileField(storage=file_system, blank=True)
    