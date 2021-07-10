class Code {
    constructor(data = {}) {
        /**
         * @private
         */
        this._key = data?.key
        /**
         * @private
         */
        this._code = data?.data
        /**
         * @private
         */
        this._url = `https://starb.in/${this._key}`
    }

    /**
     * The key for this paste
     * @return {string}
     */
    get key() {
        return this._key
    }
    /**
     * The code for this paste
     * @return {string}
     */
    get code() {
        return this._code
    }
    /**
     * The url of this paste
     * @return {string}
     */
    get url() {
        return this._url
    }
     
}

module.exports = Code