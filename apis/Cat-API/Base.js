class Base {
    /**
     * Logins to the API to make request
     * @param {string} token - Your API key from the CAT API
     */
    login(token) {
        if(!process.env.TOKEN && !token) throw new Error("Please specify a fucking token")
        this.api = token
    }
}

module.exports = Base