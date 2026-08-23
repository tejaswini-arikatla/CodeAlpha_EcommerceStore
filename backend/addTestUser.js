const dotenv = require('dotenv');
const { MongoClient } = require('mongodb');
const bcrypt = require('bcryptjs');

dotenv.config();

const localUri = process.env.MONGO_URI;
if (!localUri) {
  console.error('Missing MONGO_URI in .env');
  process.exit(1);
}

function makeDbUri(uri, dbName) {
  return uri.replace(/(\/)([^/?]+)(\?.*)?$/, (m, p1, db, q) => `${p1}${dbName}${q||''}`);
}

const dbTargets = [
  { name: 'ecommerceDB', uri: localUri },
  { name: 'test', uri: makeDbUri(localUri, 'test') },
];

const user = {
  name: 'Test User',
  email: 'test@example.com',
  password: 'Test1234',
};

(async () => {
  const hashed = await bcrypt.hash(user.password, 10);

  for (const target of dbTargets) {
    const client = new MongoClient(target.uri);
    try {
      await client.connect();
      const db = client.db(target.name);
      const res = await db.collection('users').findOneAndUpdate(
        { email: user.email },
        { $set: { name: user.name, email: user.email, password: hashed } },
        { upsert: true, returnDocument: 'after' }
      );

      console.log(`DB=${target.name} ->`, res.value ? `OK (${res.value.email})` : 'UPSERTED');
    } catch (e) {
      console.error(`DB=${target.name} ERROR`, e.message);
    } finally {
      await client.close();
    }
  }

  console.log('\nTest user created/updated (email: test@example.com password: Test1234)');
})();
