/* eslint-disable @typescript-eslint/no-explicit-any */
// services/auth.ts
import { signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut } from "firebase/auth";
import { auth } from "../configs/firebase";

const login = async (email: string, password: string) => {
  try {
    const result = await signInWithEmailAndPassword(auth, email, password);
    const user = result.user;
    const token = await user.getIdToken();
    localStorage.setItem('token', token);
    localStorage.setItem('isAuthenticated', 'true');
    console.log("[Login] Success:", user.email);
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
    console.log("[Register] Success:", user.email);
    return { user,};
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
    window.location.replace("/login")
  } catch (error: any) {
    console.error("[Logout] Failed:", error.message);
    throw error;
  }
};

export { login, register, logout };
