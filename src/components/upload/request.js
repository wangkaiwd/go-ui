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
/**
 * 文件上传
 * @param url 上传地址
 * @param name 上传文件的`key`值，需要和后端约定
 * @param file 上传的File对象
 * @param data 除文件外的其它参数，类型为object
 * @param onSuccess 上传成功后的回调
 * @param onError 上传失败后的回调
 * @param onProgress 上传进度回调
 * @returns {XMLHttpRequest}
 */
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
  formData.append(name, file);
  entries(data, (key, val) => formData.append(key, val));
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
