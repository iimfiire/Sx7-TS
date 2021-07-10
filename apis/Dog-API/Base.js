class Base {
    /**
     * Logins to the API
     * @param {string} id - Your API key from the dog API
     */
    login(token) {
        if(!process.env.TOKEN && !token) throw new Error("Please specify a fucking token")
        this.api = token
    }
}

module.exports = Base