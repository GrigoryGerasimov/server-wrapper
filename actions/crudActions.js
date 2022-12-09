const { GET, POST, PUT, PATCH, DELETE } = require("./crudConstants.js");

const crudActions = {
    get: (path, handler) => ({ type: GET, payload: { path, handler } }),
    post: (path, handler) => ({ type: POST, payload: { path, handler } }),
    put: (path, handler) => ({ type: PUT, payload: { path, handler } }),
    patch: (path, handler) => ({ type: PATCH, payload: { path, handler } }),
    del: (path, handler) => ({ type: DELETE, payload: { path, handler } })
};

const { get, post, put, patch, del } = crudActions;

module.exports = {
    get,
    post,
    put,
    patch,
    del
}