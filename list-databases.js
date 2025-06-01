const { MongoClient } = require('mongodb');
require('dotenv').config();

const uri = 'mongodb+srv://diope2diope:3IpTZ6hGwXkEdgm7@cluster0.poyyb0c.mongodb.net/admin?retryWrites=true&w=majority';

async function listDatabases() {
  const client = new MongoClient(uri);
  
  try {
    console.log('Connecting to MongoDB Atlas...');
    await client.connect();
    
    const adminDb = client.db().admin();
    console.log('✅ Connected to admin database');
    
    const result = await adminDb.listDatabases();
    
    console.log('\n📊 Available databases:');
    result.databases.forEach(db => {
      console.log(`- ${db.name} (Size: ${(db.sizeOnDisk / 1024 / 1024).toFixed(2)} MB)`);
    });
    
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

listDatabases();
