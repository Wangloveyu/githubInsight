本项目基于node.js与python开发，使用前需安装node，python。

`backend`目录下为后台程序，分为node服务器与python服务器两部分。node服务器处理前端请求，部分请求转发到python服务器处理。

后台启动：

```
cd backend
npm install
nodemon serve.js
```

另开一终端：

```
cd ./backend
pip install -r requirements.txt
python main.py
```



fontend下为前端应用，运行：

```
cd fontend
npm install 
npm run dev
```

浏览器访问`localhost:5173`即可