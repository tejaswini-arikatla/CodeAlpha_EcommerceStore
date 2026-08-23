const { MongoClient, ObjectId } = require('mongodb');
const uri = 'mongodb+srv://arikatlasairadhikatejaswini_db_user:V6UIiufcCqTUCBLn@cluster0.dxkohti.mongodb.net';
const ids = [
  '6a36a71780dcb3d00dd86986',
  '6a36a90c80dcb3d00dd86992',
  '6a36a92680dcb3d00dd86994',
];
const dbNames = ['ecommerceDB', 'test'];

(async () => {
  for (const dbName of dbNames) {
    const client = new MongoClient(`${uri}/${dbName}?retryWrites=true&w=majority`);
    await client.connect();
    const db = client.db(dbName);
    const products = await db.collection('products').find({ _id: { $in: ids.map(id => new ObjectId(id)) } }).project({ _id:1, name:1, image:1 }).toArray();
    const count = await db.collection('products').countDocuments();
    console.log(`DB: ${dbName}`, {count, products});
    await client.close();
  }
})();