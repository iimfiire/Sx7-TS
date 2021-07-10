let DocsManager = require("./DocsManager").default
class Base {
    /**
     * The docs manager
     */
    get docs() {
        return new DocsManager()
    }
}

module.exports = Base