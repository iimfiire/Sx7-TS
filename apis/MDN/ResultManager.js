const Result = require("./Result.js")

let collection = new (require("../Collection/childrenCache.js").RaidenCol)
class ResultManager {
    constructor(data = {}, limit) {
        /**
         * @private
         */
        this.constructor.LIMIT = limit
        /**
         * @private
         */
        this._meta = data?.metadata

        if(this.constructor.LIMIT > 0) {
            for(let result of data.documents.slice(0, this.constructor.LIMIT)) {
                collection.set(result["title"], new Result(result))
            }
            /**
             * @private
             */
            this._documents = collection
        } else {
            for(let result of data.documents) {
                collection.set(result["title"], new Result(result))
            }
            /**
             * @private
             */
            this._documents = collection
        }
         
    }
    /**
     * The documents cache
     * @return {import("../Typings/collection").RaidenCol<string, Result>}
     */
    get cache() {
        return this._documents
    }
    /**
     * The metadata for this result
     * 
     */
    get meta() {
        return {
            /**
             * How long it took in milliseconds
             */
            ms: +this._meta.took_ms,
            /**
             * The total of this search
             */
            total: {
                /**
                 * The value 
                 */
                value: +this._meta.total.value,
                /**
                 * The relation
                 */
                relation: `${this._meta.total.relation}`
            },
            /**
             * The size of this search
             */
            size: +this._meta.size,
            /**
             * The page this search is on
             */
            page: +this._meta.page
        }
    }
}

ResultManager.LIMIT

module.exports = ResultManager