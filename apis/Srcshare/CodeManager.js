let Code = require("./Code.js")
let fetch = require("node-fetch")
let data = new (require("../Cat-API/node_modules/form-data"))
let fs = require("fs")
class CodeManager {
    constructor(data = []) {
        this.constructor.LANGUAGES = data
    }

    fetch(id, date) {
        if(typeof id !== "string") return Promise.reject("ID must be type string")
        let url = /(http(s)?:\/\/)?(www\.)?srcshare\.io\/\?id=.+/gim.test(id) ? id.match(/(http(s)?:\/\/)?(www\.)?srcshare\.io\/\?id=.+/gim)?.[0].replace(/(http(s)?:\/\/)?(www\.)?srcshare\.io\/\?id=/gim, "") : id
        data.append("content-type", "application/json")
        return new Promise((resolve, rej) => {
            fetch(`https://api.srcshare.io/code?id=${url}`, {
                method: "GET",
                headaers: {
                    ...data.getHeaders()
                }
            }).then(res => {
                res.json().then(data => {
                    if(!data?.code) return Promise.reject("No code found in that url, are you sure you input the right url?")
                    resolve(new Code(data, id, date))
                })
            })
        })
    }

    create(code, options = { error: "", description: "", language: "", title: ""}) {
        if(!code || !/^./gim.test(code)) return Promise.reject("Code is required")
        if(![".js", ".html", ".ts", ".txt"].some(value => code.endsWith(value))) return Promise.reject("That's not a coding extension")
        let language = !options?.language || ["html", "html/xml"].some(value => options?.language.toLowerCase() === value) ? "html/xml" : options?.language
        let filter = Object.keys(this.constructor.LANGUAGES).filter(value => value === language.toUpperCase())
        if(filter.length <= 0) return Promise.reject("That language is not supported")
        let fileCode = fs.readFileSync(code)
        if(!fileCode) return;
        let languages = language ? `language=${language}` : `language=${language}`
        let title = options?.title ? `&title=${options?.title}` : ""
        let description = options?.description ? `&description=${options?.description}` : ""
        return new Promise((resolve, rej) => {
            fetch(`https://api.srcshare.io/code?${languages}${title}${description}`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    code: encodeURIComponent(fileCode),
                    error: encodeURIComponent(!options?.error ? "" : options?.error),
                })
            }).then(res => {
                res.json().then(data => {
                    this.fetch(data, Date.now()).then(code => {
                        resolve(code)
                    })
                })
            })
        })
    }
}

CodeManager.LANGUAGES

exports["default"] = CodeManager