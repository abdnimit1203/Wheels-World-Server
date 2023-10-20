const express = require("express");
const cors = require("cors");
require("dotenv").config();
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
const brands = require("./brands.json");
const app = express();
const port = process.env.PORT || 3000;

//middle ware
app.use(cors());
app.use(express.json());

console.log(brands);

// MONGODB CONNECTION STRING

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.di78vms.mongodb.net/?retryWrites=true&w=majority`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function run() {
  try {
    await client.connect();
    //DATABASE AND COLLECTION STARTS

    const database = client.db("wheelsWorldDB");
    const productsCollection = database.collection("products");
    const cartCollection = database.collection("cart");

    //DATABASE AND COLLECTION ENDS


    //PRODUCTS 
    //CREATE PRODUCTS
    app.post("/products", async (req, res) => {
      const product = req.body;
      console.log("New Product", product);
      const result = await productsCollection.insertOne(product);
      res.send(result);
    });
    //READ ALL PRODUCTS
    app.get("/products", async (req, res) => {
      const cursor = productsCollection.find();
      const result = await cursor.toArray();
      res.send(result);
    });

    // get Brandname wise data
    app.get('/products/:brandName',async(req,res)=>{
      let brand = req.params.brandName;
      let query = { brandName: brand };
      const cursor =  productsCollection.find(query)
      const result = await cursor.toArray()
      console.log("Requested data: ",brand);
      res.send(result)
    })
    // get single wise data
    app.get('/products/single/:id',async(req,res)=>{
      const id = req.params.id
      const query= {_id: new ObjectId(id)}
      const cursor =  productsCollection.find(query)
      const result = await cursor.toArray()
      console.log("Requested data: ",id);
      res.send(result)
    })
    app.put('/products/single/:id',async(req,res)=>{
      const id = req.params.id
      const product = req.body
      console.log(id , product);

      const filter = { _id: new ObjectId(id) };
      const options = { upsert: true };
      const updateproduct ={
        $set:{
          brandName: product.brandName,
          imageURL: product.imageURL,
          modelName: product.modelName,
          price: product.price,
          ratings: product.ratings,
          short_description: product.short_description,
          type: product.type
          
         
        }
      }
      const result = await productsCollection.updateOne(filter, updateproduct, options);
      res.send(result)

    })

  
// CARTSSSSSSS
//CREATE PRODUCTS
app.post("/carts", async (req, res) => {
  const cart = req.body;
  console.log("New Cart", cart);
  const result = await cartCollection.insertOne(cart);
  res.send(result);
});
 //READ ALL CARTS
 app.get("/carts", async (req, res) => {
  const cursor = cartCollection.find();
  const result = await cursor.toArray();
  res.send(result);
});
// get userEmail wise data
app.get('/carts/:userEmail',async(req,res)=>{
  let email = req.params.userEmail;
  let query = { userEmail: email };
  const cursor =  cartCollection.find(query)
  const result = await cursor.toArray()
  console.log("Requested data: ",email);
  res.send(result)
})








    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log(
      "Pinged your deployment. You successfully connected to MongoDB!"
    );
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);

// server backend

app.get("/", (req, res) => {
  res.send("Automotiv data v101 server is on and running...");
});
app.get("/brands", (req, res) => {
  res.send(brands);
});
app.listen(port, () => {
  console.log(`Your server is running on PORT : ${port}`);
});
