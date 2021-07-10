let set = new (require("./sethandler.js").Set)
class Highlight {
    constructor(data = {}) {
        /**
         * @private
         */
        this._body = data?.body
        /**
         * @private
         */
        this._title = data?.title
    }

    /**
     * All the body for this highlight
     * @return {import("./Typings/setHandler").RaidenSet<string>}
     */
    get body() {
        for(let body of this._body) {
            set.add(body.split("\n").map(value => value.trim()).join(" "))
        }
        return set
    }
    /**
     * All the title for this highlight
     * @return {import("./Typings/setHandler").RaidenSet<string>}
     */
    get title() {
        for(let title of this._title) {
            set.add(title)
        }
        return set
    }
}

module.exports = Highlight