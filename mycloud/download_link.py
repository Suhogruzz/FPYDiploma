import string
import random


def generate_download_link(l):
    return get_random_string(l)

def get_random_string(l):
    random_string = ''.join(random.choice(string.ascii_lowercase) for i in range(l))
    
    return random_string