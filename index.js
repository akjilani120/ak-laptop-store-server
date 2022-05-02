const express = require('express');
const cors = require('cors');

const app = express()
const port = process.env.PORT || 5000;

const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = "mongodb+srv://laptopStore:<password>@cluster0.emy94.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
client.connect(err => {
  const collection = client.db("laptopStore").collection("laptopProduct");
  // perform actions on the collection object
  client.close();
});


// middle ware
app.use(cors())
app.use(express.json())

app.get('/', (req , res) =>{
    res.send("It is Laptop store shop")
})
app.listen(port, () =>{
    console.log("I am ak laptop store shop", port)
})