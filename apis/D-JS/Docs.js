class Docs {
    constructor(data = {}, url, version) {
        /**
         * @private
         */
        this._name = data?.name
        /**
         * @private
         */
        this._description = data?.description
        /**
         * @private
         */
        this._internalType = data?.internal_type
        /**
         * @private
         */
        this._internalType === "prop" || this._internalType === "method" ? this._parent = data?.parent : delete data["parent"]
        /**
         * @private
         */
        this._internalType === "prop" || this._internalType === "method" ? this._type = data?.type : delete data["type"]
        /**
         * @private
         */
        this._internalType === "prop" || this._internalType === "method" ? delete data["props"] : this._props = data?.props
        /**
         * @private
         */
        this._internalType === "prop" || this._internalType === "method" ? delete data["methods"] : this._methods = data?.methods
        /**
         * @private
         */
        this._url = this._internalType !== "prop" && this._internalType !== "method" ? `https://discord.js.org/#/docs/${!url ? "main" : url}/${!version ? "stable" : version}/class/${this._name}` : `https://discord.js.org/#/docs/${!url ? "main" : url}/${!version ? "stable" : version}/class/${this._parent}?scrollTo=${this._name}`
    }
    /**
     * The name of this docs
     * @return {string}
     */
    get name() {
        return this._name
    }
    /**
     * The description for this docs
     * @return {string}
     */
    get description() {
        return this._description
    }
    /**
     * The internal type of this docs
     * @return {string}
     */
    get internalType() {
        return this._internalType
    }
    /**
     * The parent of this property
     * @return {string}
     */
    get parent() {
        return this._parent
    }
    /**
     * The type of this docs
     * @return {string}
     */
    get type() {
        return this._type
    }
    /**
     * The props this class has, if any
     * @return {string[]}
     */
    get props() {
        if(!this._props) return this
        return this._props
    }
    /**
     * The methods this class has
     * @return {string[]}
     */
    get methods() {
        if(!this._methods) return this
        return this._methods
    }
    /**
     * The url of this documentation
     */
    get url() {
        return this._url
    }
}

module.exports = Docs