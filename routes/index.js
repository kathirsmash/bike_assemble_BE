
const initializeRoutes = (app) => {
    app.use('/auth', require('./auth'));
    app.use('/bike', require('./bike'));
    app.use('/productionLog', require('./productionLog'));
};

module.exports = initializeRoutes;