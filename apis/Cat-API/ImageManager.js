let fetch = require("node-fetch")
const Image = require("./Image")
let collection = new (require("../Collection/childrenCache").RaidenCol)
let fs = require("fs")
let formData = require("form-data")
let data = new formData()
let axios = require("axios")
class ImageManager {
    constructor(data) {
        this.constructor.TOKEN.push(data)
    }
    /**
     * @private
     */
    search(id) {
        return new Promise((resolve, rej) => {
            fetch(`https://api.thecatapi.com/v1/images`, {
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

    fetch(options = { id: "", limit: 0, size: "", random, categoryIDS: [], breedID: 0}) {
        if(options?.id && options.limit || options?.id && options?.size || options?.id && options?.random || options?.id && options?.categoryIDS) return Promise.reject("If ID is specified it must be the only one")
        if(typeof options?.id !== "string" && options?.id) return Promise.reject("TypeError id must be type string")
        return new Promise((resolve, rej) => {
            if(options.id) {
                fetch(`https://api.thecatapi.com/v1/images/${options.id}`, {
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
                fetch(`https://api.thecatapi.com/v1/images/search${limit}${size}${categories}${breeds}`, {
                    method: "GET",
                    headers: {
                        "content-type": "application/json",
                        "x-api-key": this.constructor.TOKEN[0]
                    }
                }).then(res => {
                    res.json().then(data => {
                        if(options?.random) return resolve(new Image(data[Math.floor(Math.random() * data.length)]))
                        for(let image of data) {
                            collection.set(image["id"], new Image(image, this.constructor.TOKEN[0]))
                        }
                        resolve(collection)
                    })
                })
            }
        })

    }

    myImages(options = { id: "", limit: 0, order: "", categoryIDS: [], breedID: []}) {
        if(options?.id && options.limit || options?.id && options?.order || options?.id && options?.categoryIDS || options?.id && options.breedID) return Promise.reject("If ID is specified it must be the only one")
        if(options?.order && options.breedID) return Promise.reject("If breed ID is specified order is useless")
        if(typeof options?.id !== "string" && options?.id) return Promise.reject("TypeError id must be type string")
        let random = `&order=${options.order}`
        let limit = options.limit ? `?limit=${options.limit}` : `?limit=10`
        let breed = options.breedID ? `&breed_id=${options.breedID}` : ""
        let category = options.categoryIDS ? `&category_ids=${options.categoryIDS}` : ""
        return new Promise((resolve, rej) => {
            if(options.id) {
                fetch(`https://api.thecatapi.com/v1/images`, {
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
                fetch(`https://api.thecatapi.com/v1/images${limit}${random}${breed}${category}`, {
                    method: "GET",
                    headers: {
                        "content-type": "application/json",
                        "x-api-key": this.constructor.TOKEN[0]
                    }
                }).then(res => {
                    res.json().then(data => {
                        for(let image of data) {
                            collection.set(image["id"], new Image(image, this.constructor.TOKEN[0]))
                        }
                        resolve(collection)
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
            fetch(`https://api.thecatapi.com/v1/images/upload`, {
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
            axios.delete(`https://api.thecatapi.com/v1/images/${id}`, {
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
}

ImageManager.TOKEN = []

module.exports = ImageManager