const express = require('express')
const  mongoose  = require('mongoose')

const app= express()

//mongoose.connect('mongodb+srv://lockedin:<db_password>@lockedin.s9ex3.mongodb.net/?retryWrites=true&w=majority&appName=lockedin')



const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = "mongodb+srv://lockedin:<lockedin123>@lockedin.s9ex3.mongodb.net/?retryWrites=true&w=majority&appName=lockedin";

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true, //hii
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
    await client.close();
  }
}
run().catch(console.dir);
