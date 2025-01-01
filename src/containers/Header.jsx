import React, { useState, useEffect } from 'react';
import { Button, Container, Form, Nav, Navbar } from 'react-bootstrap';
import { auth, db } from '../firebase/firebase';
import { doc, getDoc } from 'firebase/firestore';
import SignOut from '../components/SignOut';
import { logo } from '../assets';
// import axios from 'axios';
import { useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { open } from '../pages/Home';
// import { useLoaderData } from 'react-router-dom';

const Header = () => {
  const [userData, setUserData] = useState(null);
  const [authUser, setAuthUser] = useState(null);
  const [loadingUserData, setLoadingUserData] = useState(true);
  const [isVisible, setIsVisible] = useState(false);

  const navigate = useNavigate();
  const current = useLocation();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setAuthUser(user);
      if (user) {
        fetchUserData(user.uid);
      } else {
        setLoadingUserData(false);
      }
    });
    return () => unsubscribe();
  }, []);

  const fetchUserData = async (uid) => {
    try {
      const userDoc = await getDoc(doc(db, 'users', uid));
      if (userDoc.exists()) {
        setUserData(userDoc.data());
      } else {
        console.log('No such document!');
      }
    } catch (error) {
      console.error('Error fetching user data:', error);
    } finally {
      setLoadingUserData(false);
    }
  };

  const expand = () => {
    setIsVisible(!isVisible);
  };


  if (loadingUserData) {
    return <div>Loading...</div>;
  }

  return (
    <div className="header">
      <Navbar expand="lg" className="bg-light shadow-md py-2">
        <Container fluid>
          <Navbar.Brand href="#" className="text-primary font-bold text-lg">
            Navbar Scroll
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="navbarScroll" />
          <Navbar.Collapse id="navbarScroll">
            {userData ? (<Nav className="me-auto my-2 my-lg-0 ml-auto align-items-center" style={{ maxHeight: '100px' }} navbarScroll>
              <Form className="d-flex">
                <Form.Control
                  type="search"
                  placeholder="Search"
                  className="me-2 border rounded-md shadow-sm"
                  aria-label="Search"
                />
                <Button variant="outline-primary" className="px-3">
                  Search
                </Button>
              </Form>
            </Nav>) : (current.pathname === "/Register" ? 
              (<button onClick={() => navigate("/Login")} className="ml-auto p-2 rounded-full hover:bg-gray-200 transition">
                SignIn
              </button>)
             : 
             ( <button onClick={() => navigate("/Register")} className="ml-auto p-2 rounded-full hover:bg-gray-200 transition">
                Register
              </button>))}

            {authUser && (
              <button onClick={expand} className="ml-4 p-2 rounded-full hover:bg-gray-200 transition">
                <img src={logo} alt="User Logo" className="logo rounded-full" />
              </button>
            )}
          </Navbar.Collapse>
        </Container>
        {userData && <button
          onClick={open}
          className="ml-4 bg-blue-500 text-white px-4 py-2 rounded-lg shadow-md hover:bg-blue-600 transition"
        >
          Add to Cart
        </button>}
      </Navbar>

      {isVisible && (
        <div className="flex flex-col border sidenav w-64 h-auto p-4 bg-gray-100 shadow-lg rounded-lg mt-4">
          {userData ? (
            <div className="gap-4">
              <p className="font-bold text-gray-700">Name: <span className="text-gray-500">{userData.name}</span></p>
              <p className="font-bold text-gray-700">Email: <span className="text-gray-500">{userData.email}</span></p>
              <p className="font-bold text-gray-700">Phone Number: <span className="text-gray-500">{userData.phone}</span></p>
              <p className="font-bold text-gray-700">Address: <span className="text-gray-500">{userData.address}</span></p>
              {authUser && (
                <SignOut className="bg-red-500 text-white px-4 py-2 rounded-lg mt-4 hover:bg-red-600 transition" />
              )}
            </div>
          ) : (
            <p className="text-gray-500 text-center">No user data found</p>
          )}
        </div>
      )}
    </div>


  );
};

export default Header;
