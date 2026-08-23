const { MongoClient, ObjectId } = require('mongodb');

const uri = 'mongodb+srv://arikatlasairadhikatejaswini_db_user:V6UIiufcCqTUCBLn@cluster0.dxkohti.mongodb.net/test?retryWrites=true&w=majority';
const ids = [
  '6a36a71780dcb3d00dd86986',
  '6a36a90c80dcb3d00dd86992',
  '6a36a92680dcb3d00dd86994',
];

(async () => {
  const client = new MongoClient(uri);
  try {
    await client.connect();
    const db = client.db('test');
    const col = db.collection('products');
    for (const id of ids) {
      const oid = new ObjectId(id);
      const doc = await col.findOne({ _id: oid });
      console.log('ID', id, 'FOUND', !!doc, doc ? { name: doc.name, image: doc.image } : null);
    }
  } catch (error) {
    console.error(error);
    process.exit(1);
  } finally {
    await client.close();
  }
})();