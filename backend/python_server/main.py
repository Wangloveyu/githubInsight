import requests
from flask import Flask,request,jsonify
from concurrent.futures import ThreadPoolExecutor
from flask_cors import *
import threading
import json
import time

app = Flask(__name__)
CORS(app, supports_credentials=True)
Lock = threading.Lock
userName = "RK_PHG"
token = "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"
def GetURL(arr,url): 
  print(url)
  if url=="company": 
      return
  try:  
    resp = requests.get(url=url,auth=(userName,token)).json()
    data = resp["company"]
  except Exception as e:
    print(e)
    data = 0
  finally:
    arr.append(data)
  time.sleep(1)

# 100 threads for url requests
def getUrls(urls):
    result = []
    Pool = ThreadPoolExecutor(100)
    for url in urls:
        Pool.submit(GetURL,result,url,) 
    while True:
      if len(result)==len(urls):
         break 
    trueRes = []
    for i in result:
      if i!=0:
        trueRes.append(i)
    return trueRes

@app.route("/")
def getCompanys():
    urls = request.args.get("urls")
    urls = json.loads(urls)
    return json.dumps(getUrls(urls))

if __name__ == "__main__":
    app.run()