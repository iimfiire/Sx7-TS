class Category {
    constructor(data) {
        /**
         * @private
         */
        this._id = "id" in data ? data.id : null
        /**
         * @private
         */
        this._name  = "name" in data ? data.name : null
    }
    /**
     * Gets the ID(s) of this category
     * @return {number}
     */
    get id() {
        return this._id
    }
    /**
     * Gets this category name(s)
     * @return {string}
     */
    get name() {
        return this._name
    }
}

module.exports = Category