import Vue from 'vue';

const requireComponent = require.context('@/components', true, /go-[a-z]\w+\.(vue|js)$/);
requireComponent.keys().forEach(fileName => {
  const componentConfig = requireComponent(fileName);
  const name = fileName.split('/').slice(0, -1)[1];
  const componentName = name;
  Vue.component(
    componentName,
    componentConfig.default || componentConfig
  );
});
