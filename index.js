const express = require("express")
const dotenv = require("dotenv")
const cors = require("cors")
const server =  express()
const users = require("./users/userRouter")
const posts = require("./posts/postRouter")
const logger = require("./middleware/logger")
const host = process.env.HOST || "127.0.0.1"
let port = process.env.PORT || 8080

dotenv.config()

server.use(express.json())
server.use(cors())

server.use(logger())
server.get("/", (req, res) => {
    res.status(200).json({
        message: process.env.SUPER_SECRET_PASSWORD || "respect my authoritauh"
    })
})
server.use("/api/users", users)
server.use("/api/posts", posts)

server.use("/", (req,res) => {
    res.status(200).json({
        message: "you made it"
    })
})
server.listen(port, host, () => {
    console.log(`\n*** Server Running ${host}:${port} ***\n`)
})