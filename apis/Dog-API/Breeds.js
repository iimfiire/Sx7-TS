class Breeds {
    constructor(data = {}, token) {
        /**
         * @private
         */
        this.constructor.TOKEN.push(token)
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
         this._referenceImageID = "reference_image_id" in data ? data.reference_image_id : null
         /**
          * @private
          */
         this._bredFor = "bred_for" in data ? data.bred_for : null
         /**
          * @private
          */
         this._breedGroup = "breed_group" in data ? data.breed_group : null
         /**
          * @private
          */
         this._countryCode = "country_code" in data ? data.country_code : null
         /**
          * @private
          */
         this._height = "height" in data ? data.height : null
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
      * The life span for this breed
      * @return {string}
      */
     get lifeSpan() {
         return this._lifeSpan
     }
     /**
      * The reference image ID for this breed
      * @return {string}
      */
     get referenceImageID() {
         return this._referenceImageID
     }

     /**
      * This breed bred for
      * @return {string}
      */
     get bredFor() {
         return this._bredFor
     }
     /**
      * The breed group for this breed
      * @return {string}
      */
     get breedGroup() {
         return this._breedGroup
     }
     /**
      * The country code for this breed
      * @return {string}
      */
     get countryCode() {
         return this._countryCode
     }
     /**
      * The height for this breed
      */
     get height() {
         return {
             imperial: `${this._height.imperial}`,
             metric: `${this._height.width}`
         }
     }
}
Breeds.TOKEN = []
module.exports = Breeds