import requests

url = 'http://localhost:3001/api/v1/test'
myobj = {'somekey': 'somevalue'}

x = requests.post(url, data = myobj)

print(x.text)