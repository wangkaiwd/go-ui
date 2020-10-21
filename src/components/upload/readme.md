## `Vue`实战：文件上传组件

文件上传是我们作为开发者在日常工作中经常遇到的一个需求，各个流行的组件库中也都有现成的组件可以很方便的直接调用。具体的用法不再赘述，小伙伴们可以在组件库中查看`demo`，这里笔者主要介绍下如何实现一个`Upload`组件。

组件支持的功能如下：
* 上传进度条显示
* 图片预览
* 自定义上传请求方法
* 图片数量限制
* 支持拖拽上传
* 使用`koa`以及对应的中间件实现图片上传服务器接口

最终效果图如下：
<img width="100%" src="https://raw.githubusercontent.com/wangkaiwd/drawing-bed/master/Oct-21-2020%2022-35-06.gif"/>
![](https://raw.githubusercontent.com/wangkaiwd/drawing-bed/master/Oct-21-2020%2022-35-06.gif)

> 相关资料：
> * [在线`demo`](https://wangkaiwd.github.io/go-ui/#/upload)
> * [组件源代码](https://github.com/wangkaiwd/go-ui/blob/master/src/components/upload/upload.vue)
> * [服务端上传接口源代码](https://github.com/wangkaiwd/upload-server)
### 搭建文件上传服务器
在书写前端`Upload`组件之前，首先需要通过`Node.js`来搭建一个服务器。使用到的一些库如下：
* `Koa`: `Node.js`服务端框架
* `koa-static`: `Koa`静态服务器中间件
* `@koa/multer`: `Koa`文件上传中间件
* `@koa/router`: `Koa`路由中间件
* `@koa/cors`: 解决跨域问题

服务端的代码比较简单，源码如下：
```javascript
const path = require('path');
const Koa = require('koa');
const Router = require('@koa/router');
const multer = require('@koa/multer');
const cors = require('@koa/cors');
const serve = require('koa-static');
const app = new Koa();


// deploy to heroku will use environment variable
const PORT = process.env.PORT || 3000;
const router = new Router();
const upload = multer({ dest: 'uploads' });
app.use(serve('.'));
app.use(cors());
app.use(router.routes());
app.use(router.allowedMethods());

router.post('/upload', upload.single('file'), async (ctx) => {
  const domain = ctx.protocol + '://' + ctx.host + '/';
  const { path, originalname } = ctx.file;
  const data = { path: domain + path, filename: originalname };
  ctx.body = {
    code: 200,
    data,
    message: '成功'
  };
})
app.listen(PORT, () => {
  console.log(`server is listening on port ${PORT}`);
});
```
我们将项目根目录作为静态服务器的根目录，之后我们就可以直接通过路径来访问项目中的资源。如:`http://localhost:3000/uploads/xxxx` (在本地启动服务) 可以直接访问`uploads`下我们上传的图片。

上边代码的主要逻辑是帮我们实现了上传接口，并在上传完成后将图片的访问路径进行拼接，然后作为响应返回。前端可以在接收到响应后通过路径进行图片预览。

最终我们是将服务器部署到了`heroku`上，具体的部署过程参考这里：[传送门](https://github.com/wangkaiwd/upload-server/blob/master/readme.md#%E4%BD%BF%E7%94%A8heroku%E9%83%A8%E7%BD%B2%E6%9C%8D%E5%8A%A1)

### 组件设计

### 
