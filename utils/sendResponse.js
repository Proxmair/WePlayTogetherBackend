const sendResponse = (res, statusCode, message, data, token = false) => {

    if (token) {
        res.cookie("token", token, {
            expires: new Date(Date.now() + 600000),
            httpOnly: true,
        });
    }
    const success = statusCode === 200 ? true : false;

    return res.status(statusCode).send({ message, data, success });
};

export default sendResponse;
