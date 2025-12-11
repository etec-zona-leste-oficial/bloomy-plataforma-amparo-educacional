import {
    createUserWithEmailAndPassword,
    deleteUser,
    EmailAuthProvider,
    reauthenticateWithCredential,
    signInWithEmailAndPassword,
    signOut,
    updateEmail,
    updatePassword,
    updateProfile,
} from 'firebase/auth';
import { auth } from './firebaseconfig';

const handleLogin = async (email: string, password: string) => {
  const userCredential = await signInWithEmailAndPassword(auth, email, password);
  return userCredential;
};

const handleSignUp = async (email: string, password: string, displayName?: string) => {
  const userCredential = await createUserWithEmailAndPassword(auth, email, password);
  const user = userCredential.user;
  if (displayName) {
    await updateProfile(user, { displayName });
  }
  return userCredential;
};

const handleSignOut = async () => {
  await signOut(auth);
};

const updateUserName = async (newDisplayName: string) => {
  const user = auth.currentUser;
  if (user) {
    await updateProfile(user, { displayName: newDisplayName });
  }
};

const updateUserEmail = async (newEmail: string) => {
  const user = auth.currentUser;
  if (user) {
    await updateEmail(user, newEmail);
  }
};

const updateUserPassword = async (newPassword: string) => {
  const user = auth.currentUser;
  if (user) {
    await updatePassword(user, newPassword);
  }
};

const handleDeleteAccount = async (password: string) => {
  const user = auth.currentUser;
  if (user && user.email) {
    const credential = EmailAuthProvider.credential(user.email, password);
    await reauthenticateWithCredential(user, credential);
    await deleteUser(user);
  }
};

export {
    handleDeleteAccount, handleLogin, handleSignOut, handleSignUp, updateUserEmail, updateUserName, updateUserPassword
};

