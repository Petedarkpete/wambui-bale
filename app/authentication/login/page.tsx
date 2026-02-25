"use client";

import { useEffect, useState } from "react";
import { auth, db } from "@/lib/firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  updateProfile,
  User,
} from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";

export default function LoginPage() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      setUser(firebaseUser);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const handleRegister = async () => {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );

    const newUser = userCredential.user;

    // Add username to auth profile
    await updateProfile(newUser, {
      displayName: username,
    });

    // Save extra user data in Firestore
    await setDoc(doc(db, "users", newUser.uid), {
      uid: newUser.uid,
      username,
      email,
      createdAt: new Date(),
    });
  };

  const handleLogin = async () => {
    //handle response
    const userCredential = await signInWithEmailAndPassword(auth, email, password);

    const user = userCredential.user;

    console.log("User logged in:", user);

    console.log("UID:", user.uid);
    console.log("Email:", user.email);
    console.log("Display Name:", user.displayName);

  };

  const handleLogout = async () => {
    await signOut(auth);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <div className="p-8 bg-white shadow-xl rounded-2xl w-96 text-center">
        {user ? (
          <>
            <h1 className="text-2xl font-bold mb-1">
              Welcome {user.displayName}
            </h1>

            <button
              onClick={handleLogout}
              className="w-full py-2 bg-red-500 text-white rounded-lg"
            >
              Sign Out
            </button>
          </>
        ) : (
          <>
            <h1 className="text-2xl font-bold mb-6">Login / Register</h1>

            <input
              type="text"
              placeholder="Username"
              className="w-full mb-3 p-2 border rounded"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />

            <input
              type="email"
              placeholder="Email"
              className="w-full mb-3 p-2 border rounded"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <input
              type="password"
              placeholder="Password"
              className="w-full mb-4 p-2 border rounded"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            <button
              onClick={handleRegister}
              className="w-full py-2 bg-blue-600 text-white rounded mb-3"
            >
              Register
            </button>

            <button
              onClick={handleLogin}
              className="w-full py-2 bg-green-600 text-white rounded"
            >
              Login
            </button>
          </>
        )}
      </div>
    </div>
  );
}
