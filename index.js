const express = require("express")
// const dotenv = require("dotenv")
// dotenv.config()
const server =  express()
const users = require("./users/userRouter")
const posts = require("./posts/postRouter")
const logger = require("./middleware/logger")

server.use(express.json())

server.use(logger())
server.use("/api/users", users)
server.use("/api/posts", posts)

const host = process.env.HOST || "0.0.0.0"
const port = process.env.PORT || 8080

server.listen(host, port, () => {
    console.log("\n*** Server Running on http://localhost:4000 ***\n")
})