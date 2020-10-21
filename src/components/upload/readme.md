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
<p align="center">
  <img src="https://raw.githubusercontent.com/wangkaiwd/drawing-bed/master/Oct-21-2020%2022-35-06.gif"/>
</p>

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
在编码之前，我们先看下组件的基础用法：
```vue
<template>
  <go-upload name="file" :limit="3" multiple on-exceed="onExceed" :action="action">
    <go-button color="primary">click to upload</go-button>
  </go-upload>
</template>

<script>
export default {
  data () {
    return {
      action: 'https://afternoon-dawn-09444.herokuapp.com/upload'
    };
  },
  methods: {
    onExceed() {
    
    }
  }
};
</script>
```
组件通过插槽的形式来放置文件上传的触发按钮，并且接收`name`以及`action`属性。

`name`属性是我们和服务端约定好的文件上传的`key`，而`action`则是组件的上传地址。下面我们开始组件的实现。

### 触发`Input`的`change`事件
根据组件的使用方式，我们可以写出下面的代码：
```vue
<template>
  <div class="go-upload">
    <input
      class="go-upload-input"
      ref="input"
      type="file"
    >
    <div class="go-upload-trigger" >
      <slot></slot>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    name: { type: String, default: 'file' },
    action: {
      type: String,
      required: true
    },
  }
}
</script>
```
只要点击`type=file`对应的`input`，就会弹出对应的上传文件窗口。但是由于原生的`input`比较丑，我们可以将其隐藏(`display:none`)，然后通过手动触发`input`的`click`事件来进而触发`input`的`change`事件。

