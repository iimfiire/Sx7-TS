let fetch = require("node-fetch")
let CountriesManager = require("./CountriesManager").default
class Base {
    /**
     * The covid manager
     */
    get countries() {
        return new CountriesManager()
    }
}

module.exports = Base