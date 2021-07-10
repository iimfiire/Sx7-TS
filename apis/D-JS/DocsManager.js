let fetch = require("node-fetch")
const Docs = require("./Docs")
class DocsManager {
    fetch(query, options = { type: "", version: ""}) {
        if(!query) return Promise.reject("Please specify a query")
        return new Promise((resolve, rej) => {
            fetch(`https://djsdocs.sorta.moe/v2/?src=${options?.type && options?.type !== "main" ? options?.type : options?.type === "main" ? "stable" : "stable"}&q=${encodeURIComponent(query)}`, {
                method: "GET"
            }).then(res => {
                res.json().then(data => {
                    if(data.status === 404) return Promise.reject("Query not found")
                    resolve(new Docs(data, options?.type, options?.version))
                })
            })
        })        
    }
}

exports["default"] = DocsManager