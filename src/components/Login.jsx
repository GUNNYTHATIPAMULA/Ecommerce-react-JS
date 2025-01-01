import React, { useState, useEffect } from 'react'
import Header from '../containers/Header'
import { Footer } from '../containers';
import { auth } from '../firebase/firebase';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { onAuthStateChanged } from 'firebase/auth';
import { Navigate, useNavigate } from "react-router-dom";




const Login = () => {
    const navigate = useNavigate();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const SignIn = (e) => {
        // after
        e.preventDefault();
        if (SignIn) {
            signInWithEmailAndPassword(auth, email, password)
                .then((userCredential) => {
                    console.log(userCredential)
                }).catch((error) => {
                    console.log(alert("notfound"));
                    console.log(error)
                })
        }
        else {
            console.log(alert("enter details"));
        }
    }

    const [authUser, setAuthUser] = useState(null);

    useEffect(() => {
        const listen = onAuthStateChanged(auth, (user) => {

            if (user) {
                setAuthUser(user);
            }

            else {
                setAuthUser(null);
            }
        })
        return () => {
            listen();
        }

    }, []);

    return (
        <div className="flex flex-col min-h-screen bg-gray-50">
        {/* Redirect to Home if Authenticated */}
        {authUser && <Navigate to="/Home" replace={true} />}
      
        {/* Header */}
        <Header />
      
        {/* Login Section */}
        <div className="flex flex-1 items-center justify-center">
          <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-md">
            <div className="text-center mb-6">
              <h2 className="text-3xl font-bold text-gray-800 mb-2">Welcome Back</h2>
              <p className="text-gray-600">
                Don't have an account? 
                <button
                  className="ml-1 text-blue-500 hover:underline"
                  onClick={() => navigate("/Register")}
                >
                  Create today!
                </button>
              </p>
            </div>
      
            <form onSubmit={SignIn} className="space-y-4">
              {/* Email */}
              <div>
                <label htmlFor="email" className="block text-gray-700 font-medium">Email</label>
                <input
                  type="email"
                  id="email"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full border rounded-lg px-4 py-2 mt-1 focus:outline-none focus:ring focus:ring-blue-300"
                />
              </div>
      
              {/* Password */}
              <div>
                <label htmlFor="password" className="block text-gray-700 font-medium">Password</label>
                <input
                  type="password"
                  id="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="w-full border rounded-lg px-4 py-2 mt-1 focus:outline-none focus:ring focus:ring-blue-300"
                />
              </div>
      
              {/* Login Button */}
              <button
                type="submit"
                className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition"
              >
                Login
              </button>
      
              {/* Sign Up Redirect */}
              <p className="text-center text-gray-600">
                Don't have an account? 
                <button
                  onClick={() => navigate("/Register")}
                  className="ml-1 text-blue-500 hover:underline"
                >
                  Sign Up
                </button>
              </p>
      
              {/* Google Sign-In */}
              <button
                type="button"
                className="w-full bg-red-500 text-white py-2 rounded-lg hover:bg-red-600 transition"
              >
                Sign In With Google
              </button>
            </form>
          </div>
        </div>
      
        {/* Footer */}
        <Footer />
      </div>
      
    )
}

export default Login