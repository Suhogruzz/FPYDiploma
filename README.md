# MyCloud

Задание для дипломного проекта по профессии "Fullstack-разработчик на Python".\
Представляет из себя облачное хранилище на базе Django и React.
## На время проверки проект выложен на облачном сервисе reg.ru по адресу:
(<http://89.104.66.176:8000>)

# Локальная установка проекта

Перед установкой проекта необходимо установить PostgreSQL\
(<https://www.postgresql.org/download/>)\
И создать пустую базу данных.

Установка проекта:

1) Сделайте клон репозитория с проектом
```
git clone https://github.com/Suhogruzz/FPYDiploma.git
```
2) В папке проекта создайте виртуальное окружение Python и установите необходимые зависимости их файла 

```
python -m venv venv
```
Для Linux
```
source venv/bin/activate
```
Для Windows
```
venv\Scripts\activate.bat
```
```
pip install -r requirements.txt
```

3) Заполните все поля файла .template_env, после чего переименуйте его в .env

4) Выполните миграции 
```
python manage.py migrate
```
5) Создайте суперпользователя 
```
python manage.py createsuperuser
```

6) Перейдите в директорию (<frontend/>)(*Для удобства эти и дальнейшие действия с фронтендом проще делать в отдельном терминале*)
```
cd frontend
```
7) Установите необходимые зависимости
```
npm install
```
8) В переменной `BASE_URL` файла (<frontend\src\api\requests.js>) необходимо записать URL, куда будут направляться запросы на сервер (для локальной установки `http://127.0.0.1:8000/api/`)

9) Запустите скрипт для сборки
```
npm run dev
```

10) Из корневой папки (`cd ../`) запустите сервер
```
python manage.py runserver
```

# Структура 
* mycloud/ - серверная часть проекта(Django Rest Framework)
* frontend/ - клиентская часть проекта(React)

# Регистрация и авторизация

Открыть форму регистрации с главной страницы можно через кнопку *Зарегистрироваться* либо через кнопку *Попробовать*.\
Открыть форму авторизации можно через кнопку *Войти*, либо она откроется автоматически после регистации нового пользователя.\
Для выхода из диска необходимо навести на свой никнейм в шапке сайта и нажать *Выйти*

## Авторизация и вход в панель администратора

Аккаунт администратора создавался в предыдущих шагах с помощью `python manage.py createsuperuser`, для входа в панель администратора необходимо войти через обычную форму авторизации, после чего раздел (<http://mycloud/admin/>) станет доступен.

# Управление облачным диском

Загрузка файла на диск - Кнопка*Загрузить* и подтверждение кнопкой с рисунком облака.\

## Действия с файлом

Для взаимодействия с файлом необходимо на него нажать. Файл будет выделен и появится меню управления.

* Переименовать файл - кнопка *Переименовать* откроет форму для ввода нового имени

* Изменить комментарий - кнопка *Изм.комментарий* откроет форму для изменения и удаления комемнтария

* Скачать файл - кнопка *Скачать* начнет скачивание файла

* Создать ссылку на скачивание - кнопка *Создать ссылку* откроет форму с ссылкой на скачивание, нажатие на ссылку выделит и скопирует ее в буфер обмена

* Удалить - кнопка *Удалить* сотрет файл с хранилища

