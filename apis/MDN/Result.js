const Highlight = require("./Highlight")

class Result {
    constructor(data = {}) {
        /**
         * @private
         */
        this._url = `https://developer.mozilla.org${data?.mdn_url}`
        /**
         * @private
         */
        this._score = data?.score
        /**
         * @private
         */
        this._title = data?.title
        /**
         * @private
         */
        this._locale = data?.locale
        /**
         * @private
         */
        this._slug = data?.slug
        /**
         * @private
         */
        this._popularity = data?.popularity
        /**
         * @private
         */
        this._archived = data?.archived
        /**
         * @private
         */
        this._summary = data?.summary
        /**
         * @private
         */
        this._highlight = new Highlight(data?.highlight)
    }
    /**
     * The url of this document
     * @return {string}
     */
    get url() {
        return this._url
    }
    /**
     * The score for this document
     * @return {number}
     */
    get score() {
        return this._score
    }
    /**
     * The title for this document
     * @return {string}
     */
    get title() {
        return this._title
    }
    /**
     * The locale for this document
     * @return {string}
     */
    get locale() {
        return this._locale
    }
    /**
     * The slug for this document
     * @return {string}
     */
    get slug() {
        return this._slug
    }
    /**
     * How popular is this document
     * @return {number}
     */
    get popularity() {
        return this._popularity
    }
    /**
     * If this document is archived or not
     * @return {boolean}
     */
    get archived() {
        return this._archived
    }
    /**
     * The summary for this document
     * @return {string}
     */
    get summary() {
        return this._summary.split("\n").map(value => value.trim()).join(" ")
    }
    /**
     * The highlight of this document
     */
    get highlight() {
        return this._highlight
    }
}

module.exports = Result