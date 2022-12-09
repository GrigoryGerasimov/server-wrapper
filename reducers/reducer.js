const { GET, POST, PUT, PATCH, DELETE } = require("../actions/crudConstants.js");

const generateReducer = (method, endpoints, path, handler) => {
    if (!endpoints[path]) endpoints[path] = {};
    if (endpoints[path][method]) throw new Error(`Ошибка! Дублирование метода ${method} по пути ${path}!`);
    endpoints[path][method] = handler;
    return endpoints;
}

const reducer = (endpoints, action) => {
    switch (action.type) {
        case GET: {
            const clonedEndpoints = { ...endpoints };
            return generateReducer(GET, clonedEndpoints, action.payload.path, action.payload.handler);
        }
        case POST: {
            const clonedEndpoints = { ...endpoints };
            return generateReducer(POST, clonedEndpoints, action.payload.path, action.payload.handler);
        }
        case PUT: {
            const clonedEndpoints = { ...endpoints };
            return generateReducer(PUT, clonedEndpoints, action.payload.path, action.payload.handler);
        }
        case PATCH: {
            const clonedEndpoints = { ...endpoints };
            return generateReducer(PATCH, clonedEndpoints, action.payload.path, action.payload.handler);
        }
        case DELETE: {
            const clonedEndpoints = { ...endpoints };
            return generateReducer(DELETE, clonedEndpoints, action.payload.path, action.payload.handler);
        }
        default: {
            return endpoints;
        }
    }
};

module.exports = reducer;