import React, { useState } from 'react';
import Header from '../containers/Header';
import { Footer } from '../containers';
import { auth,db } from '../firebase/firebase';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { doc, setDoc } from 'firebase/firestore';

const Register = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [address, setAddress] = useState('');
// const [ object , setobject ] = useState([]);
    const SignUp = async (e) => {
     
    e.preventDefault();
    try {
      // Create user with email and password
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Store additional user information in Firestore
      await setDoc(doc(db, 'users', user.uid), {
        name: name,
        email: email,
        phone: phone,
        address: address,
        // object:object,
        uid: user.uid
      });

      console.log('User signed up and data saved:', user);
      console.log(alert("signed in"))

    } catch (error) {
      console.error('Error signing up:', error);
    }
  };
  

    return (
        <div className="flex flex-col min-h-screen bg-gray-50">
        {/* Header */}
        <Header />
      
        {/* Login Section */}
        <div className="flex flex-1 items-center justify-center">
          <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-md">
            <div className="text-center mb-6">
              <h2 className="text-3xl font-bold text-gray-800 mb-2">Welcome Back</h2>
              <p className="text-gray-600">Don't have an account? 
                <button
                  className="ml-1 text-blue-500 hover:underline"
                  onClick={() => navigate("/Register")}
                >
                  Create today!
                </button>
              </p>
            </div>
      
            <form onSubmit={SignUp} className="space-y-4">
              {/* Name */}
              <div>
                <label htmlFor="name" className="block text-gray-700 font-medium">Name</label>
                <input
                  type="text"
                  id="name"
                  placeholder="Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full border rounded-lg px-4 py-2 mt-1 focus:outline-none focus:ring focus:ring-blue-300"
                />
              </div>
      
              {/* Phone */}
              <div>
                <label htmlFor="phone" className="block text-gray-700 font-medium">Phone No:</label>
                <input
                  type="text"
                  id="phone"
                  placeholder="Phone No"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full border rounded-lg px-4 py-2 mt-1 focus:outline-none focus:ring focus:ring-blue-300"
                />
              </div>
      
              {/* Address */}
              <div>
                <label htmlFor="address" className="block text-gray-700 font-medium">Address</label>
                <input
                  type="text"
                  id="address"
                  placeholder="Address"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  className="w-full border rounded-lg px-4 py-2 mt-1 focus:outline-none focus:ring focus:ring-blue-300"
                />
              </div>
      
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
      
              {/* Register Button */}
              <button
                type="submit"
                className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition"
              >
                Register
              </button>
      
              {/* Google Sign-In */}
              <button
                type="button"
                className="w-full bg-red-500 text-white py-2 rounded-lg hover:bg-red-600 transition"
              >
                Sign In With Google
              </button>
      
              {/* Back to Sign In */}
              <button
                type="button"
                className="w-full text-center text-gray-500 hover:underline mt-4"
                onClick={() => navigate("/Login")}
              >
                Back to Sign In?
              </button>
            </form>
          </div>
        </div>
      
        {/* Footer */}
        <Footer />
      </div>
      
    );
};

export default Register;
