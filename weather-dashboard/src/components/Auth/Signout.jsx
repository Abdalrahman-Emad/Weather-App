import { signOut } from 'firebase/auth';
import { auth } from '../../firebase';

const logOut = async () => {
  try {
    await signOut(auth);
  } catch (error) {
    console.error('Error signing out:', error.message);
    throw error;
  }
};

export { logOut };
