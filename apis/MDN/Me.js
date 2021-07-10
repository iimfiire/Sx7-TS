class Me {
    constructor(data = {}) {
        /**
         * @private
         */
        this._geo = data?.geo.country
    }

    /**
     * Your country
     * @return {string}
     */
    get country() {
        return this._geo
    }
}

module.exports = Me