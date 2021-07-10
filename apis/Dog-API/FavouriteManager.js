let fetch = require("node-fetch")
const Favourite = require("./Favourite")
let collection = new (require("../Collection/childrenCache").RaidenCol)
class FavouriteManager {
    constructor(token) {
        this.constructor.TOKEN.push(token)
    }
    /**
     * @private
     */
     search(id) {
        return new Promise((resolve, rej) => {
            fetch(`https://api.thedogapi.com/v1/favourites`,{
                method: "GET",
                headers: {
                    "content-type": "application/json",
                    "x-api-key": this.constructor.TOKEN[0]
                }
            }).then(res => [
                res.json().then(data => {
                    resolve(data.find(value => value.image_id === id || value.id === id))
                })
            ])
        })
    }
    async fetch(options = {id: 0, imageID: "", limit: 0, subID: ""}) {
        if(options?.id && options?.limit || options?.id && options?.subID || options.limit && options.imageID) return Promise.reject("Overload, request parameters must not have multiple")
        if(options?.id && typeof options?.id !== "number") throw new TypeError("ID must be type number")
        if(typeof options?.imageID !== "string" && options?.imageID) throw new TypeError("ID and imageID must be type string")
        return new Promise((resolve, rej) => {
            let limit = options.limit && !options.id ? `?limit=${options.limit}` : options.id ? "" : "?limit=10"
            let subID = options.subID && !options.id ? `&sub_id=${options.subID}` : options.id ? "" : ""
            fetch(`https://api.thedogapi.com/v1/favourites${limit}${subID}`, {
                method : "GET",
                headers: {
                    "content-type": "application/json",
                    "x-api-key": this.constructor.TOKEN[0]
                }
            }).then(res => {
                res.json().then(data => {
                    if(options.id || options.imageID || options.subID) return resolve(new Favourite(data.find(value => value.image_id === options.imageID || value.id === options.id || value.sub_id === options.subID), this.constructor.TOKEN[0]))
                    for(let favourite of data) {
                        collection.set(favourite["id"], new Favourite(favourite, this.constructor.TOKEN[0]))
                    }
                    resolve(collection)
                })
            })
        })
    }

    async delete(id) {
        let search = await this.search(id)
        if(!search) return Promise.reject("Favourite doesn't exist")
        return new Promise((resolve, rej) => {
            fetch(`https://api.thedogapi.com/v1/favourites/${id}`, {
                method: "DELETE",
                headers: {
                    "content-type": "application/json",
                    "x-api-key": this.constructor.TOKEN[0]
                }
            }).then(res => {
                res.json().then(data => {
                    if(data.status === 400 || data.message === "INVALID_ACCOUNT") {
                        rej(`Favourite ID doesn't seem like it exist in your account. Message: ${data.message}`)
                    } else {
                        resolve(data.message)
                    }
                })
            })
        })
    }

    async create(imageId, options = {subID: ""}) {
        if(!imageId) return Promise.reject("Image ID is required")
        if(typeof imageId !== "string") return Promise.reject("Image ID must be type string")
        let search = await this.search(imageId)
        if(search) return Promise.reject("This favourite already exists")
        return new Promise((resolve, rej) => {
            fetch(`https://api.thedogapi.com/v1/favourites`, {
                method: "POST",
                headers: {
                    "content-type": "application/json",
                    "x-api-key": this.constructor.TOKEN[0]
                },
                body: JSON.stringify(options?.subID ? {
                    image_id: imageId,
                    sub_id: options.subID
                } : {
                    image_id: imageId
                })
            }).then(res => {
                res.json().then(data => {
                    if(data.status === 400) {
                        rej(`INVALID POST request. Message: ${data.message}`)
                    } else {
                        this.fetch({ id: data.id}).then(data => {
                            resolve(data)
                        })
                    }
                })
            })
        })
    }
}

FavouriteManager.TOKEN = []

exports["default"] = FavouriteManager