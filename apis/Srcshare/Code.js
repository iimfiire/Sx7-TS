class Code {
    constructor(data = {}, id, date) {
        /**
         * @private
         */
        this._id = id?.match(/(http(s)?:\/\/)?(www\.)?srcshare\.io\/\?id=.+/gim)?.[0].replace(/(http(s)?:\/\/)?(www\.)?srcshare\.io\/\?id=/gim, "") || id
        /**
         * @private
         */
        this._bsontype = data?._bsontype
        /**
         * @private
         */
        this._code = data?.code
        /**
         * @private
         */
        this._error = data?.error
        /**
         * @private
         */
        this._language = data?.language
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
        this._view = data?.views
        /**
         * @private
         */
        this._scope = data?.scope
        /**
         * @private
         */
        this._url = `https://srcshare.io/?id=${this._id}`
        /**
         * When this is created. Only for uploaded codes made with .create
         */
        this.createdAt = (!date ? undefined : new Date(date))
        /**
         * @private
         */
        this._createdTimestamp = (!this.createdAt ? "" : this.createdAt.getTime())
    }
    /**
     * The bson type for this code
     * @return {string}
     */
    get bsontype() {
        return this._bsontype
    }
    /**
     * The code
     * @return {string}
     */
    get code() {
        return decodeURIComponent(this._code)
    }
    /**
     * The language used in this code
     * @return {string}
     */
    get language() {
        return this._language
    }
    /**
     * THe title of this code
     * @return {string}
     */
    get title() {
        return this._title
    }
    /**
     * The description for this code
     * @return {string}
     */
    get description() {
        return this._description
    }
    /**
     * How many views this has
     * @return {number}
     */
    get views() {
        return this._view
    }
    /**
     * The id of this code
     * @return {string}
     */
    get id() {
        return this._id
    }
    /**
     * The url of this code
     * @return {string}
     */
    get url() {
        return this._url
    }
    /**
     * The epoch when this is created at. Only for uploaded codes made with .create
     * @return {number}
     */
    get createdTimestamp() {
        return this._createdTimestamp
    }
    /**
     * The error in this code
     * @return {string}
     */
    get error() {
        return this._error
    }
}

module.exports = Code