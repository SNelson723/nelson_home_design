import NavBar from './NavBarMain';
import Home from './Home';
import About from './About';
import Contact from './Contact';
import Designs from './Designs';
import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements, Outlet } from "react-router-dom";

const App = () => {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<Root />}>
        <Route index element={<Home />} />
        <Route path="designs" element={<Designs />} />
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