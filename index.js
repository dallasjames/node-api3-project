const express = require("express")
const server =  express()
const users = require("./users/userRouter")
const posts = require("./posts/postRouter")
const logger = require("./middleware/logger")

server.use(express.json())

server.use(logger())
server.use("/api/users", users)
server.use("/api/posts", posts)

server.listen(4000, () => {
    console.log("\n*** Server Running on http://localhost:4000 ***\n")
})