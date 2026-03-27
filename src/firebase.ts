import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore, doc, getDocFromServer } from 'firebase/firestore';
import firebaseConfig from '../firebase-applet-config.json';

console.log('Firebase Config Loaded:', {
  projectId: firebaseConfig.projectId,
  databaseId: firebaseConfig.firestoreDatabaseId
});

// Initialize Firebase SDK
let app;
try {
  app = initializeApp(firebaseConfig);
  console.log('Firebase App initialized successfully');
} catch (error) {
  console.error('Error initializing Firebase App:', error);
  throw error;
}

// Use the provided database ID, or default if not available
const databaseId = firebaseConfig.firestoreDatabaseId || undefined;

export const db = getFirestore(app, databaseId);
export const auth = getAuth(app);
