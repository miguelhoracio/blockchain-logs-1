const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const { Block, Blockchain } = require("./blockchain");
const port = 3000;
const chain = new Blockchain();

app.use(bodyParser.urlencoded());
app.use(bodyParser.json());

app.post("/create", (req, res) => {
  let lengthChain = chain.chain.length;
  chain.addBlock(new Block("2017-01-01", { id: lengthChain, data: req.body }));
  res.json({ message: "Log successfully added" });
});

app.get("/read", (req, res) => {
  res.json(chain.chain);
});

app.get("/read/?id=:id", (req, res) => {
  res.json(chain.chain[req.id]);
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
