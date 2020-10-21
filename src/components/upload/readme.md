## 上传组件
* [doc link](https://developer.mozilla.org/zh-CN/docs/Web/API/File/Using_files_from_web_applications)
  ![](https://raw.githubusercontent.com/wangkaiwd/drawing-bed/master/20201019111435.png)
* [xhr.upload.onprogress doesn't work](https://stackoverflow.com/a/14161642/12819402)
* `Array.prototype.concat`不会修改操作的数组，而是会返回一个新数组
* 格式化上传文件：
  ```js
  const normalizedFile = {
    name: rawFile.name,
    size: rawFile.size,
    type: rawFile.type,
    percent: 0,
    uid: Date.now() + this.tempIndex++,
    status: 'init', // value list: init pending success failure
    raw: rawFile
  }
  ```
* 实现功能：
  * onProgress
  * limit/onExceed
  * customHttpRequest
  * beforeUpload
  * onChange
  * drag
### Usage
