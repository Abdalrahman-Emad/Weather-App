import { auth, db } from '../firebase';
import { collection, addDoc, getDocs, deleteDoc, doc, writeBatch } from 'firebase/firestore';
import { onAuthStateChanged } from 'firebase/auth';

const saveSearchHistory = async (userId, cityName) => {
    if (typeof userId !== 'string' || typeof cityName !== 'string') {
      console.error('Invalid data types');
      return;
    }
  
    try {
      const user = await new Promise((resolve, reject) => {
        onAuthStateChanged(auth, (user) => {
          if (user) {
            resolve(user);
          } else {
            reject(new Error('No user is authenticated'));
          }
        });
      });

      if (!user) throw new Error('User is not authenticated');

      await addDoc(collection(db, 'users', userId, 'searchHistory'), {
        cityName,
        timestamp: new Date().toISOString(),
      });
    } catch (error) {
      console.error('Error saving search history:', error);
      throw error;
    }
};

const fetchSearchHistory = async (userId) => {
  try {
    const user = await new Promise((resolve, reject) => {
      onAuthStateChanged(auth, (user) => {
        if (user) {
          resolve(user);
        } else {
          reject(new Error('No user is authenticated'));
        }
      });
    });

    if (!user) throw new Error('User is not authenticated');

    const querySnapshot = await getDocs(collection(db, 'users', userId, 'searchHistory'));
    const searchHistory = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    return searchHistory;
  } catch (error) {
    console.error('Error fetching search history:', error);
    throw error;
  }
};

// Function to delete all search history for a user
const clearSearchHistory = async (userId) => {
    try {
        const querySnapshot = await getDocs(collection(db, 'users', userId, 'searchHistory'));
        const batch = writeBatch(db); // Use writeBatch from the modular SDK
        
        querySnapshot.forEach((doc) => {
            batch.delete(doc.ref); // Add each delete operation to the batch
        });

        await batch.commit(); // Commit the batch operation
    } catch (error) {
        console.error('Error clearing search history:', error);
        throw error;
    }
};


export { saveSearchHistory, fetchSearchHistory, clearSearchHistory };