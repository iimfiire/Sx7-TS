let fetch = require("node-fetch")
class Code {
    constructor(data, id, token = {
        accessToken: "",
        refreshToken: ""
    }) {
        /**
         * @private
         */
        this.constructor.ACCESS = token.accessToken
        /**
         * @private
         */
        this.constructor.REFRESH = token.refreshToken
        /**
         * @private
         */
        this._url = `https://sourceb.in/${id}`
        /**
         * @private
         */
        this._id = id
        this.createdAt = /((t|T)oday)/gim.exec(data?.today)?.[0] ? new Date() : data?.today ? new Date(data.today) : null
        /**
         * @private
         */
        this._createdTimestamp = this.createdAt?.getTime() ?? null
        /**
         * @private
         */
        this._view = data?.view
        /**
         * @private
         */
        this._title = data?.title
        /**
         * @private
         */
        this._description = data?.description
        /**
         * @private
         */
        this._highlight = data?.highlight
        /**
         * @private
         */
        this._code = data?.code
    }
    /**
     * The url for this bin
     * @return {string}
     */
    get url() {
        return this._url
    }
    /**
     * The created timestamp
     * @return {number}
     */
    get createdTimestamp() {
        return this._createdTimestamp
    }
    /**
     * How many view this bin has
     * @return {number}
     */
    get view() {
        return +this._view.replace(/[^\d]+/gim, "")
    }
    /**
     * The code for this bin
     * @return {string}
     */
    get code() {
        return this._code
    }
    /**
     * The title for this bin
     * @return {string}
     */
    get title() {
        return this._title
    }
    /**
     * The description for this bin
     * @return {string}
     */
    get description() {
        return this._description
    }
    /**
     * The syntax highlight for this bin
     * @return {string}
     */
    get highlight() {
        return this._highlight
    }
    /**
     * The id for this bin
     * @return {string}
     */
    get id() {
        return this._id
    }
    /**
     * Deletes this bin. true if successful.
     * @return {Promise<boolean>}
     */
    delete() {
        return new Promise((resolve, rej) => {
            fetch(`https://sourceb.in/api/bins/${this._id}`, {
                method: "DELETE",
                headers: {
                    "cookie": `access_token=${this.constructor.ACCESS}; refresh_token=${this.constructor.REFRESH}`
                }
            }).then(res => {
                if(res.status !== 200) return Promise.reject(`Error. Status: ${res.status}`)
                res.json().then(data => {
                    if(data.success) return resolve(true)
                    return resolve(false)
                })
            })
        })
    }

    toString() {
        return this._url
    }
}

module.exports = Code