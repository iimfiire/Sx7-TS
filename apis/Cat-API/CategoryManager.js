let fetch  = require("node-fetch")
const Category = require("./Category")
let collection = new (require("../Collection/childrenCache").RaidenCol)
class CategoryManager {
    fetch(options = { limit: 0, id: 0, name: ""}) {
        if(typeof options?.id !== "number" && options?.id || typeof options?.limit !== "number" && options?.limit) throw new TypeError("ID and limit must be type number")
        if(typeof options?.name !== "string" && options?.name) throw new TypeError("Name must be type string")
        if(options?.id && options?.limit || options?.id && options?.name || options?.name && options?.id) return Promise.reject("Request parameters must not have multiple, except for name and limit they can be on at the same time")
        return new Promise((resolve, rej) => {
            let limit = options.limit ? `?limit=${options.limit}` : `?limit=10`
            fetch(`https://api.thecatapi.com/v1/categories${limit}`, {
                method: "GET",
                headers: {
                    "content-type": "application/json",
                }
            }).then(res => {
                res.json().then(data => {
                    if(options.id && !options.limit && !options.name) {
                        let find = data.find(value => value.id === options.id)
                        resolve(new Category(find))
                    } else if(!options.id && options.limit && !options.name) {
                        for(let category of data) {
                            collection.set(category["id"], new Category(category))
                        }
                        resolve(collection)
                    } else if(options.name && !options.limit && !options.id){
                        let find = data.find(value => value.name?.toLowerCase() === options.name.toLowerCase())
                        resolve(new Category(find))
                    } else {
                        for(let category of data) {
                            collection.set(category["id"], new Category(category))
                        }
                        resolve(collection)
                    }
                })
            })
        })
    }
}
module.exports = CategoryManager