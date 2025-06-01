const { MongoClient } = require('mongodb');
require('dotenv').config();

const uri = process.env.MONGO_URI || 'mongodb+srv://diope2diope:3IpTZ6hGwXkEdgm7@cluster0.poyyb0c.mongodb.net/icyizere?retryWrites=true&w=majority';

async function checkCollections() {
  const client = new MongoClient(uri);
  
  try {
    console.log('Connecting to MongoDB Atlas...');
    await client.connect();
    
    const db = client.db('icyizere');
    console.log('✅ Connected to database:', db.databaseName);
    
    // List all collections
    const collections = await db.listCollections().toArray();
    
    if (collections.length === 0) {
      console.log('\n⚠️  No collections found in the database.');
      console.log('This could be because:');
      console.log('1. No data has been saved yet');
      console.log('2. The database name in the connection string is incorrect');
      console.log('3. The user doesn\'t have permission to list collections');
    } else {
      console.log('\n📂 Collections found:');
      for (const collection of collections) {
        const count = await db.collection(collection.name).countDocuments();
        console.log(`- ${collection.name} (${count} documents)`);
      }
    }
    
  } catch (error) {
    console.error('❌ Error:', error.message);
    console.log('\nTroubleshooting tips:');
    console.log('1. Check your internet connection');
    console.log('2. Make sure your IP is whitelisted in MongoDB Atlas');
    console.log('3. Verify your MongoDB Atlas credentials in .env');
  } finally {
    await client.close();
  }
}

checkCollections();
