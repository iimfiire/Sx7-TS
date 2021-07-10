class Country {
    constructor(data = {}) {
        this._infected = data?.infected
        /**
         * @private
         */
        this._tested = data?.tested
        /**
         * @private
         */
        this._recovered = data?.recovered
        /**
         * @private
         */
        this._deceased = data?.deceased
        /**
         * @private
         */
        this._country = data?.country
        /**
         * @private
         */
        this._moreData = data?.moreData
        /**
         * @private
         */
        this._historyData = data?.historyData
        /**
         * @private
         */
        this._sourceURL = data?.sourceUrl
        this.updatedAt = new Date(data?.lastUpdatedApify)
        /**
         * @private
         */
        this._updatedTimestamp = this.updatedAt.getTime()
    }
    /**
     * How many people are infected in this country
     * @return {number}
     */
    get infected() {
        return this._infected
    }
    /**
     * How many people are tested
     * @return {number}
     */
    get tested() {
        return this._tested
    }
    /**
     * How many people have recovered
     * @return {number}
     */
    get recovered() {
        return this._recovered
    }
    /**
     * How many people have died
     * @return {number}
     */
    get deceased() {
        return this._deceased
    }
    /**
     * The country
     * @return {string}
     */
    get country() {
        return this._country
    }
    /**
     * URL for more data
     * @return {string}
     */
    get moreData() {
        return this._moreData
    }
    /**
     * The histroy data url
     * @return {string}
     */
    get historyData() {
        return this._historyData
    }
    /**
     * The source url
     * @return {string}
     */
    get sourceURL() {
        return this._sourceURL
    }
    /**
     * The epoch of when this info is updated
     * @return {number}
     */
    get updatedTimestamp() {
        return this._updatedTimestamp
    }
}

module.exports = Country