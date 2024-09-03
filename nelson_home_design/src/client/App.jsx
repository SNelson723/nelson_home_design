import { useState, useEffect, lazy, Suspense } from 'react';
import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements, Outlet } from "react-router-dom";
import axios from 'axios';

const NavBar = lazy(() => import('./NavBarMain'));
const Home = lazy(() => import('./Home'));
const Contact = lazy(() => import('./Contact'));
const About = lazy(() => import('./About'));
const Designs = lazy(() => import('./Designs'));

const App = () => {
  const [designs, setDesigns] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const getDesigns = async () => {
      try {
        const { data } = await axios.get('/blueprints');
        setDesigns(data);
      } catch (error) {
        console.error('Error fetching designs:', error);
      } finally {
        setIsLoading(false);
      }
    };
    getDesigns();
  }, []);

  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<Root />}>
        <Route index element={<Suspense fallback={<div>Loading...</div>}><Home /></Suspense>} />
        <Route path="designs" element={
          <Suspense fallback={<div>Loading...</div>}>
            {isLoading ? <div>Loading designs...</div> : <Designs designs={designs} />}
          </Suspense>
        } />
        <Route path="about" element={<Suspense fallback={<div>Loading...</div>}><About /></Suspense>} />
        <Route path="contact" element={<Suspense fallback={<div>Loading...</div>}><Contact /></Suspense>} />
      </Route>
    )
  );

  return <RouterProvider router={router} />;
};


const Root = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <NavBar />
      <Outlet />
    </Suspense>
  );
};

export default App;