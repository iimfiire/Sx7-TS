let fetch = require("node-fetch")
let axios = require("axios")
const collection = new (require("../Collection/childrenCache").RaidenCol)
const Vote = require("./Vote")
class VoteManager {
    constructor(data) {
        /**
         * Your token
         * @private
         */
        this.token = data
    }
    /**
     * @private
     */
    search(id) {
        return new Promise((resolve, rej) => {
            fetch(`https://api.thecatapi.com/v1/votes`,{
                method: "GET",
                headers: {
                    "content-type": "application/json",
                    "x-api-key": this.token
                }
            }).then(res => {
                res.json().then(data => {
                    resolve(data.find(value => value.image_id === id || value.id === id))
                })
            })
        })
    }

    fetch(options = { voteID: 0, limit: 0}) {
        if(options.voteID && options.limit) throw new RangeError("Request parameters must not contain multiples")
        return new Promise((resolve, rej) => {
            fetch(`https://api.thecatapi.com/v1/votes${options.limit && !options.voteID ? `?limit=${options.limit}` : options.voteID ? `/${options.voteID}` : `?limit=10`}`, {
                method: "GET",
                headers: {
                    "Content-type": "application/json",
                    "x-api-key": this.token
                }
            }).then(res => {
                res.json().then(data => {
                    if(options.limit && !options.voteID) {
                        for(let key of data) {
                            collection.set(key["id"], new Vote(key, this.token))
                        }
                        resolve(collection)
                    } else if(options.voteID && !options.limit) {
                        resolve(new Vote(data, this.token))
                    } else {
                        for(let key of data) {
                            collection.set(key["id"], new Vote(key, this.token))
                        }
                        resolve(collection)
                    }
                })
            })
        })
    }

    async vote(id) {
        let votes = await this.search(id)
        if(votes) return Promise.reject("Vote already exists")
        return new Promise((resolve, rej) => {
            fetch("https://api.thecatapi.com/v1/votes", {
                method: "POST",
                headers: {
                    "content-type": "application/json",
                    "x-api-key": this.token,
                },
                body: JSON.stringify({
                    image_id: id,
                    value: 1
                })
            }).then(res => {
                res.json().then(data => {
                   if(data.status === 400) throw new Error(`Invalid POST request. Message: ${data.message}`)
                   if(data.message === "SUCCESS") {
                    this.fetch({voteID: data.id}).then(data => {
                        resolve(data)
                    })
                }
                })
            })
        })
    }

    async downvote(id) {
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
                       this.fetch({voteID: data.id}).then(data => {
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
        return new Promise((resolve, rej) => {
            fetch(`https://api.thecatapi.com/v1/votes/${id}`, {
                method: "DELETE",
                headers: {
                    "content-type": "application/json",
                    "x-api-key": this.token
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

module.exports = VoteManager