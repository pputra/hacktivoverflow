module.exports = {
    success: (res, code, message, result) => {
        res.status(code).json({
            message: message,
            result: result || []
        });
    },

    error: (res, code, message) => {
        res.status(code).json({
            message:message
        });
    }
};
