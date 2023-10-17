const express = require('express');
const cors = require('cors');
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

app.get("/", (req,res)=>{
    res.send("Automotiv data v101 server is on and running...")
})
app.get("/cars", (req,res)=>{
    res.send(cars)
})
app.listen(port, ()=>{
   console.log(`Your server is running on PORT : ${port}`);
})