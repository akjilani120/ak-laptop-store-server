const express = require('express');
const cors = require('cors');
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const jwt = require("jsonwebtoken")
const app = express()
const port = process.env.PORT || 5000;
require('dotenv').config()
app.use(cors())
app.use(express.json())
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.emy94.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
const collection = client.db("laptopStore").collection("laptopProduct");

async function run() {
  try {
    await client.connect();
    // post token
    app.post('/login', async(req ,res) =>{
      const email = req.body.email;     
      const token =jwt.sign(email, process.env.ACCESS_TOKEN_SECRET)  
      res.send({token})
    })

    // Use total products
    app.get('/products', async (req, res) => {
      const query = {};
      const cursor = collection.find(query)
      const result = await cursor.toArray();
      res.send(result)
    })
    // use to email and email user add details
    app.get('/myproducts', async(req,res)=>{
      const email=  req.query.email;
      const query= {email}
      const  cursor= collection.find(query)
      const result= await cursor.toArray()
      res.send(result)
    })
    // case to single item
    app.get('/products/:id', async (req, res) => {
      const id = req.params.id;
      const query = { _id: ObjectId(id) }
      const result = await collection.findOne(query);
      res.send(result)
    })
    // update data
    app.put('/products/:id', async(req, res) =>{
      const id =req.params.id;      
      const userUpdate = req.body;     
      const filter ={ _id: ObjectId(id) }
      const option ={ upsert:true}
      const userDoc ={
        $set:userUpdate
      }
      const result = await collection.updateOne(filter , userDoc, option);
      res.send(result)
    })
    // delete item
    app.delete('/products/:id', async(req , res) =>{
      const id = req.params.id
      const query = { _id: ObjectId(id)}
      const result = await collection.deleteOne(query);
      res.send(result)
    })
    
    app.post('/products', async (req , res) =>{
      const newProduct = req.body;
      const result = await collection.insertOne(newProduct)
      res.send(result)
    } )
  }finally{

  }
}
run().catch(console.dir)

// middle ware


app.get('/', (req, res) => {
  res.send("It is Laptop store shop")
})
app.listen(port, () => {
  console.log("I am ak laptop store shop", port)
})