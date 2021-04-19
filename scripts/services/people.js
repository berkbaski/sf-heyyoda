const sc = require("./serviceConfig");

function getAll() {
    return new Promise((resolve, reject) => {
        sc.request(`/people`, {
            method: "GET",
        }).then(response => {
            resolve(response);
        }).catch(err => {
            reject(err);
        });
    });
}

function get(id) {
    return new Promise((resolve, reject) => {
        sc.request(`/people/${id}`, {
            method: "GET",
        }).then(response => {
            resolve(response);
        }).catch(err => {
            reject(err);
        });
    });
}

Object.assign(exports, {
    getAll,
    get
});