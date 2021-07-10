let Base = require("./Base.js")
const BreedManager = require("./BreedManager")
const CategoryManager = require("./CategoryManager")
const FavouriteManager = require("./FavouriteManager")
const ImageManager = require("./ImageManager")
let VoteManager = require("./VoteManager")
class Client extends Base {
    /**
     * The votes manager
     * @return {VoteManager}
     */
    get votes() {
        return new VoteManager(this.api)
    }
    /**
     * The categories manager
     * @returns {CategoryManager}
     */
    get categories() {
        return new CategoryManager()
    }
    /**
     * The Breed manager
     * @return {BreedManager}
     */
    get breeds() {
        return new BreedManager(this.api)
    }
    /**
     * The favourite manager
     * @return {FavouriteManager}
     */
    get favourites() {
        return new FavouriteManager(this.api)
    }
    /**
     * The images manager
     * @return {ImageManager}
     */
    get images() {
        return new ImageManager(this.api)
    }
}
module.exports = Client