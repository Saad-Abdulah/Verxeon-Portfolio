const { initializeApp } = require('firebase/app');
const { getFirestore, collection, getDocs, updateDoc, doc } = require('firebase/firestore');

const firebaseConfig = {
  apiKey: "AIzaSyC1BXcfU8JnvqajvpKEA_u6I9qVxepgjy0",
  authDomain: "devsol-website.firebaseapp.com",
  projectId: "devsol-website",
  storageBucket: "devsol-website.firebasestorage.app",
  messagingSenderId: "537658496952",
  appId: "1:537658496952:web:162754de8bcb6adcb7614d",
  measurementId: "G-DXZ1MP1KG7"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app, "(default)");

const orderMap = {
  'Web Development': 1,
  'Agents & Automation': 2,
  'SEO and Social Media Marketing': 3,
  'AI & Machine Learning': 4,
  'Android App Development': 5,
  'Cloud Computing': 6,
};

(async () => {
  const snap = await getDocs(collection(db, 'services'));
  for (const d of snap.docs) {
    const data = d.data();
    const name = data.name;
    const order = orderMap[name];
    if (order) {
      await updateDoc(doc(db, 'services', d.id), { order, $updatedAt: new Date().toISOString() });
      console.log('Set order', order, 'for', name);
    } else {
      console.log('No order mapping for', name);
    }
  }
  console.log('Done setting order.');
})();
