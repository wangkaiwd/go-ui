module.exports = {
  publicPath: process.env.NODE_ENV === 'production'
    ? '/go-ui/'
    : '/',
  productionSourceMap: false
};
