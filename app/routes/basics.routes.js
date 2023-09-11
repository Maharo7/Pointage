module.exports.basicRoutes = (app) => {
    app.get('/', function (req, res) {
        res.send('Systeme pointage');
     })
}