let Code = require("./Code.js")
let fetch = require("node-fetch")
let fs = require("fs")
class CodeManager {
    
    async fetch(id) {
        if(typeof id !== "string") return Promise.reject("Id must be type string")
        if(!id) return Promise.reject("Please specify an ID")
        let codeID = id?.match(/(http(s)?:\/\/)?(www\.)?starb\.in\/.+/gim)?.[0]?.replace(/(http(s)?:\/\/)?(www\.)?starb\.in\//gim, "") || id
        let replacer = codeID.lastIndexOf(".") === -1 ? codeID : codeID.slice(0, codeID.lastIndexOf("."))
        return new Promise((resolve, rej) => {
            fetch(`https://starb.in/documents/${replacer}`, {
                method: "GET"
            }).then(res => {
                res.json().then(data => {
                    return resolve(new Code(data))
                })
            })
        })
    }

    async create(file) {
        if(!file || !/^\./gim.test(file)) return Promise.reject("No Code specified")
        let code = fs.readFileSync(file)
        return new Promise((resolve, rej) => {
            fetch(`https://starb.in/documents`, {
                method: "POST",
                body: JSON.stringify(encodeURIComponent(code.toString()))
            }).then(res => {
                if(res.status === 200) {
                    res.json().then(data => {
                        this.fetch(data.key).then(code => {
                            return resolve(code)
                        })
                    })
                }
            })
        })
    }
}

exports["default"] = CodeManager