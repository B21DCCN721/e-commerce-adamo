/* eslint-disable @typescript-eslint/no-explicit-any */
import { signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut, EmailAuthProvider, reauthenticateWithCredential, updatePassword } from "firebase/auth";
import { auth } from "../configs/firebase";
import { persistor } from '../store';

const login = async (email: string, password: string) => {
  try {
    const result = await signInWithEmailAndPassword(auth, email, password);
    const user = result.user;
    const token = await user.getIdToken();
    localStorage.setItem('accessToken', token);
    localStorage.setItem('userId', user.uid);
    localStorage.setItem('isAuthenticated', 'true');
    return { user, token };
  } catch (error: any) {
    console.error("[Login] Failed:", error.code, error.message);
    throw error;
  }
};
const register = async (email: string, password: string) => {
  try {
    const result = await createUserWithEmailAndPassword(auth, email, password);
    const user = result.user;
    console.log("[Register] Success:", user);
    return { user };
  } catch (error: any) {
    console.error("[Register] Failed:", error.code, error.message);
    throw error;
  }
};
const logout = async () => {
  try {
    await signOut(auth);
    console.log("[Logout] Success");
    localStorage.clear();
    persistor.purge(); // Xóa hết dữ liệu đã persist (localStorage['persist:root'])
    window.location.replace("/login")
  } catch (error: any) {
    console.error("[Logout] Failed:", error.message);
    throw error;
  }
};
const changePassword = async (currentPassword: string, newPassword: string) => {
  const user = auth.currentUser;

  if (!user || !user.email) {
    throw new Error("User not logged in");
  }

  const credential = EmailAuthProvider.credential(user.email, currentPassword);

  try {
    await reauthenticateWithCredential(user, credential);
    await updatePassword(user, newPassword);
    console.log("[ChangePassword] Success");
  } catch (error: any) {
    console.error("[ChangePassword] Failed:", error.code, error.message);
    throw error;
  }
};

export { login, register, logout, changePassword };
