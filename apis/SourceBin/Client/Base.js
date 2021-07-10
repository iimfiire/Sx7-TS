let BinManager = require("..//Structures/BinManager").default
class Base {
    /**
     * @param {string} accessToken - Your access token
     * @param {string} refreshToken - Your refresh token
     */
    constructor(accessToken, refreshToken) {
        /**
         * @private
         */
        this.constructor.ACCESS = accessToken ?? null
        /**
         * @private
         */
        this.constructor.REFRESH = refreshToken ?? null
    }
    /**
     * The bins manager
     */
    get bins() {
        return new BinManager(this.constructor.ACCESS, this.constructor.REFRESH)
    }
}

module.exports = Base