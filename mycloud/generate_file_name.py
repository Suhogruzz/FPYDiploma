from mycloud.models import file_system


def get_ext(file_name):
    return file_name.split('.')[-1]


def generate_file_name(file_name):
    ext = f".{get_ext(file_name)}"
    result = file_system.get_alternative_name('storage', ext)    
    return result
    