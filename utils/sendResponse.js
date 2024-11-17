const sendResponse = (res, statusCode, message, data, token = false) => {

    const response = { message, data };

    if (token) {
        res.cookie("token", token, {
            expires: new Date(Date.now() + 600000),
            httpOnly: true,
        });
    }

    return res.status(statusCode).send(response);
};

export default sendResponse;
