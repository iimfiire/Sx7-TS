let fetch = require("node-fetch")
const Me = require("./Me")
const ResultManager = require("./ResultManager")
class Manager {
    fetch(query, options = { limit: 0, sort: "", locale: "", page: 0}) {
        if(!query) return Promise.reject("Please specify a query")
        let sort = options?.sort ? `&sort=${options?.sort}` : ""
        let page = options?.page ? `&page=${options?.page}` : ""
        return new Promise((resolve, rej) => [
            fetch(`https://developer.mozilla.org/api/v1/search?q=${encodeURIComponent(query)}${page}${sort}&locale=${!options?.locale ? "en-US" : options?.locale}`, {
                method: "GET"
            }).then(res => {
                res.json().then(data => {
                    if(options?.limit) return resolve(new ResultManager(data, options?.limit))
                    return resolve(new ResultManager(data))
                })
            })
        ])
    }
    me() {
        return new Promise((resolve, rej) => {
            fetch("https://developer.mozilla.org/api/v1/whoami", {
                method: "GET"
            }).then(res => {
                res.json().then(data => {
                    resolve(new Me(data))
                })
            })
        })
    }
}

exports["default"] = Manager