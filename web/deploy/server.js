// @ts-check
const express = require("express")
const app = express()
const path = require("path")
const fs = require("fs")
fs.readdir(path.resolve("../build"), (error, data) => {
  console.log(error, data)
})
app.use(express.static(__dirname + "/../build"))
app.get("/", (req, res) => {
  res.sendFile(__dirname + "/../build/index.html")
})
const port = process.env.PORT || 5000
app.listen(port, () => {
  console.log("listening on ", port)
})
