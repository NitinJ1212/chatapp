const errorMiddleware = (err, req, res, next) => {
    err.message ||= "Internal Server Errror";
    err.statusCode ||= 500;

    return res.status(err.statusCode).json({
        status: false,
        message: err.message
    })
}

const tryCatch = (passedFunc) => async (req, res, next) => {
    try {
        await passedFunc(req, res, next);
    } catch (error) {
        next(error)
    }
}

class ErrorHnadler extends Error {
    constructor(message, statusCode) {
        super(message);
        this.statusCode = statusCode
    }
}

module.exports = {
    errorMiddleware,
    tryCatch,
    ErrorHnadler
}