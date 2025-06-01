const mongoose = require('mongoose');
require('dotenv').config();

const MONGO_URI = process.env.MONGO_URI || 'mongodb+srv://diope2diope:3IpTZ6hGwXkEdgm7@cluster0.poyyb0c.mongodb.net/icyizere?retryWrites=true&w=majority';

async function checkDatabase() {
  try {
    console.log('Connecting to MongoDB Atlas...');
    await mongoose.connect(MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    
    console.log('✅ Successfully connected to MongoDB Atlas');
    
    // List all collections
    const collections = await mongoose.connection.db.listCollections().toArray();
    console.log('\n📂 Collections in the database:');
    if (collections.length === 0) {
      console.log('No collections found in the database.');
      console.log('This is normal if you haven\'t saved any data yet.');
    } else {
      collections.forEach(collection => {
        console.log(`- ${collection.name}`);
      });
    }
    
    console.log('\nTo see your data in MongoDB Atlas:');
    console.log('1. Go to https://cloud.mongodb.com/');
    console.log('2. Select your project');
    console.log('3. Click on "Collections"');
    console.log('4. Make sure you\'re looking at the "icyizere" database');
    
  } catch (error) {
    console.error('❌ Error connecting to MongoDB Atlas:', error.message);
    console.log('\nTroubleshooting tips:');
    console.log('1. Check your internet connection');
    console.log('2. Verify your MongoDB Atlas IP whitelist allows your current IP');
    console.log('3. Make sure your database user has the correct permissions');
  } finally {
    // Close the connection
    mongoose.connection.close();
  }
}

checkDatabase();
