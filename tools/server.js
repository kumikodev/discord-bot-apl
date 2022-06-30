const express = require("express")
const app = express()

app.get("/", (req, res) => {
  res.send("Yes")
})

function keepAlive() {
  app.listen(3000, () => { console.log("24/7 Hosting is Ready!") });
}

module.exports = keepAlive; // You can remove all of this and deleet the file if you have hacker plan 