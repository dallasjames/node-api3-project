const express = require("express")
const dotenv = require("dotenv")
const server =  express()
const users = require("./users/userRouter")
const posts = require("./posts/postRouter")
const logger = require("./middleware/logger")
const host = process.env.HOST || "127.0.0.1"
const port = process.env.PORT

dotenv.config()

server.use(express.json())

server.use(logger())
server.use("/", (req,res) => {
    res.status(200).json({
        message: "you made it"
    })
})
server.use("/api/users", users)
server.use("/api/posts", posts)

server.listen(port, host, () => {
    console.log(`\n*** Server Running on http://${host}:${port} ***\n`)
})