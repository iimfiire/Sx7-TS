let fetch = require("node-fetch")
const Breeds = require("./Breeds")
let collection = new (require("../Collection/childrenCache").RaidenCol)
class BreedManager {
    constructor(api) {
        this.token = api
    }

    fetch(options = { id: "", limit: 0, name: ""}) {
        if(options.id && options.name || options.id && options.limit || options.name && options.limit) throw new RangeError("Request parameters must not have multiple")
        return new Promise((resolve, rej) => {
            if(options.name && !options.id && !options.limit) {
                fetch(`https://api.thecatapi.com/v1/breeds/search?q=${options.name}`, {
                    method: "GET",
                    headers: {
                        "content-type": "application/json",
                        "x-api-key": this.token
                    }
                }).then(res => {
                    res.json().then(data => {
                        for(let breeds of data) {
                            collection.set(breeds["id"], new Breeds(breeds))
                        }
                        resolve(collection)
                    })
                })
            } else {
                fetch(`https://api.thecatapi.com/v1/breeds${options.limit ? `?limit=${options.limit}` : "?limit=10"}`, {
                    method: "GET",
                    headers: {
                        "content-type": "application/json",
                        "x-api-key": this.token
                    }
                }).then(res => {
                    res.json().then(data => {
                        if(options.id && !options.limit) {
                            let filter = data.find(value => value.id === options.id)
                            resolve(new Breeds(filter))
                        } else {
                            for(let breeds of data) {
                                collection.set(breeds["id"], new Breeds(breeds))
                            }
                            resolve(collection)
                        }
                    })
                })
            }
        })
    }
}

module.exports = BreedManager