具体的细节再[`mdn`](https://developer.mozilla.org/zh-CN/docs/Web/API/File/Using_files_from_web_applications) 中有介绍:  
![](https://raw.githubusercontent.com/wangkaiwd/drawing-bed/master/20201019111435.png)

在组件中，当用户点击`slot`中的按钮时，`click`事件会冒泡到`go-upload-trigger`对应的`div`，我们可以监听`go-upload-trigger`的`click`事件，然后再调用`input`的`click`进而弹出上传窗口：
```vue
<template>
  <div class="go-upload">
    <input
      class="go-upload-input"
      ref="input"
      type="file"
    >
    <div class="go-upload-trigger" @click="onClickTrigger">
      <slot></slot>
    </div>
  </div>
</template>
<script>
export default {
  // ...
  methods: {
    onClickTrigger () {
      this.$refs.input.click();
    }
  }  
}
</script>
```
通过这种方式，我们便可以实现一个比较美观的按钮来进行点击上传文件。

在上传之前，我们先整理一下要做的事情：
* 实现上传方法封装
* 获取到用户选择的文件(`e.target.files`)
* 整理`XMLHttpRequest`上传所需参数，并调用上传方法
* 在上传过程中更新`fileList`的状态，方便进行展示

### 实现`XMLHttpRequest`文件上传方法
> `XMLHttpRequest`的详细用法可以看这里: [XMLHttpRequest](https://javascript.info/xmlhttprequest)

文件上传可以使用`FormData`来实现，`FormData`可以轻易地构造出一组代表`form`字段和它们值的`key/value`键值对，而不用我们再在页面中书写`form`表单。

为了方便使用，用户传入的`data`是一个对象，我们需要遍历其中的每一项，然后将`key/value`通过`append`方法追加到`formData`中，然后传给服务端，源码如下：
```javascript
// XMLHttpRequest常用的三个事件： error/load/progress
import { entries } from '@/shared/util';

const processResponse = (response) => {
  if (typeof response === 'string') {
    try {
      return JSON.parse(response);
    } catch (e) {
      return response;
    }
  }
  return response;
};
const request = ({
  url,
  name,
  file,
  data,
  onSuccess,
  onError,
  onProgress
}) => {
  const xhr = new XMLHttpRequest();
  const formData = new FormData();
  // 传入文件key,value对
  formData.append(name, file);
  // 遍历对象方便为formData添加key,value对
  entries(data, (key, val) => formData.append(key, val));
  // 监听上传的progress事件来监听上传过程，显示上传进度
  xhr.upload.addEventListener('progress', (e) => {
    e.percent = e.loaded / e.total * 100;
    onProgress(e);
  });
  xhr.open('POST', url);
  xhr.send(formData);
  xhr.addEventListener('load', () => {
    if (xhr.status >= 200 && xhr.status < 300) {
      const response = processResponse(xhr.response);
      onSuccess(response);
    } else {
      onError(new Error('upload request failed!'));
    }
  });

  xhr.addEventListener('error', (e) => {
    onError(e);
  });
  return xhr;
};

export default request;
```
对应的参数含义如下：  
* url 上传地址
* name 上传文件的`key`值，需要和后端约定
* file 上传的File对象
* data 除文件外的其它参数，类型为object
* onSuccess 上传成功后的回调
* onError 上传失败后的回调
* onProgress 上传进度回调

最终`request`函数会返回`xhr`，方便之后调用`xhr`的属性和方法，如：通过`xhr.abort()`来取消请求。

> 注意：**`xhr.upload`的`progress`事件必须在调用`xhr.open`之前进行监听，否则不会生效**，想要了解的小伙伴可以看这里: [xhr.upload.onprogress doesn't work](https://stackoverflow.com/a/14161642/12819402)

### 开始上传
用户选择的文件在`input`的`change`事件的事件对象中：`e.target.files`，然后通过`uploadFiles`进行上传文件
```vue
<script>
export default {
  methods: {
    onInputChange (e) {
      // e.target.files is pseudo array, need to convert to real array
      const rawFiles = Array.from(e.target.files);
      this.uploadFiles(rawFiles);
    },
    uploadFiles (rawFiles) {
      const filesLen = rawFiles.length + this.files.length;
      if (this.limit && this.limit > filesLen) {
        return this.onExceed(rawFiles, this.files);
      }
      this.startUpload(rawFiles);
    }
  }
}
</script>
```
上传之前会通过`limit`来判断上传的数量是否超过了限制，如果超过的话回调用用户传入的`onExceed`方法，并停止上传。

在`startUpload`方法中，我们会遍历用户选择的每个文件，然后依次进行上传。在真正上传之前，会执行`normalizeFiles`将原生的`file`对象进行格式化，处理成组件中方便使用的格式：
```vue
<script>
export default {
  methods: {
    startUpload (rawFiles) {
      rawFiles.forEach(rawFile => {
        const file = this.normalizeFiles(rawFile);
        if (!this.beforeUpload || this.beforeUpload()) {
          this.upload(file);
        }
      });
    },
    normalizeFiles (rawFile) {
      const file = {
        name: rawFile.name, // 文件名
        size: rawFile.size, // 文件尺寸
        type: rawFile.type, // 文件类型
        percent: 0, // 上传进度
        uid: Date.now() + this.tempIndex++, // 唯一表示
        status: 'init', // value list: init pending success failure
        raw: rawFile // 原生文件对象
      };
      // concat does not change the existing arrays, but instead returns a new array
      this.files.push(file);
      return file;
    },
  }
}
</script>
```
在格式化`file`对象的时候，需要我们生成唯一的`uid`来标识每一个上传的文件信息。这里我们使用了`Date.now()`来生成随机数，但是在进行多文件上传的时候，会同时上传多个文件，导致`uid`重复，所以我们为其加上`tempIndex`，防止重复。

在拿到格式化后的文件后，将会进入真正的上传环节： 
```vue
<script>
export default {
  methods: {
    upload (file) {
      const options = {
        url: this.action,
        name: this.name,
        file: file.raw,
        data: this.data,
        onSuccess: this.handleSuccess.bind(this, file),
        onError: this.handleError.bind(this, file),
        onProgress: this.handleProgress.bind(this, file)
      };
      file.status = 'pending';
      this.onChange(file, this.files);
      const req = this.customHttpRequest(options);
      if (req instanceof Promise) {
        req.then(options.onSuccess, options.handleError);
      }
    },
    handleSuccess (file, response) {
      file.status = 'success';
      this.$set(file, 'response', response);
      // Not only front end can implement picture preview but also back end can do it. Here make use of back end api
      this.$set(file, 'url', response.data.path);
      this.onChange(file, this.files);
      this.onSuccess(response, file, this.files);
    },
    handleError (file, error) {
      file.status = 'failure';
      this.onError(error, file, this.files);
    },
    handleProgress (file, event) {
      file.percent = event.percent;
      this.onChange(file, this.files);
      this.onProgress(event, file, this.files);
    },
  }
}
</script>
```
`upload`为真正发起请求的函数，其内部首先收集了请求发起所需要的所有参数，之后将文件状态改为`pending`后进行上传操作。其中对应的回调函数所实现的功能如下：
* `handleSuccess`: 修改文件状态为`success`；添加`response`属性为请求响应；添加`url`属性为文件预览地址
* `handleProgress`: 设置文件的上传进度百分比
* `handleError`: 修改文件状态为`failure`

现在我们可以成功的处理上传过程中文件的不同状态，接下来我们在页面中进行展示。

### 上传列表


### 拖拽上传

### 结语
组件完成后，可以部署到`GitHub Pages`在网络中进行分享，具体的部署过程：[部署Vue项目到GitHub Pages](https://github.com/wangkaiwd/vue-component-communication/blob/master/deploy.md)

希望在看完这篇文章后能帮助阅读的小伙伴明白上传组件的具体实现逻辑，并且可以更好的使用社区流行框架中的`Upload`组件，并对其进行二次封装。
