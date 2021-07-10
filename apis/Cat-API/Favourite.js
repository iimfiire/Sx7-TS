let  fetch = require("node-fetch")
class Favourite {
    constructor(data = {}, token) {
        this.constructor.TOKEN.push(token)
        this._id = "id" in data ? data.id : null
        /**
         * @private
         */
        this._userID = "user_id" in data ? data.user_id : null
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
     * The id for this favourite
     * @return {number}
     */
    get id() {
        return this._id
    }
    /**
     * Deletes this favourite
     * @return {Promise<string>}
     */
    delete() {
        return new Promise((resolve, rej) => {
            fetch(`https://api.thecatapi.com/v1/favourites/${this.id}`, {
                method: "DELETE",
                headers: {
                    "x-api-key": this.constructor.TOKEN[0]
                },
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
}

Favourite.TOKEN = []

module.exports = Favourite