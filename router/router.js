const createRouter = (initialEndpoints = {}, reducer) => {
    let endpoints = initialEndpoints;

    const getEndpoints = () => endpoints;

    const dispatch = action => {
        endpoints = reducer(endpoints, action);
    }

    return {
        getEndpoints,
        dispatch
    }
};

module.exports = {
    createRouter
};
