import React, {useEffect, useRef, useState} from 'react';
import Web3 from 'web3';
import { Container, Form, Input, Button, Table } from 'react-bootstrap';
import {logDOM} from "@testing-library/react";

const web3 = new Web3(new Web3.providers.HttpProvider('https://mainnet.infura.io/v3/api-key'));

let tx_ = []
function App() {

  const [blockNumber, setBlockNumber] = useState('');
  const [blockData, setBlockData] = useState(null);
  const [txData , setTxData] = useState(tx_);
   async function handleSubmit(e) {
    e.preventDefault();
        tx_=[];

        const block = await web3.eth.getBlock(blockNumber);
        const transactions = block.transactions.map(async (txHash) => {
          const tx = await web3.eth.getTransaction(txHash);
         tx_.push(tx)
          return tx;

      });

      await setTxData(tx_)
      await setBlockData(block);

  }




  return (

<>
    <Container>
        <h1>Ethereum Block Explorer</h1>
        <Form onSubmit={handleSubmit}>
            <Form.Group controlId="formBlockNumber">
                <Form.Label>Block Number</Form.Label>
                <input type="text" value={blockNumber} onChange={e => setBlockNumber(e.target.value)} />
            </Form.Group>
            <Button type="submit">Search</Button>
        </Form>
        <br></br>
        {blockData && (
            <Table striped bordered hover>
                <tbody>
                <tr>
                    <td>Number</td>
                    <td>{blockData.number}</td>
                </tr>
                <tr>
                    <td>Timestamp</td>
                    <td>{blockData.timestamp}</td>
                </tr>
                <tr>
                    <td>Hash</td>
                    <td>{blockData.hash}</td>
                </tr>
                <tr>
                    <td>Parent Hash</td>
                    <td>{blockData.parentHash}</td>
                </tr>
                <tr>
                    <td>Nonce</td>
                    <td>{blockData.nonce}</td>
                </tr>
                <tr>
                    <td>Transactions</td>
                    <td>{blockData.transactions.length}</td>
                </tr>
                <tr>
                    <td>Size</td>
                    <td>{blockData.size} bytes</td>
                </tr>
                </tbody>
            </Table>
        )}
    </Container>


    <div className="container">
        <section className="mt-4">
            <div className="container-fluid">
                <div className="row">
                    <div className="col">
                        <div className="card shadow">
                            <div className="card-header py-2">
                                <p className="lead text-info m-0"><strong>Block Data :</strong>&nbsp;</p>
                            </div>
                            <div className="card-body">
                                <div className="table-responsive table mb-0 pt-3 pe-2">
                                    <table className="table table-striped table-sm my-0 mydatatable">
                                        <thead>
                                        <tr>
                                            <th>From</th>
                                            <th>To</th>
                                            <th>Gas</th>
                                            <th>Hash</th>
                                            <th>Nonce</th>
                                            <th>Value</th>
                                        </tr>
                                        </thead>
                                        <tbody>
                                        {txData.map((e,i)=>
                                            <tr>
                                                <td>{txData[i] ? txData[i].from : ""}</td>
                                                <td>{txData[i] ? txData[i].to : ""}</td>
                                                <td>{txData[i] ? txData[i].gas : ""}</td>
                                                <td>{txData[i] ? txData[i].hash : ""}</td>
                                                <td>{txData[i] ? txData[i].nonce : ""}</td>
                                                <td>{txData[i] ? txData[i].value / 1000000000000000000 + " ETH": ""}</td>
                                            </tr>
                                        )}


                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    </div>
</>
  );
}

export default App;