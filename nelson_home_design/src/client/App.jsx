import { useState, useEffect } from 'react';
import axios from 'axios';
import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements, Outlet } from "react-router-dom";
import NavBar from './NavBarMain';
import Home from './Home';
import About from './About';
import Contact from './Contact';
import Designs from './Designs';

const App = () => {
  const [designs, setDesigns] = useState([]);
  useEffect(() => {
    const getDesigns = async () => {
      try {
        const { data } = await axios.get('/blueprints');
        setDesigns(data)
      } catch (error) {
        console.error('Error fetching designs:', error);
      }
    };
    getDesigns();
  }, []);
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<Root />}>
        <Route index element={<Home />} />
        <Route path="designs" element={<Designs designs={designs} />} />
        <Route path="about" element={<About />} />
        <Route path="contact" element={<Contact />} />
      </Route>
    )
  );
  return <RouterProvider router={router} />;
};

// Root component to wrap the navbar and outlet
const Root = () => {
  return (
    <>
      <NavBar />
      <Outlet />
    </>
  );
};

export default App;