import React, { useState, useEffect } from 'react';
import Header from '../containers/Header';
import { auth, db } from '../firebase/firebase';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc, updateDoc, arrayUnion, getDoc } from 'firebase/firestore';
import axios from 'axios';
import { carosel } from '../assets';

export const open = (isVisible, setIsVisible) => { // Pass isVisible and setIsVisible as arguments
  setIsVisible(!isVisible);
};

const Home = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);
  const [cart, setCart] = useState([]);
  const [isVisible, setIsVisible] = useState(false);
  useEffect(() => {
    axios.get('https://dummyjson.com/products?limit=100')
      .then(response => {
        console.log('Fetched products:', response.data.products); // Debugging
        setProducts(response.data.products); // Access the products array
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching the products:', error);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setUser(user);
        fetchCart(user.uid);
      } else {
        setUser(null);
        setCart([]);
      }
    });
    return () => unsubscribe();
  }, []);

  const handleSignUp = async (email, password) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      await setDoc(doc(db, 'users', user.uid), {
        cart: [],
        uid: user.uid
      });

      console.log('User signed up and data saved:', user);
      alert("Signed in");
      fetchCart(user.uid); // Fetch cart data after signing up
    } catch (error) {
      console.error('Error signing up:', error);
    }
  };

  const fetchCart = async (uid) => {
    try {
      const userRef = doc(db, 'users', uid);
      const userDoc = await getDoc(userRef);
      if (userDoc.exists()) {
        setCart(userDoc.data().cart);
      } else {
        console.log('No such document!');
      }
    } catch (error) {
      console.error('Error fetching cart:', error);
    }
  };

  const addToCart = async (product) => {
    if (!user) {
      alert('Please sign in first.');
      return;
    }

    try {
      const userRef = doc(db, 'users', user.uid);
      await updateDoc(userRef, {
        cart: arrayUnion(product) // Add the product to the user's cart
      });

      console.log('Product added to cart:', product);
      alert('Product added to cart');
      fetchCart(user.uid); // Fetch cart data after adding a product
    } catch (error) {
      console.error('Error adding to cart:', error);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }
  const open = () => {
    setIsVisible(!isVisible);
  }
  console.log(products)
  return (
    <div class="flex flex-col px-4 py-4">
      <Header />


        <main>
          <section class="hero-section flex flex-col md:flex-row items-center bg-gradient-to-r from-blue-500 to-indigo-600 text-white p-8 rounded-lg shadow-md my-6">
            <div class="text-center md:text-left">
              <h2 class="text-4xl font-bold mb-4">Create the screens</h2>
              <p class="text-3xl font-bold text-yellow-300 mb-6">your visitors deserve to see</p>
              <p class="mb-6 text-lg">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
              </p>
              <button class="bg-yellow-400 text-black px-6 py-3 rounded-lg shadow-lg hover:bg-yellow-500 mr-4 transition">Learn More</button>
              <button
                class="border-2 border-white text-white px-6 py-3 rounded-lg hover:bg-white hover:text-black transition"
                onClick="handleSignUp('test@example.com', 'password123')">Sign Up</button>
            </div>
            <img src={carosel} alt="hero-1" class="w-full md:w-1/2 rounded-lg shadow-lg mt-6 md:mt-0"/>
          </section>

          <h2 class="text-center text-3xl font-semibold my-8">Product List</h2>
          <ul class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {products.map(product => (
              <li key={product.id} class="bg-white shadow-md rounded-lg overflow-hidden">
                <img src={product.thumbnail} alt={product.title} class="w-full h-32 object-cover"/
                >
                  <div class="p-4">
                    <h3 class="text-md font-bold mb-2">{product.title}</h3>
                    <p class="text-gray-600 mb-1">Price: ${product.price}</p>
                    <p class="text-sm mb-2"><strong>Rating:</strong> {product.rating}</p>
                    <p class="text-gray-500 text-xs mb-4 truncate">{product.description}</p>
                    <button
                      class="bg-blue-500 text-white px-3 py-2 rounded-lg hover:bg-blue-600 transition w-full text-sm"
                      onClick={() => addToCart(product)}>Add to Cart</button>
                  </div>
              </li>
            ))}
          </ul>
        </main>
    </div>


  );
}

export default Home;

