let fetch = require("node-fetch")
const Image = require("./Image")
let collection = new (require("../Collection/childrenCache").RaidenCol)
let formData = require("../Cat-API/node_modules/form-data")
let data = new formData()
let axios = require("axios")
let fs = require("fs")
class ImageManager {
    constructor(token) {
        this.constructor.TOKEN.push(token)
    }
    /**
     * @private
     */
     search(id) {
        return new Promise((resolve, rej) => {
            fetch(`https://api.thedogapi.com/v1/images`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "x-api-key": this.constructor.TOKEN[0]
                }
            }).then(res => {
                res.json().then(data => {
                    let image = data.find(value => value.original_filename === id || value.id === id)
                    resolve(image)
                })
            })
        })
    }

    async fetch(options = { id: "", limit: 0, size: "", random: false, categoryIDS: [], breedID: 0}) {
        if(options?.id && options.limit || options?.id && options?.size || options?.id && options?.random || options?.id && options?.categoryIDS) return Promise.reject("If ID is specified it must be the only one")
        if(typeof options?.id !== "string" && options?.id) return Promise.reject("TypeError id must be type string")
        return new Promise((resolve, rej) => {
            if(options?.id) {
                fetch(`https://api.thedogapi.com/v1/images/${options.id}`, {
                    method: "GET",
                    headers: {
                        "content-type": "application/json",
                        "x-api-key": this.constructor.TOKEN[0]
                    }
                }).then(res => {
                    res.json().then(data => {
                        resolve(new Image(data, this.constructor.TOKEN[0]))
                    })
                })
            } else {
                let limit = options?.limit ? `?limit=${options?.limit}` : "?limit=10"
                let size = options?.size ? `&size=${options?.size}` : ""
                let categories = options?.categoryIDS ? `&category_ids=${options.categoryIDS}` : ""
                let breeds = options?.breedID ? `&breed_id=${options?.breedID}` : ""
                fetch(`https://api.thedogapi.com/v1/images/search${limit}${size}${categories}${breeds}`, {
                    method: "GET",
                    headers: {
                        "content-type": "application/json",
                        "x-api-key": this.constructor.TOKEN[0]
                    }
                }).then(res => {
                    res.json().then(data => {
                        if(options?.random) return resolve(data[Math.floor(Math.random() * data.length)])
                        for(let images of data) {
                            collection.set(images["id"], new Image(images, this.constructor.TOKEN[0]))
                        }
                        return resolve(collection)
                    })
                })
            }
        })
    }

    async create(file, options = { subID: ""}) {
        if(!file) return Promise.reject("Please specify a file")
        let searcher = await this.search(file.slice(file.lastIndexOf("/")+1))
        if(searcher) return Promise.reject("This image seem to already exist in your account")
        let checker = fs.readFileSync(file)
        if(!checker) return;
        data.append("file", fs.createReadStream(file))
        options.subID ? data.append("sub_id", options.subID) : ""
        return new Promise((resolve, rej) => {
            fetch(`https://api.thedogapi.com/v1/images/upload`, {
                method: "POST",
                headers: {
                    ...data.getHeaders(),
                    "x-api-key": this.constructor.TOKEN[0],
                },
                body: data
            }).then(res => {
                res.json().then(data => {
                    if(data.type === "entity.too.large") return rej(`INVALID POST request, image too large. Message: ${data.message}. Received: ${data.expected}kB. Limit: ${data.limit}kB`)
                    if(data.status === 400) return rej(`INVALID POST request. Message: ${data.message}`)
                    if(data.status === 500) return rej(`Internal Server Error. Message: ${data.message  }`)
                    resolve(new Image(data, this.constructor.TOKEN[0]))
                })
            })
        })
    }

    async delete(id) {
        if(!id) return Promise.reject("ID is not specified")
        if(typeof id !== "string") return Promise.reject("ID must be type string")
        let search = await this.search(id)
        if(!search) return Promise.reject("Image ID is not found. Potential cause is it doesn't exist or invalid ID")
        return new Promise((resolve, rej) => {
            axios(`https://api.thedogapi.com/v1/images/${id}`, {
                method: "DELETE",
                headers: {
                    "x-api-key": this.constructor.TOKEN[0]
                }
            }).then(res => {
                if(res.status !== 400) {
                    resolve(`Succeeded with status code ${res.status}`)
                }
            }).catch(err => rej(err))
        })
    }


    async myImages(options = { id: "", limit: 0, random: false, categoryIDS: [], breedID: []}) {
        if(options?.id && options.limit || options?.id && options?.random || options?.id && options?.categoryIDS || options?.id && options.breedID) return Promise.reject("If ID is specified it must be the only one")
        if(typeof options?.id !== "string" && options?.id) return Promise.reject("TypeError id must be type string")
        let limit = options.limit ? `?limit=${options.limit}` : `?limit=10`
        let breed = options.breedID ? `&breed_id=${options.breedID}` : ""
        let category = options.categoryIDS ? `&category_ids=${options.categoryIDS}` : ""
        return new Promise((resolve, rej) => {
            if(options.id) {
                fetch(`https://api.thedogapi.com/v1/images`, {
                    method: "GET",
                    headers: {
                        "content-type": "application/json",
                        "x-api-key": this.constructor.TOKEN[0]
                    }
                }).then(res => {
                    res.json().then(data => {
                        let filter = data.find(value => value.id === options.id)
                        if(!filter) Promise.reject("No images found with this id on your account")
                        resolve(new Image(filter, this.constructor.TOKEN[0]))
                    })
                })
            } else {
                fetch(`https://api.thedogapi.com/v1/images${limit}${breed}${category}`, {
                    method: "GET",
                    headers: {
                        "content-type": "application/json",
                        "x-api-key": this.constructor.TOKEN[0]
                    }
                }).then(res => {
                    res.json().then(data => {
                        if(options?.random) return resolve(data[Math.floor(Math.random() * data.length)])
                        for(let image of data) {
                            collection.set(image["id"], new Image(image, this.constructor.TOKEN[0]))
                        }
                        resolve(collection)
                    })
                })
            }
        })

    }
}

ImageManager.TOKEN = []

exports["default"] = ImageManager