const handleJSON = (req, res) => {
    let body = "";

    req.on("data", data => {
        body += data;
    });

    req.on("end", () => {
        if (body) req.body = JSON.parse(body);
    })

    res.send = data => {
        res.writeHead(200, "Successful Request", {
            "Content-Type": "application/json"
        });
        res.end(JSON.stringify(data))
    }
};

module.exports = {
    handleJSON
};
