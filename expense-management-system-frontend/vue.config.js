module.exports = {
  "transpileDependencies": [
    "vuetify"
  ],
  devServer: {
    proxy: 'https://mbk3bzr9d4.execute-api.us-west-1.amazonaws.com/dev/'
  }
}