import express from "express"
import { readFile } from "fs/promises"
import { join, extname } from "path"
import { cwd, env } from "process"

function mimetype(requestPath: string) {
    switch(extname(requestPath)) {
        case ".js": return "text/javascript"
        case ".html": return "text/html"
        case ".css": return "text/css"
        case ".svg": return "image/svg+xml"
        case ".json": return "application/json"
        case ".png": return "image/png"
        case ".ico": return "image/png"
        default: throw new Error("mimetype not found: " + requestPath)
    }
} 
function main() {    
    let app = express()
    app.use(async (req, res, next) => {
        res.status(200)
        res.contentType("application/pdf")
        res.send(await readFile("./dist/resume.pdf"))
    })

    app.get('/resume', async (req, res) => {
        res.status(200)
        res.contentType("application/pdf")
        res.send(await readFile("./dist/resume.pdf"))
    })

    app.get("/healthy", (req, res) => {
        res.status(200)
        res.contentType("json")
        res.send({"healthy": "ok"})
    })

    app.get("/health", (req, res) => {
        res.status(200)
        res.contentType("json")
        res.send({"healthy": "ok"})
    })

    if(env.SMARTBONDS_PROD) {
        app.listen(80, () => {
            console.log("api listening in port 80") 
         })
    } else {
        app.listen(8080, () => {
            console.log("api listening in port 8080") 
         })
    }   
}

main()