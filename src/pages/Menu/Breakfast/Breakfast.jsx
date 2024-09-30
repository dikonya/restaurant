import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Container, Row, Col, Button, Modal } from "react-bootstrap";
import { breakfastItems } from "../../../utils/Data/BreakfastData";
import { useCart } from "../../../context/CartContext";
import { useAuth } from "../../../context/AuthContext";
import "./Breakfast.css";
import Cart from "../../Cart/Cart";
import Notification from "../../../components/Notification/Notification" 

const Breakfast = () => {
  const { currentUser, isAuthenticated } = useAuth(); 
  const { addToCart } = useCart();
  const [showModal, setShowModal] = useState(false);
  const [addedItem, setAddedItem] = useState(null); 
  const [notifications, setNotifications] = useState([]); 

  const handleAddToCart = (item) => {
    console.log("Adding item to cart:", item); 
    if (isAuthenticated) {
      addToCart(item);
      setAddedItem(item);
      setNotifications((prevNotifications) => [
        ...prevNotifications,
        { message: `Added ${item.name} to cart` }
      ]); 
    } else {
      setShowModal(true);
    }
  };

  const handleCloseModal = () => {
    setShowModal(false); 
  };

  const handleNotificationClose = () => {
    setNotifications((prevNotifications) => prevNotifications.slice(1)); 
  };

  return (
    <div>
      <div className="breakfast-section py-5 bg-secondary">
        <Container>
          <h2 className="text-center fs-0.5 mb-4 mb-lg-5 text-uppercase fw-bold text-white">
            Breakfast
          </h2>
          <Row className="gx-4">
            {breakfastItems.map((item) => (
              <Col key={item.id} lg={6} className="mb-4">
                <div className="custom-card border-0 shadow h-100 d-flex bg-white">
                  <div className="card-img-container">
                    <img src={item.image} className="card-img" alt={item.name} />
                  </div>
                  <div className="card-text-container d-flex flex-column justify-content-between">
                    <div>
                      <h3 className="text-center fs-3 text-capitalize">{item.name}</h3>
                      <p className="text-center fs-5">{item.description}</p>
                    </div>
                    <div className="text-center fs-3 fw-bold text-warning">{item.price}</div>
                    <div className="text-center">
                      <Button onClick={() => handleAddToCart(item)} className="mt-3 bg-secondary border-0">Add to Cart</Button>
                    </div>
                  </div>
                </div>
              </Col>
            ))}
          </Row>
        </Container>
        <ul className="navigation-links-breakfasts">
          <li>
            <Link to="/dishes" className="text-decoration-none">Dishes</Link>
          </li>
          <li>
            <Link to="/desserts" className="text-decoration-none">Desserts</Link>
          </li>
          <li>
            <Link to="/drinks" className="text-decoration-none">Drinks</Link>
          </li>
        </ul>
        <Modal show={showModal} onHide={handleCloseModal}>
          <Modal.Header closeButton>
            <Modal.Title>Authentication Required</Modal.Title>
          </Modal.Header>
          <Modal.Body>Please log in or register to add items to your cart.</Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleCloseModal}>Close</Button>
            <Link to="/auth/login">
              <Button variant="primary" onClick={handleCloseModal}>Login</Button>
            </Link>
          </Modal.Footer>
        </Modal>
      </div>
      <Notification notifications={notifications} onClose={handleNotificationClose} /> 
    </div>
  );
};

export default Breakfast;
