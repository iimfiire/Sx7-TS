let fetch = require("node-fetch")
const Country = require("./Country")
let collection = new (require("../Collection/childrenCache").RaidenCol)
class CountriesManager {
    fetch(options = { name: "", limit: 0}) {
        if(options?.name && options?.limit) return Promise.reject("You already specified ID")
        return new Promise((resolve, rej) => {
            fetch(`https://api.apify.com/v2/key-value-stores/tVaYRsPHLjNdNBu7S/records/LATEST?disableRedirect=true`, {
                method: "GET"
            }).then(res => {
                res.json().then(data => {
                    if(options?.name) return resolve(new Country(data.find(value => value.country === options?.name)))
                    if(options?.limit) {
                        let slicer = data.slice(0, options?.limit)
                        for(let country of slicer) {
                            collection.set(country["country"], new Country(country))
                        }
                        return resolve(collection)
                    }
                    for(let country of data) {
                        collection.set(country["country"], new Country(country))
                    }
                    return resolve(collection)
                })
            })
        })
    }
}

exports["default"] = CountriesManager