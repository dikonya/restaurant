import React, { useEffect } from 'react';
import { Link, Routes, Route, NavLink } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faSignOutAlt, faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import Home from './pages/Home/Home';
import About from './pages/About/About';
import Contact from './pages/Contact/Contact';
import Footer from './components/Footer/Footer';
import Breakfast from './pages/Menu/Breakfast/Breakfast';
import Dishes from './pages/Menu/Dishes/Dishes';
import Dessert from './pages/Menu/Desserts/Dessert';
import Drinks from './pages/Menu/Drinks/Drinks';
import Auth from './pages/Auth/Auth';
import AddNewUser from './components/Auth/AddNewUser';
import { LoginUser } from './components/Auth/LoginUser';
import { useDispatch, useSelector } from "react-redux";
import { authActions } from "./store/authSlice";
import { AuthProvider } from './context/AuthContext';
import { CartProvider } from './context/CartContext';
import Cart from './pages/Cart/Cart';
import LogoutUser from './components/Auth/LogoutUser';

const App = () => {
  const dispatch = useDispatch();
  const isAuthenticated = useSelector(state => state.auth.isAuthenticated);

  useEffect(() => {
    const isAuthenticated = localStorage.getItem("isAuthenticated");
    if (isAuthenticated) {
      dispatch(authActions.login());
    }
  }, [dispatch]);

  const logoutHandler = () => {
    localStorage.removeItem("isAuthenticated");
    console.log("уДАЛЕНО ИЗ ЛОКАЛЬНОГО");
    dispatch(authActions.setLoggedOut());
    dispatch(authActions.logout()); 
  }
  
  return (
    <AuthProvider>
      <CartProvider>
        <div>
          <Navbar expand='lg' className='fixed-top bg-body-tertiary shadow'>
            <Container>
              <Navbar.Brand>
                <Link to='/' className='navbar-brand text-danger d-flex align-items-center'>
                  <span className='mx-2 lh-1 fw-semibold'>
                    Dikonya
                    <br></br>
                    Restaurant
                  </span>
                </Link>
              </Navbar.Brand>
              <Navbar.Toggle aria-controls='basic-navbar-nav' />
              <Navbar.Collapse id='basic-navbar-nav'>
                <Nav className='me-auto justify-content-end w-100'>
                  <NavLink exact to='/' className='nav-link text-uppercase' activeClassName='active'>
                    Home
                  </NavLink>
                  <NavLink to='/breakfast' className='nav-link text-uppercase' activeClassName='active'>
                    Menu
                  </NavLink>
                  <NavLink to='/about' className='nav-link text-uppercase' activeClassName='active'>
                    About
                  </NavLink>
                  <NavLink to='/contact' className='nav-link text-uppercase' activeClassName='active'>
                    Contact
                  </NavLink>
                  {isAuthenticated && (
                    <NavLink to='/cart' className='nav-link text-uppercase' activeClassName='active'>
                      <FontAwesomeIcon icon={faShoppingCart} className="me-1" />
                    </NavLink>
                  )}
                  {isAuthenticated ? (
                    <LogoutUser logoutHandler={logoutHandler} />
                  ) : (
                    <NavLink to='/auth/login' className='nav-link ' activeClassName='active'>
                      <FontAwesomeIcon icon={faUser} className="me-1" />
                      Sign in/<br />
                      Sign up
                    </NavLink>
                  )}
                </Nav>
              </Navbar.Collapse>
            </Container>
          </Navbar>

          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/about' element={<About />} />
            <Route path='/contact' element={<Contact />} />
np            <Route path="/breakfast" element={<Breakfast />} />
            <Route path="/dishes" element={<Dishes />} />
            <Route path="/desserts" element={<Dessert />} />
            <Route path="/drinks" element={<Drinks />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/auth/*" element={<Auth />}>
              <Route index element={<AddNewUser />} />
              <Route path="register" element={<AddNewUser />} />
              <Route path="login" element={<LoginUser />} />
            </Route>
          </Routes>

          <Footer />
        </div>
      </CartProvider>
    </AuthProvider>
  );
}

export default App;
