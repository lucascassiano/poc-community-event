import * as IPFS from 'ipfs-core';

async function setup() {

    const node = await IPFS.create()

    const data = 'Hello, <YOUR NAME HERE>'

    // add your data to to IPFS - this can be a string, a Buffer,
    // a stream of Buffers, etc
    const results = await node.add(data)
    // console.log(results)
    const { cid } = results;
    console.log(cid)
    console.log(cid.toString())


    const stream = node.cat(cid.toString())
    let data2 = '';

    for await (const chunk of stream) {
        // chunks of data are returned as a Buffer, convert it back to a string
        data2 += chunk.toString()
    }

    console.log(data2);


    const obj = { simple: 'object' }
    const cid = await ipfs.dag.put(obj, { format: 'dag-cbor', hashAlg: 'sha2-512' })

    console.log(cid.toString())

}

setup();