const express = require('express');
const cors = require('cors');
const { MongoClient, ServerApiVersion } = require('mongodb');
const app = express()
const port = process.env.PORT || 5000;


const uri = `mongodb+srv://${process.env.USER_NAME}:${process.env.PASSWORD}@cluster0.emy94.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
const collection = client.db("laptopStore").collection("laptopProduct");
async function run () {
  try{

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