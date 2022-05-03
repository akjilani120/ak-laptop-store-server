const express = require('express');
const cors = require('cors');
const { MongoClient, ServerApiVersion } = require('mongodb');
const app = express()
const port = process.env.PORT || 5000;
 require('dotenv').config()

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.emy94.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
const collection = client.db("laptopStore").collection("laptopProduct");
async function run () {
  try{
    await client.connect();
    app.get('/products', async (req , res) =>{
      const query ={};
      const cursor = collection.find(query)
      const result = await cursor.toArray();
      res.send(result)

    })
  }finally{

  }
}
run().catch(console.dir)

// middle ware
app.use(cors())
app.use(express.json())

app.get('/', (req , res) =>{
    res.send("It is Laptop store shop")
})
app.listen(port, () =>{
    console.log("I am ak laptop store shop", port)
})