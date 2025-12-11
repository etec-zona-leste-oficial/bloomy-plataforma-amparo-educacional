import AsyncStorage from '@react-native-async-storage/async-storage';
import Constants from 'expo-constants';
import { getApp, getApps, initializeApp } from 'firebase/app';
import { getAuth, getReactNativePersistence, initializeAuth } from 'firebase/auth';

// Configuração do Firebase
// Prioridade: 1. .env (desenvolvimento), 2. app.json extra (build), 3. fallback
const firebaseConfig = {
  apiKey: process.env.EXPO_PUBLIC_FIREBASE_API_KEY || 
          Constants.expoConfig?.extra?.firebaseApiKey,
  authDomain: process.env.EXPO_PUBLIC_FIREBASE_AUTH_DOMAIN || 
              Constants.expoConfig?.extra?.firebaseAuthDomain,
  projectId: process.env.EXPO_PUBLIC_FIREBASE_PROJECT_ID || 
             Constants.expoConfig?.extra?.firebaseProjectId,
  storageBucket: process.env.EXPO_PUBLIC_FIREBASE_STORAGE_BUCKET || 
                 Constants.expoConfig?.extra?.firebaseStorageBucket,
  messagingSenderId: process.env.EXPO_PUBLIC_FIREBASE_MESSAGING_SENDER_ID || 
                     Constants.expoConfig?.extra?.firebaseMessagingSenderId,
  appId: process.env.EXPO_PUBLIC_FIREBASE_APP_ID || 
         Constants.expoConfig?.extra?.firebaseAppId,
  measurementId: process.env.EXPO_PUBLIC_FIREBASE_MEASUREMENT_ID || 
                 Constants.expoConfig?.extra?.firebaseMeasurementId,
};

// Log para debug
console.log('Firebase Config:', {
  source: process.env.EXPO_PUBLIC_FIREBASE_API_KEY ? '.env' : 
          (Constants.expoConfig?.extra?.firebaseApiKey ? 'app.json' : 'MISSING'),
  apiKey: firebaseConfig.apiKey ? '***' + firebaseConfig.apiKey.slice(-4) : 'MISSING',
  projectId: firebaseConfig.projectId || 'MISSING',
});

// Validação
const requiredKeys = ['apiKey', 'authDomain', 'projectId', 'storageBucket', 'messagingSenderId', 'appId'];
const missing = requiredKeys.filter((k) => !firebaseConfig[k]);
if (missing.length) {
  console.error('⚠️ Firebase config incompleta! Variáveis faltando:', missing);
}

// Inicializa Firebase apenas se ainda não foi inicializado (previne erro de HMR)
/** @type {import('firebase/auth').Auth} */
let auth;

if (getApps().length === 0) {
  const app = initializeApp(firebaseConfig);
  auth = initializeAuth(app, {
    persistence: getReactNativePersistence(AsyncStorage),
  });
  console.log('✅ Firebase inicializado pela primeira vez');
} else {
  const app = getApp();
  auth = getAuth(app);
  console.log('♻️ Firebase já estava inicializado (HMR)');
}

export { auth };

