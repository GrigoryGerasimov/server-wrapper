const handleBufferParsing = (req, res) => {
    let body = "";

    req.on("data", data => {
        body += data;
    });

    req.on("end", () => {
        if (body) req.body = Buffer.from(body).toString("utf-8");
    })
};

module.exports = {
    handleBufferParsing
};
