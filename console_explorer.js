const Web3 = require('web3');
const web3 = new Web3('https://mainnet.infura.io/v3/api-key');

async function getBlock(blockNumber) {
    return await web3.eth.getBlock(blockNumber);
}

async function getTransaction(txHash) {
    return await web3.eth.getTransaction(txHash);
}

async function getBalance(address) {
    return await web3.eth.getBalance(address);
}

async function main() {
    const blockNumber = 'latest';
    const block = await getBlock(blockNumber);
    console.log(`Block Number: ${block.number}`);
    console.log(`Block Hash: ${block.hash}`);
    console.log(`Block Timestamp: ${block.timestamp}`);

    const txHash = '0x742d35cc6634c0532925a3b844bc454e4438f44e30174ae4009b49c1a7a6d09';
    const transaction = await getTransaction(txHash);
    console.log(`Transaction Hash: ${transaction.hash}`);
    console.log(`Transaction from: ${transaction.from}`);
    console.log(`Transaction to: ${transaction.to}`);
    console.log(`Transaction value: ${transaction.value}`);

    const address = '0x742d35cc6634c0532925a3b844bc454e4438f44e30174ae4009b49c1a7a6d09';
    const balance = await getBalance(address);
    console.log(`Balance of ${address}: ${balance} wei`);
}

main();



