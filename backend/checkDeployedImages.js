const https = require('https');

https.get('https://ecommerce-backend-wrtf.onrender.com/api/products', (res) => {
  let data = '';
  res.on('data', (chunk) => data += chunk);
  res.on('end', () => {
    try {
      const products = JSON.parse(data);
      const names = ['iPhone 15', 'Sony Bravia 55 Inch TV', 'OnePlus 13'];
      const found = products.filter(p => names.includes(p.name)).map(p => ({ id: p._id, name: p.name, image: p.image }));
      console.log(JSON.stringify(found, null, 2));
    } catch (e) {
      console.error('Parse error', e.message);
      console.log(data);
    }
  });
}).on('error', (err) => { console.error('Request error', err.message); process.exit(1); });
