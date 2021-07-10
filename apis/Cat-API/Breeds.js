class Breeds {
    constructor(data = {}) {
        /**
         * @private
         */
        this._weight = "weight" in data ? data.weight : null
        /**
         * @private
         */
        this._id = "id" in data ? data.id : null
        /**
         * @private
         */
        this._name = "name" in data ? data.name : null
        /**
         * @private
         */
        this._cfaURL = "cfa_url" in data ? data.cfa_url : null
        /**
         * @private
         */
        this._vetStreetURL = "vetstreet_url" in data ? data.vetstreet_url : null
        /**
         * @private
         */
        this._vcaHospitalsURL = "vcahospitals_url" in data ? data.vcahospitals_url : null
        /**
         * @private
         */
        this._temperament = "temperament" in data ? data.temperament : null
        /**
         * @private
         */
        this._origin = "origin" in data ? data.origin : null
        /**
         * @private
         */
        this._countryCodes = "country_codes" in data ? data.country_codes : null
        /**
         * @private
         */
        this._countryCode = "country_code" in data ? data.country_code : null
        /**
         * @private
         */
        this._description = "description" in data ? data.description : null
        /**
         * @private
         */
        this._lifeSpan = "life_span" in data ? data.life_span : null
        /**
         * @private
         */
        this._indoor = "indoor" in data ? data.indoor : null
        /**
         * @private
         */
        this._lap = "lap" in data ? data.lap : null
        /**
         * @private
         */
        this._altNames = "alt_names" in data ? data.alt_names : null
        /**
         * @private
         */
        this._adaptability = "adaptability" in data ? data.adaptability : null
        /**
         * @private
         */
        this._affectionLevel = "affection_level" in data ? data.affection_level : null
        /**
         * @private
         */
        this._childFriendly = "child_friendly" in data ? data.child_friendly : null
        /**
         * @private
         */
        this._dogFriendly = "dog_friendly" in data ? data.dog_friendly : null
        /**
         * @private
         */
        this._energyLevel = "energy_level" in data ? data.energy_level : null
        /**
         * @private
         */
        this._grooming = "grooming" in data ? data.grooming : null
        /**
         * @private
         */
        this._healthIssues = "health_issues" in data ? data.health_issues : null
        /**
         * @private
         */
        this._intelligence = "intelligence" in data ? data.intelligence : null
        /**
         * @private
         */
        this._sheddingLevel = "shedding_level" in data ? data.shedding_level : null
        /**
         * @private
         */
        this._socialNeeds = "social_needs" in data ? data.social_needs : null
        /**
         * @private
         */
        this._strangerFriendly = "stranger_friendly" in data ? data.stranger_friendly : null
        /**
         * @private
         */
        this._vocalisation = "vocalisation" in data ? data.vocalisation : null
        /**
         * @private
         */
        this._experimental = "experimental" in data ? data.experimental : null
        /**
         * @private
         */
        this._hairless = "hairless" in data ? data.hairless : null
        /**
         * @private
         */
        this._natural = "natural" in data ? data.natural : null
        /**
         * @private
         */
        this._rare = "rare" in data ? data.rare : null
        /**
         * @private
         */
        this._rex = "rex" in data ? data.rex : null
        /**
         * @private
         */
        this._suppresesedTail = "suppressed_tail" in data ? data.suppressed_tail : null
        /**
         * @private
         */
        this._shortLegs = "short_legs" in data ? data.short_legs : null
        /**
         * @private
         */
        this._wikipediaURL = "wikipedia_url" in data ? data.wikipedia_url : null
        /**
         * @private
         */
        this._hypoallergenic = "hypoallergenic" in data ? data.hypoallergenic : null
        /**
         * @private
         */
        this._referenceImageID = "reference_image_id" in data ? data.reference_image_id : null
        /**
         * @private
         */
        this._image = "image" in data ? data.image : null
    }
    /**
     * The weight for this breed in imperial and metricc system
     */
    get weight() {
        return {
            imperial: `${this._weight.imperial}`,
            metric: `${this._weight.metric}`
        }
    }
    /**
     * The ID of this breed
     * @return {string}
     */
    get id() {
        return this._id
    }
    /**
     * The name of this breed
     * @return {string}
     */
    get name() {
        return this._name
    }
    /**
     * The CFA URL for this breed
     * @return {string}
     */
    get cfaURL() {
        return this._cfaURL
    }
    /**
     * The vet street url for this breed
     * @return {string}
     */
    get vetStreetURL() {
        return this._vetStreetURL
    }
    /**
     * The VCA Hospital URL for this breed
     * @return {string}
     */
    get vcaHospitalsURL() {
        return this._vcaHospitalsURL
    }
    /**
     * Thee temperament for this breed
     * @return {string}
     */
    get temperament() {
        return this._temperament
    }
    /**
     * The origin for this breed
     * @return {string}
     */
    get origin() {
        return this._origin
    }
    /**
     * The country codes for this breed
     * @return {string}
     */
    get countryCodes() {
        return this._countryCodes
    }
    /**
     * The country code for this breed
     * @return {string}
     */
    get countryCode() {
        return this._countryCode
    }
    /**
     * The description for this breed
     * @return {string}
     */
    get description() {
        return this._description
    }
    /**
     * The life span for this breed
     * @return {string}
     */
    get lifeSpan() {
        return this._lifeSpan
    }
    /**
     * How indoor is this breed
     * @return {number} 
     */
    get indoor() {
        return this._indoor
    }
    /**
     * If this breed is lap
     * @return {number}
     */
    get lap() {
        return this._lap
    }
    /**
     * The alternate names for this breed
     * @return {string}
     */
    get altNames() {
        return this._altNames
    }
    /**
     * The adaptability of this breed
     * @return {number}
     */
    get adaptability() {
        return this._adaptability
    }
    /**
     * The level of affection of this breed
     * @return {number}
     */
    get affectionLevel() {
        return this._affectionLevel
    }
    /**
     * How child friendly this breed is
     * @return {number}
     */
    get childFriendly() {
        return this._childFriendly
    }
    /**
     * How dog friendly this breed is
     * @return {number}
     */
    get dogFriendly() {
        return this._dogFriendly
    }
    /**
     * The energy level this breed has
     * @return {number}
     */
    get energyLevel() {
        return this._energyLevel
    }
    /**
     * The grooming for this breed
     * @return {number}
     */
    get grooming() {
        return this._grooming
    }
    /**
     * How many health issues this breed has
     * @return {number}
     */
    get healthIssues() {
        return this._healthIssues
    }
    /**
     * The intelligence for this breed
     * @return {number}
     */
    get intelligence() {
        return this._intelligence
    }
    /**
     * The level of shedding this breed makes
     * @return {number}
     */
    get sheddingLevel() {
        return this._sheddingLevel
    }
    /**
     * The social needs for this breed
     * @return {number}
     */
    get socialNeeds() {
        return this._socialNeeds
    }
    /**
     * How stranger friendly this breed is
     * @return {number}
     */
    get strangerFriendly() {
        return this._strangerFriendly
    }
    /**
     * The vocalisation for this breed
     * @return {number}
     */
    get vocalisation() {
        return this._vocalisation
    }
    /**
     * If experimental
     * @return {boolean}
     */
    get experimental() {
        if(!this._experimental) {
            return false
        } else {
            return true
        }
    }
    /**
     * If hairless
     * @return {boolean}
     */
    get hairless() {
        if(!this._hairless) {
            return false
        } else {
            return true
        }
    }
    /**
     * If natural
     * @return {boolean}
     */
    get natural() {
        if(!this._natural) {
            return false
        } else {
            return true
        }
    }
    /**
     * If rare
     * @return {boolean}
     */
    get rare() {
        if(!this._rare) {
            return false
        } else {
            return true
        }
    }
    /**
     * If rex
     * @return {boolean}
     */
    get rex() {
        if(!this._rex) {
            return false
        } else {
            return true
        }
    }
    /**
     * If the tail is suppressed for this breed
     * @return {boolean}
     */
    get suppressedTail() {
        if(!this._suppresesedTail) {
            return false
        } else {
            return true
        }
    }
    /**
     * The wikipedia URL for this breed
     * @return {string}
     */
    get wikipediaURL() {
        return this._wikipediaURL
    }
    /**
     * The reference image ID for this breed
     * @return {string}
     */
    get referenceImageID() {
        return this._referenceImageID
    }
    /**
     * The image info for this breed
     */
    get image() {
        return {
            id: `${this._image.id}`,
            width: +this._image.width,
            height: +this._image.height,
            url: `${this._image.url}`
        }
    }
}

module.exports = Breeds