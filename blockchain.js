const SHA256 = require("crypto-js/sha256");

class Block {
  constructor(timestamp, data) {
    this.id = data.id;
    this.timestamp = timestamp;
    this.data = data.data;
    this.previousHash = "0";
    this.hash = this.calculateHash();
    this.nonce = 0;
  }
  calculateHash() {
    return SHA256(
      this.id + this.previousHash + this.timestamp + this.data + this.nonce
    ).toString();
  }
}

class Blockchain {
  constructor() {
    this.chain = [this.createGenesis()];
  }
  createGenesis() {
    return new Block("2017-01-01", { data: "{}", id: 0 });
  }
  latestBlock() {
    return this.chain[this.chain.length - 1];
  }
  addBlock(newBlock) {
    newBlock.previousHash = this.latestBlock().hash;
    newBlock.hash = newBlock.calculateHash();
    this.chain.push(newBlock);
  }
  checkValid() {
    for (let i = 1; i < this.chain.length; i++) {
      const currentBlock = this.chain[i];
      const previousBlock = this.chain[i - 1];
      if (currentBlock.hash !== currentBlock.calculateHash()) {
        return false;
      }
      if (currentBlock.previousHash !== previousBlock.hash) {
        return false;
      }
    }
    return true;
  }
}

module.exports = { Block, Blockchain };
