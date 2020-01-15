const ApiUrl = "/api/v1/";

module.exports = (app) => {
    app.use(ApiUrl + 'admin' , require('./src/admin/Router'));
    app.use(ApiUrl + 'payments' , require('./src/payments/Router'));
    app.use(ApiUrl + 'sliders' , require('./src/sliders/Router'));
    app.use(ApiUrl + 'tournaments' , require('./src/tournaments/Router'));
    app.use(ApiUrl + 'tutorials' , require('./src/tutorials/Router'));
    app.use(ApiUrl + 'uploads' , require('./src/uploads/Router'));
    app.get('/robots.txt', (req, res) => {
        res.sendFile('./robots.txt')
    });
};
