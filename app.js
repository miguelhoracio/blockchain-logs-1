const express = require("express");
const app = express();
const port = 3000;
const { Block, Blockchain } = require("./blockchain");
const chain = new Blockchain();

app.post("/create", (req, res) => {
  // save into blockchain
  // return success message
  res.json({ message: "Log successfully added" });
});
app.get("/read/:id", (req, res) => {
  const log = "";
  // read from blockchain
  // return element from blockchain
  res.json({ data: log });
});

// app.listen(port, () => console.log(`Example app listening on port ${port}!`));

chain.addBlock(new Block("2017-01-01", { log: "" }));
console.log(JSON.stringify(chain, null, 4));
console.log("Is blockchain valid? " + chain.checkValid());
