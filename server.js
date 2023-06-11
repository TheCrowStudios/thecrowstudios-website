const express = require("express")
const vhost = require("vhost")
const http = require("http")
const https = require("https")
const fs = require("fs")
const fileDump = require("../File Dump/server")
const gunCrow = require("../Gun Crow/server")
const privateKey = fs.readFileSync("C:\\Certbot\\live\\www.thecrowstudios.com\\privkey.pem", "utf-8")
const certificate = fs.readFileSync("C:\\Certbot\\live\\www.thecrowstudios.com\\fullchain.pem", "utf-8")

const app = express()

fileDump.SetLoggingFunction(CreateLog)
gunCrow.SetLoggingFunction(CreateLog)

app.set("view-engine", "ejs")

app.use((req, res, next) => {
    if (req.hostname === "www.thecrowstudios.com")
    {
        res.redirect("//thecrowstudios.com")
        return
    }

    next()
})
app.use((req, res, next) => {
    let log = `${(new Date()).toLocaleString()} ${req.ip} ${req.hostname}${req.url}`
    fs.appendFile("log_verbose.txt", `${log}\n`, (err) => {
        if (err) console.log(err)
    })
    next()
})
app.use(vhost("filedump.thecrowstudios.com", fileDump))
app.use(vhost("guncrow.thecrowstudios.com", gunCrow))
app.use(express.static("public/"))

app.get("/", (req, res) => {
    CreateLog(req, `GET request to /`)
    res.render("index.ejs")
})

function CreateLog(req, text)
{
    let log = `${(new Date()).toLocaleString()} ${req.ip} ${req.hostname} ${text}`
    console.log(log)
    fs.appendFile("log.txt", `${log}\n`, (err) => {
        if (err) console.log(err)
    })
    fs.appendFile("log_verbose.txt", `${log}\n`, (err) => {
        if (err) console.log(err)
    })
}

const httpServer = http.createServer(app)
const httpsServer = https.createServer({ key: privateKey, cert: certificate }, app)

httpServer.listen(80)
httpsServer.listen(443)

//app.listen(80)