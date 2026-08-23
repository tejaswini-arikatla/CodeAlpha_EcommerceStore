const dotenv = require('dotenv');
const mongoose = require('mongoose');
const Product = require('./models/Product');

dotenv.config();

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
  try {
    await mongoose.connect(process.env.MONGO_URI);
    for (const u of updates) {
      const product = await Product.findByIdAndUpdate(u.id, { image: u.image }, { new: true });
      if (!product) {
        console.error('Missing product', u.id);
      } else {
        console.log('Updated', product.name, product.image);
      }
    }
  } catch (error) {
    console.error(error);
    process.exit(1);
  } finally {
    await mongoose.disconnect();
  }
})();