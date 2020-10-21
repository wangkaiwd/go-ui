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
  formData.append(name, file);
  entries(data, (key, val) => formData.append(key, val));
  xhr.upload.onprogress = onProgress;
  xhr.open('POST', url);
  xhr.send(formData);
  xhr.addEventListener('load', () => {
    if (xhr.status >= 200 && xhr.status < 300) {
      const response = processResponse(xhr.response);
      onSuccess && onSuccess(response);
    } else {
      onError && onError('error');
    }
  });

  xhr.addEventListener('error', (e) => {
    console.log('e', e);
    onError && onError(e);
  });
  return xhr;
};

export default request;
