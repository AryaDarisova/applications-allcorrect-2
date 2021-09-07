const proxy = require("http-proxy-middleware");

module.exports = function (app) {
    app.use(
        proxy("/appreviews", {
            target: "https://store.steampowered.com",
            secure: false,
            changeOrigin: true
        })
    );

    /*app.use(
        proxy("/store", {
            target: "https://play.google.com",
            secure: false,
            changeOrigin: true
        })
    );*/

    /*app.use(
        proxy("/store/apps", {
            target: "https://play.google.com",
            // secure: false,
            changeOrigin: true
        })
    );*/

    /*app.use(
        proxy("https://play.google.com", {
            secure: false,
            changeOrigin: true
        })
    );*/
};