/**
 * Created by User on 28.02.2016.
 */

var storage = {};

function register(name, service) {
    if (storage[name]) {
        throw new Error("dabbled name");
    }
    storage[name] = service;
}

function resolve(name) {
    if (!storage[name]) {
        throw new Error("no service");
    }
    return storage[name];
}

module.exports = {
    register: register,
    resolve: resolve
};
