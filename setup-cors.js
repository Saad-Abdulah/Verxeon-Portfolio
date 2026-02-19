const { Storage } = require('@google-cloud/storage');

// Initialize Firebase Storage
const storage = new Storage({
  projectId: 'devsol-website',
  keyFilename: './service-account-key.json' // You'll need to download this from Firebase Console
});

async function setupCORS() {
  try {
    const bucketName = 'devsol-website.appspot.com';
    const bucket = storage.bucket(bucketName);
    
    await bucket.setCorsConfiguration([
      {
        origin: ['http://localhost:3000', 'http://localhost:3001', 'https://devsol-website.firebaseapp.com'],
        method: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
        responseHeader: ['Content-Type', 'x-goog-resumable', 'Authorization'],
        maxAgeSeconds: 3600
      }
    ]);
    
    console.log('CORS configuration set successfully!');
  } catch (error) {
    console.error('Error setting CORS:', error);
  }
}

setupCORS();
