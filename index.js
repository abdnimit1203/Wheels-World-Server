const express = require('express');
const cors = require('cors');
require('dotenv').config()
const { MongoClient, ServerApiVersion } = require('mongodb');
const brands = require('./brands.json');
const app = express()
const port = process.env.PORT || 3000

//middle ware
app.use(cors())
app.use(express.json())

console.log(brands);

// MONGODB CONNECTION STRING

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.di78vms.mongodb.net/?retryWrites=true&w=majority`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
  
    await client.connect();













    
    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);



// server backend

app.get("/", (req,res)=>{
    res.send("Automotiv data v101 server is on and running...")
})
app.get("/brands", (req,res)=>{
    res.send(brands)
})
app.listen(port, ()=>{
   console.log(`Your server is running on PORT : ${port}`);
})