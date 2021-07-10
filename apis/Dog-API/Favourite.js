let fetch = require("node-fetch")
class Favourite {
    constructor(data = {}, token) {
        this.constructor.TOKEN.push(token)
        /**
         * @private
         */
        this._id = "id" in data ? data.id : null
        /**
         * @private
         */
         this._imageID = "image_id" in data ? data.image_id : null
         /**
          * @private
          */
         this._subID = "sub_id" in data ? data.sub_id : null
         /**
          * @private
          */
         this._createdAt = "created_at" in data ? new Date(data.created_at) : null
         /**
          * @private
          */
         this._createdTimestamp = this._createdAt?.getTime()
         /**
          * @private
          */
         this._image = "image" in data ? data.image : null
    }
    /**
     * The id of this favourite
     * @return {number}
     */
    get id() {
        return this._id
    }
    /**
     * The image ID for this favourite
     * @return {string}
     */
    get imageID() {
        return this._imageID
    }
    /**
     * The subID of this favourite
     * @return {stirng}
     */
    get subID() {
        return this._subID
    }
    /**
     * When this is created at
     * @return {Date}
     */
    get createdAt() {
        return this._createdAt
    }
    /**
     * The epoch of when this favourite is created
     * @return {number}
     */
    get createdTimestamp() {
        return this._createdTimestamp
    }
    /**
     * The images of this favourite
     */
    get image() {
        return {
            id: `${this._image.id}`,
            url: `${this.image.url}`
        }
    }
    /**
     * Deletes this favourite
     * @return {Promise<string>}
     */
    delete() {
        if(!this._id) return Promise.reject("This favourite doesn't exist")
        return new Promise((resolve, rej) => [
            fetch(`https://api.thedogapi.com/v1/favourites/${this._id}`, {
                method : "DELETE",
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
        ])
    }

}
Favourite.TOKEN = []
module.exports = Favourite