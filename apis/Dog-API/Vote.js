let fetch = require("node-fetch")
let axios = require("axios")
let data = new (require("../Cat-API/node_modules/form-data"))
class Vote {
    constructor(data = {}, token) {
        this.constructor.TOKEN.push(token)
        /**
         * @private
         */
         this._id = "id" in data ? data.id : null
         /**
          * @private
          */
         this._imageID = "image_id" in data ? data.image_id : null
         /**
          * @private
          */
         this._subID = "sub_id" in data ? data.sub_id : null
         /**
          * When this vote was created
          */
         this.createdAt = "created_at" in data ? new Date(data.created_at) : null
         /**
          * @private
          */
         this._createdAtTimestamp = this.createdAt?.getTime()
         /**
          * @private
          */
         this._value = "value" in data ? data.value : null
         /**
          * @private
          */
         this._countryCode = "contry_code" in data ? data.country_code : null
    }
    /**
    * @private
    */
   search(id) {
       return new Promise((resolve, rej) => {
           fetch(`https://api.thedogapi.com/v1/votes`,{
               method: "GET",
               headers: {
                   "content-type": "application/json",
                   "x-api-key": this.constructor.TOKEN[0]
               }
           }).then(res => {
               res.json().then(data => {
                   resolve(data.find(value => value.image_id === id || value.id === id))
               })
           })
       })
   }
    /**
     * The id for this vote
     * @return {number}
     */
    get id() {
        return this._id
    }
    /**
     * The image ID for ths vote
     * @return {string}
     */
    get imageID() {
        return this._imageID
    }
    /**
     * The sub ID for this vote
     * @return {string}
     */
    get subID() {
        return this._subID
    }
    /**
     * The timestamp of when this vote is created
     * @return {number}
     */
    get createdAtTimestamp() {
        return this._createdAtTimestamp
    }
    /**
     * The value of the vote
     * @return {number}
     */
    get value() {
        return this._value
    }
    /**
     * The country code for this vote
     * @return {string}
     */
    get countryCode() {
        return this._countryCode
    }
    /**
     * Deletes this vote
     * @return {Promise<string>}
     */
    async delete() {
        let search = await this.search(this.id)
        if(!search) return Promise.reject("This vote doesn't exist")
        data.append("content-type", "application/json")
        return new Promise((resolve, rej) => {
            fetch(`https://api.thedogapi.com/v1/votes/${this._id}`, {
                method: "DELETE",
                headers: {
                    ...data.getHeaders(),
                    "x-api-key": this.constructor.TOKEN[0]
                }
            }).then(res => {
                res.json().then(data => {
                    if(data.status === 400) throw new Error(`Invalid DELETE request. Message: ${data.message}`)
                    if(data.message === "SUCCESS") resolve(data.message)
                    rej("Error")
                })
            })
        })
    }

    /**
     * Downvotes this image
     * @return {Promise<this>}
    */
   async downVote() {
       let searcher = await this.search(this.imageID)
       if(!searcher) return Promise.reject("This image doesn't exist in your votes")
       return new Promise((resolve, rej) => {
           fetch(`https://api.thedogapi.com/v1/votes`, {
               method: "POST",
               headers: {
                   "content-type": "application/json",
                   "x-api-key": this.constructor.TOKEN[0]
               },
               body: JSON.stringify(this.subID ? {
                   image_id: this.imageID,
                   sub_id: this.subID,
                   value: 0
               } : {
                   image_id: this.imageID,
                   value: 0
               })
           }).then(res => {
               res.json().then(async data => {
                    if(data.status === 400) throw new Error(`Invalid POST request. Message: ${data.message}`)
                    let search = await this.search(data.id)
                    resolve(new this.constructor(search))
               })
           })
       })
   }

   /**
    * Upvotes this image
    * @return {string}
    */
   async vote() {
       let search = await this.search(this.imageID)
       if(search) return Promise.reject("This vote already exists")
       return new Promise((resolve, rej) => {
           fetch(`https://api.thedogapi.com/v1/votes`, {
               method: "POST",
               headers: {
                   "content-type": "application/json",
                   "x-api-key": this.constructor.TOKEN[0]
               },
               body: JSON.stringify(this.subID ? {
                   image_id: this.imageID,
                   sub_id: this.subID,
                   value: 1
               } : {
                   image_id: this.imageID,
                   value: 1
               })
           }).then(res => {
               res.json().then(async data => {
                    if(data.status === 400) throw new Error(`Invalid POST request. Message: ${data.message}`)
                    let search = await this.search(data.id)
                    resolve(new this.constructor(search)) 
               })
           })
       })
   }
}

Vote.TOKEN = []

module.exports = Vote