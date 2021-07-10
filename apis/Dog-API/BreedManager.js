let fetch = require("node-fetch")
const Breeds = require("./Breeds")
let collection = new (require("../Collection/childrenCache").RaidenCol)
class BreedManager {
    constructor(token) {
        this.constructor.TOKEN.push(token)
    }
    
    fetch(options = { id: 0, limit: 0, name: "", attachBreed: 0}) {
        if(typeof options?.id !== "number" && options?.id || typeof options?.limit !== "number" && options?.limit || typeof options?.attachBreed !== "number" && options?.attachBreed) throw new TypeError("ID, limit and attachBreed must be type number")
        if(typeof options?.name !== "string" && options?.name) throw new TypeError("Name must be type string")
        if(options?.id && options?.limit || options?.id && options?.name || options?.name && options?.id || options.name && options.attachBreed) return Promise.reject("Request parameters must not have multiple, except for name and limit they can be on at the same time")
        return new Promise((resolve, rej) => {
            let limit = options?.limit ? `?limit=${options?.limit}` : "?limit=10"
            let breed = options?.attachBreed ? `&attach_breed=${options.attachBreed}` : ""
            if(!options?.name) {
                fetch(`https://api.thedogapi.com/v1/breeds${limit}${breed}`, {
                    method: "GET",
                    headers: {
                        "content-type": "application/json",
                        "x-api-key": this.constructor.TOKEN[0]
                    }
                }).then(res => {
                    res.json().then(data => {
                        if(!options.limit && options.attachBreed && !options.id) {
                            for(let breeds of data) {
                                collection.set(breeds["id"], new Breeds(breeds, this.constructor.TOKEN[0]))
                            }
                            resolve(collection)
                        } else if(options.limit && !options.attachBreed && !options.id) {
                            for(let breeds of data) {
                                collection.set(breeds["id"], new Breeds(breeds, this.constructor.TOKEN[0]))
                            }
                            resolve(collection)
                        } else if(!options.limit && !options.attachBreed && options.id) {
                            let find = data.find(value => value.id === options.id)
                            resolve(new Breeds(find))
                        } else {
                            for(let breeds of data) {
                                collection.set(breeds["id"], new Breeds(breeds, this.constructor.TOKEN[0]))
                            }
                            resolve(collection)
                        }
                    })
                })
            } else {
                fetch(`https://api.thedogapi.com/v1/breeds/search?q=${options.name}`, {
                    method: "GET",
                    headers: {
                        "content-type": "application/json",
                        "x-api-key": this.constructor.TOKEN[0]
                    }
                }).then(res => {
                    res.json().then(data => {
                        for(let breeds of data) {
                            collection.set(breeds["id"], new Breeds(breeds, this.constructor.TOKEN[0]))
                        }
                        resolve(collection)
                    })
                })
            }
        })
    }
}
BreedManager.TOKEN = []
exports["default"] = BreedManager