const { MongoClient } = require('mongodb');
require('dotenv').config();

const uri = 'mongodb+srv://diope2diope:3IpTZ6hGwXkEdgm7@cluster0.poyyb0c.mongodb.net/admin?retryWrites=true&w=majority';

async function createDatabase() {
  const client = new MongoClient(uri);
  
  try {
    console.log('Connecting to MongoDB Atlas...');
    await client.connect();
    
    // List all databases first
    const adminDb = client.db().admin();
    const databases = await adminDb.listDatabases();
    
    console.log('\n📊 Existing databases:');
    databases.databases.forEach(db => {
      console.log(`- ${db.name}`);
    });
    
    // Create a new database by inserting a document
    const dbName = 'icyizere_management';
    console.log(`\nCreating database '${dbName}'...`);
    
    const db = client.db(dbName);
    // Create a collection and insert a document to create the database
    await db.collection('init').insertOne({ created: new Date() });
    
    console.log(`✅ Successfully created database '${dbName}'`);
    
  } catch (error) {
    console.error('❌ Error:', error.message);
  } finally {
    await client.close();
  }
}

createDatabase();
