const Base = require("./Base");
let BreedManager = require("./BreedManager").default
let CategoryManager = require("./CategoryManager").default
let VoteManager = require("./VoteManager").default
let FavouriteManager = require("./FavouriteManager").default
let ImageManager = require("./ImageManager").default
class Client extends Base {
    /**
     * The breeds manager
     * @return {BreedManager}
     */ 
    get breeds() {
        return new BreedManager(this.api)
    }
    /**
     * The Category Manager
     * @return {CategoryManager}
     */
    get categories() {
        return new CategoryManager(this.api)
    }
    /**
     * The Vote manager
     */
    get votes() {
        return new VoteManager(this.api)
    }
    /**
     * The favourite manager
     */
    get favourites() {
        return new FavouriteManager(this.api)
    }
    /**
     * The image manager
     */
    get images() {
        return new ImageManager(this.api)
    }
}

module.exports = Client