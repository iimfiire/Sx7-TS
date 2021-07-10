let Manager = require("./Manager").default
class Base {
    /**
     * The MDN manager
     */
    get mdn() {
        return new Manager()
    }
}

module.exports = Base