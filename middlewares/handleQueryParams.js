const config = require("config");

const handleQueryParams = (req, res) => {
    const parsedURL = new URL(req.url, `https://localhost:${config.get("PORT")}`);

    const parsedURLParams = {};
    parsedURL.searchParams.forEach((value, key) => parsedURLParams[key] = value);

    req.path = parsedURL.pathname;
    req.params = parsedURLParams;
};

module.exports = {
    handleQueryParams
};
