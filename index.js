const chalk = require("chalk");
const { configureServer } = require("./server/server.js");
const { createRouter } = require("./router/router.js");
const reducer = require("./reducers/reducer.js");
const { handleJSON } = require("./middlewares/handleJSON.js");
const { handleBufferParsing } = require("./middlewares/handleBufferParsing.js");
const { handleQueryParams } = require("./middlewares/handleQueryParams.js");

const { get, post } = require("./actions/crudActions.js");

const router = createRouter({}, reducer);

const app = configureServer();
app.subscribe(handleBufferParsing);
app.subscribe(handleJSON);
app.subscribe(handleQueryParams);

router.dispatch(get("/test", (req, res) => {
    res.end("Testing successful");
}));

router.dispatch(post("/testusers", (req, res) => {
    try {
        req.pipe(res);
    } catch (err) {
        console.log(chalk.redBright(err));
    }
}));

router.dispatch(get("/testusers", async (req, res) => {
    try {
        res.end("John");
        console.log(req.params);
    } catch (err) {
        console.log(chalk.redBright(err));
    }
}));

app.configureEndpoints(router.getEndpoints());

