import app from './index';
import { getFirestore } from 'firebase/firestore';

const db = getFirestore(app);

export default db;