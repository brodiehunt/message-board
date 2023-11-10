function errorHandler (err, req, res, next) {
    console.error(err);
    const statusCode = err.statusCode || 500;
    res.status(statusCode);

    // dont send details if in prod env
    const errorStack = (process.env.NODE_ENV === 'development') ? err.stack : {};

    return res.render('error', {
        message: err.message,
        error: { code: statusCode, stack: errorStack },
        title: "Error Page"
    });

}

function noRouteDefined (req, res, next) {
    const err = new Error('Page not found');
    err.statusCode = 404;

    next(err);
}

module.exports = {errorHandler, noRouteDefined};