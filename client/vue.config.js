module.exports = {
  "outputDir": "C:\\Users\\BeckTanWeiSong\\vue\\reef-tracker\\server\\public",
  "productionSourceMap": false,
  "devServer": {
    "proxy": {
      "/api": {
        "target": "http://localhost:5000"
      }
    }
  },
  "transpileDependencies": [
    "vuetify"
  ]
}