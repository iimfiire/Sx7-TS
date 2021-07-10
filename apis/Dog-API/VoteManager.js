let fetch = require("node-fetch")
const Vote = require("./Vote")
let collection = new (require("../Collection/childrenCache").RaidenCol)
let data = new (require("../Cat-API/node_modules/form-data"))
class VoteManager {
    constructor(token) {
        this.constructor.TOKEN.push(token)
    }

    /**
     * @private
     */
     search(id) {
        return new Promise((resolve, rej) => {
            fetch(`https://api.thedogapi.com/v1/votes`,{
                method: "GET",
                headers: {
                    "content-type": "application/json",
                    "x-api-key": this.constructor.TOKEN[0]
                }
            }).then(res => {
                res.json().then(data => {
                    resolve(data.find(value => value.image_id === id || value.id === id))
                })
            })
        })
    }

    fetch(options = { limit: 0, id: "", subID: ""}) {
        if(options?.limit && options?.id || options.id && options.subID) Promise.reject("Request parameter must not have multiple")
        if(typeof options?.limit !== "number" && options?.limit) throw new TypeError("Limit and ID must be type number")
        return new Promise((resolve, rej) => {
            if(options.id) {
                fetch(`https://api.thedogapi.com/v1/votes`, {
                    method: "GET",
                    headers: {
                        "content-type": "application/json",
                        "x-api-key" : this.constructor.TOKEN[0]
                    }
                }).then(res => {
                    res.json().then(data => {
                        let find = data.find(value => value.id === options.id)
                        if(!find) return rej("Vote not Found")
                        resolve(new Vote(find, this.constructor.TOKEN[0]))
                    })
                })
            } else {
                let limit = options.limit ? `?limit=${options.limit}` : `?limit=10`
                let subID = options.subID ? `&sub_id=${options.subID}` : ``
                fetch(`https://api.thedogapi.com/v1/votes${limit}${subID}`, {
                    method: "GET",
                    headers: {
                        "x-api-key" : this.constructor.TOKEN[0]
                    }
                }).then(res => {
                    res.json().then(data => {
                        for(let votes of data) {
                            collection.set(votes["id"], new Vote(votes, this.constructor.TOKEN[0]))
                        }
                        resolve(collection)
                    })
                })
            }
        })
    }

    async create(id, options = {subID: ""}) {
        let votes = await this.search(id)
        if(votes) return Promise.reject("Vote already exists")
        return new Promise((resolve, rej) => {
            fetch("https://api.thedogapi.com/v1/votes", {
                method: "POST",
                headers: {
                    "content-type": "application/json",
                    "x-api-key": this.constructor.TOKEN[0],
                },
                body: JSON.stringify(options.subID ? {
                    image_id: id,
                    sub_id: options.subID,
                    value: 1
                } : {
                    image_id: id,
                    value: 1
                })
            }).then(res => {
                res.json().then(data => {
                   if(data.status === 400) throw new Error(`Invalid POST request. Message: ${data.message}`)
                   if(data.message === "SUCCESS") {
                    this.fetch({id: data.id}).then(data => {
                        resolve(data)
                    })
                }
                })
            })
        })
    }

 
    async down(id) {
        let searcher = await this.search(id)
        if(!searcher) return Promise.reject("This image doesn't exist in your votes")
        return new Promise((resolve, rej) => {
            fetch("https://api.thecatapi.com/v1/votes", {
                method: "POST",
                headers: {
                    "content-type": "application/json",
                    "x-api-key": this.token,
                },
                body: JSON.stringify({
                    image_id: id,
                    value: 0
                })
            }).then(res => {
                res.json().then(data => {
                   if(data.status === 400) throw new Error(`Invalid POST request. Message: ${data.message}`)
                   if(data.message === "SUCCESS") {
                       this.fetch({id: data.id}).then(data => {
                           resolve(data)
                       })
                   }
                })
            })
        })
    }

    async delete(id) {
        let search = await this.search(id)
        if(!search) return Promise.reject("No vote with this ID is found in your account")
        data.append("Content-Type", "application/json")
        return new Promise((resolve, rej) => {
            fetch(`https://api.thedogapi.com/v1/votes/${id}`, {
                method: "DELETE",
                headers: {
                    ...data.getHeaders(),
                    "x-api-key": this.constructor.TOKEN[0]
                }
            }).then(res => {
                res.json().then(data => {
                    if(data.status === 400) return rej(`INVALID DELETE request. Message: ${data?.message}. Code: ${data?.status}`)
                    resolve(data.message)
                })
            })
        })
    }
}

VoteManager.TOKEN = []

exports["default"] = VoteManager