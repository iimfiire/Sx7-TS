const Breeds = require("./Breeds")
let axios = require("axios")
let Analysis = require("./Analysis.js").default
class Image {
    constructor(data = {}, token) {
        /**
         * @private
         */
        this._originalFileName = "original_filename" in data ? data.original_filename : null
        /**
         * @private
         */
        this._pending = "pending" in data ? data.pending : null
        /**
         * @private
         */
        this._approved = "approved" in data ? data.approved : null
        /**
         * @private
         */
        this._id = "id" in data ? data.id : null
        /**
         * @private
         */
        this._url = "url" in data ? data.url : null
        /**
         * @private
         */
        this._width = "width" in data ? data.width : null
        /**
         * @private
         */
        this._height = "height" in data ? data.height : null
        /**
         * @private
         */
        this._breeds = "breeds" in data ? data.breeds.map(value => new Breeds(value)) : null
        this.constructor.TOKEN.push(token)
    }
    /**
     * The id of this image
     * @return {string}
     */
    get id() {
        return this._id
    }
    /**
     * The url of this image
     * @return {string}
     */
    get url() {
        return this._url
    }
    /**
     * The width of this image
     * @return {number}
     */
    get width() {
        return this._width
    }
    /**
     * The height of this image
     * @return {number}
     */
    get height() {
        return this._height
    }
    /**
     * An array of breeds for this image
     * @return {Breeds[]}
     */
    get breeds() {
        return this._breeds
    }
    /**
     * Gets the original filename for this image. This only received if you just used create to upload an image
     * @return {string}
     */
    get originalFileName() {
        return this._originalFileName
    }
    /**
     * If it's pending, only when you just created an image
     * @return {boolean}
     */
    get pending() {
        if(!this._pending) {
            return false
        } else {
            return true
        }
    }
    /**
     * If it's approved, only when you just created an image
     * @return {boolean}
     */
    get approved() {
        if(!this._approved) {
            return false
        } else {
            return true
        }
    }
    /**
     * Deletes this image from your account
     * @return {Promise<string>}
     */
    async delete() {
        let search = await this.search(this.id)
        if(!search) return Promise.reject("Image ID is not found. Potential cause is it doesn't exist")
        return new Promise((resolve, rej) => {
            axios.delete(`https://api.thecatapi.com/v1/images/${this.id}`, {
                headers: {
                    "x-api-key": this.constructor.TOKEN[0]
                }
            }).then(res => {
                if(res.status !== 400) {
                    resolve(`Succeeded with status coode ${res.status}`)
                }
            }).catch(err => rej(err))
        })
    }
    /**
     * The analysis for this image
     * @return {Promise<Analysis>}
     */
    analysis() {
        return new Promise((resolve, rej) => {
            axios.get(`https://api.thecatapi.com/v1/images/${this.id}/analysis`, {
                headers: {
                    "x-api-key": this.constructor.TOKEN[0]
                }
            }).then(res => {
                for(let analysis of res.data) {
                    resolve(new Analysis(analysis))
                }
            }).catch(err => rej(err))
        })
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
}

Image.TOKEN = []

module.exports = Image