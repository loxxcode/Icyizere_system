const { MongoClient } = require('mongodb');
require('dotenv').config();

const uri = process.env.MONGO_URI || 'mongodb+srv://diope2diope:3IpTZ6hGwXkEdgm7@cluster0.poyyb0c.mongodb.net/icyizere?retryWrites=true&w=majority';

async function run() {
  const client = new MongoClient(uri);
  
  try {
    console.log('Connecting to MongoDB Atlas...');
    await client.connect();
    console.log('✅ Successfully connected to MongoDB Atlas');
    
    const db = client.db('icyizere');
    const collections = await db.listCollections().toArray();
    
    console.log('\n📂 Collections in the database:');
    if (collections.length === 0) {
      console.log('No collections found.');
      console.log('This is normal if you haven\'t saved any data yet.');
    } else {
      collections.forEach(collection => {
        console.log(`- ${collection.name}`);
      });
    }
  } catch (error) {
    console.error('❌ Error:', error.message);
    console.log('\nTroubleshooting tips:');
    console.log('1. Check your internet connection');
    console.log('2. Make sure your IP is whitelisted in MongoDB Atlas');
    console.log('3. Verify your MongoDB Atlas credentials');
  } finally {
    await client.close();
  }
}

run();
