const asyncErrorHandler = (fn) => {
    return async (req, res, next) => {
        try {
            await fn(req, res, next);
        } catch (error) {
            console.log('error')
            if (!res.headersSent) {
            res.status(500).send({ message: error.message || "Internal Server Error" });
            }
        }
    };
};

export default asyncErrorHandler;