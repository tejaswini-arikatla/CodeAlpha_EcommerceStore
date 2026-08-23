const { MongoClient, ObjectId } = require('mongodb');

const uri = 'mongodb+srv://arikatlasairadhikatejaswini_db_user:V6UIiufcCqTUCBLn@cluster0.dxkohti.mongodb.net/test?retryWrites=true&w=majority';

const updates = [
  {
    id: '6a36a71780dcb3d00dd86986',
    image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: '6a36a90c80dcb3d00dd86992',
    image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: '6a36a92680dcb3d00dd86994',
    image: 'https://images.unsplash.com/photo-1510552776732-01acc9d0f1a6?auto=format&fit=crop&w=800&q=80',
  },
];

(async () => {
  const client = new MongoClient(uri);
  try {
    await client.connect();
    const db = client.db('test');

    for (const update of updates) {
      const result = await db.collection('products').findOneAndUpdate(
        { _id: new ObjectId(update.id) },
        { $set: { image: update.image } },
        { returnDocument: 'after' }
      );

      if (!result.value) {
        console.error('Missing product', update.id);
      } else {
        console.log('Updated', result.value.name, result.value.image);
      }
    }
  } catch (error) {
    console.error(error);
    process.exit(1);
  } finally {
    await client.close();
  }
})();