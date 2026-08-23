const https = require('https');

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
  for (const update of updates) {
    const data = JSON.stringify({ image: update.image });

    const options = {
      hostname: 'ecommerce-backend-wrtf.onrender.com',
      path: `/api/products/${update.id}`,
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(data),
      },
    };

    await new Promise((resolve, reject) => {
      const req = https.request(options, (res) => {
        let body = '';
        res.on('data', (chunk) => (body += chunk));
        res.on('end', () => {
          console.log(`ID=${update.id} STATUS=${res.statusCode}`);
          console.log(body);
          resolve();
        });
      });

      req.on('error', reject);
      req.write(data);
      req.end();
    });
  }
})();