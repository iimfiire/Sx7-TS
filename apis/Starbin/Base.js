let CodeManager = require("./CodeManager").default
class Base {
    /**
     * The code manager
     */
    get codes() {
        return new CodeManager()
    }
}

module.exports = Base