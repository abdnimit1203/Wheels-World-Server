const express = require('express');
const cors = require('cors');
require('dotenv').config()
const { MongoClient, ServerApiVersion } = require('mongodb');
const app = express()
const port = process.env.PORT || 3000

//dummy data to be deleted

const cars = [
    {
        brand: "BMW",
        model: "M3"
    },
    {
        brand: "Lamborghini",
        model: "Aventador"
    },
    {
        brand: "Toyota",
        model: "Supra"
    },
    {
        brand: "BMW",
        model: "M5"
    },
    {
        brand: "Lamborghini",
        model: "Huracane"
    },
    {
        brand: "Toyota",
        model: "Allion"
    },
    
]

//middle ware
app.use(cors())
app.use(express.json())



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
    // Connect the client to the server	(optional starting in v4.7)
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
app.get("/cars", (req,res)=>{
    res.send(cars)
})
app.listen(port, ()=>{
   console.log(`Your server is running on PORT : ${port}`);
})