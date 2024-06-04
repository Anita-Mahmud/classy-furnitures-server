const express = require('express')
const app = express()
const port = process.env.PORT || 5000

const cors = require("cors");
require('dotenv').config();
app.use(express.json());
app.use(cors());


const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = `mongodb+srv://classy-furnitures:classy-furnitures@cluster0.qspwkqa.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

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

    const classyDB = client.db("classy-furnitures");
    const userCollection = classyDB.collection("userCollection");

    app.post('/user',async(req,res)=>{
      const user = req.body;
      const result = await userCollection.insertOne(user);
      res.send({
        status: success,
        data: result
      })
    })

    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);


app.get('/',(req,res)=>{
  res.send('Classy furnitures')
})

app.listen(port,()=>{
  console.log(`Classy furnitures port-${port}`)
})











